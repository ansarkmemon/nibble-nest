import { db } from '@/db';
import { Recipe } from '@/types/recipe';
import { firestoreDatesConverter } from '@/utils/date-utils';
import { updateRecord } from '@/utils/firestore-utils';
import { fsDataTypeConverter } from '@/utils/fsDataTypeConverter';
import { validatePayload } from '@/utils/validators';
import { UTCDate } from '@date-fns/utc';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { recipeId: string } }
) {
  const recipeDoc = await db
    .collection('recipes')
    .doc(params.recipeId)
    .withConverter(fsDataTypeConverter<Recipe>())
    .withConverter(firestoreDatesConverter)
    .get();

  if (!recipeDoc.exists) {
    return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
  }

  const recipe = recipeDoc.data() as Recipe;

  return NextResponse.json({ recipe });
}

export async function PUT(
  req: Request,
  { params }: { params: { recipeId: string } }
) {
  const payload = await req.json();
  const validatedPayload = validatePayload(Recipe.partial(), payload);

  if (!validatedPayload.success) {
    return NextResponse.json(
      { errors: validatedPayload.data },
      { status: 400 }
    );
  }

  const recipeDoc = await updateRecord<Recipe>(
    'recipes',
    params.recipeId,
    validatedPayload.data
  );

  return NextResponse.json({ id: recipeDoc.id });
}

// Implement soft delete
export async function DELETE(
  req: Request,
  { params }: { params: { recipeId: string } }
) {
  const recipeDoc = await db.collection('recipes').doc(params.recipeId).get();
  if (!recipeDoc.exists) {
    return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
  }

  await recipeDoc.ref.update({ deletedAt: new UTCDate() });

  return NextResponse.json({ id: recipeDoc.id });
}
