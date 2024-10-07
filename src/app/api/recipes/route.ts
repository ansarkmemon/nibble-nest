import { db } from '@/db';
import { Recipe, RecipeListItem } from '@/types';
import { NextResponse } from 'next/server';
import { fsDataTypeConverter } from '@/utils';
import { createRecord, updateRecord } from '@/utils/firestore-utils';
import { firestoreDatesConverter } from '@/utils/date-utils';
import { validatePayload } from '@/utils/validators';

export async function GET(): Promise<
  NextResponse<{ recipes: RecipeListItem[] }>
> {
  const recipesSnapshot = await db
    .collection('recipes')
    .withConverter(fsDataTypeConverter<Recipe>())
    .withConverter(firestoreDatesConverter)
    .get();

  if (recipesSnapshot.empty) {
    return NextResponse.json({ recipes: [] });
  }

  const recipes = recipesSnapshot.docs.map((doc) =>
    RecipeListItem.parse(doc.data())
  );
  return NextResponse.json({ recipes });
}

export async function POST(req: Request) {
  const payload = await req.json();
  const validatedPayload = validatePayload(Recipe, payload);

  if (!validatedPayload.success) {
    return NextResponse.json(
      { errors: validatedPayload.data },
      { status: 400 }
    );
  }

  const recipeDoc = await createRecord<Recipe>(
    'recipes',
    validatedPayload.data
  );

  return NextResponse.json({ id: recipeDoc.id });
}
