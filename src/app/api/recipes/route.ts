import { db } from '@/db';
import { RecipeListItem } from '@/types';
import { NextResponse } from 'next/server';
import { fsDataTypeConverter } from '@/utils';
import { createRecord } from '@/utils/firestoreUtils';
import { firestoreDatesConverter } from '@/utils/date-utils';

export async function GET(
  req: Request
): Promise<NextResponse<{ recipes: RecipeListItem[] }>> {
  const recipesSnapshot = await db
    .collection('recipes')
    .withConverter(fsDataTypeConverter<RecipeListItem>())
    .withConverter(firestoreDatesConverter)
    .get();

  if (recipesSnapshot.empty) {
    return NextResponse.json({ recipes: [] });
  }

  const recipes = recipesSnapshot.docs.map((doc) => doc.data());
  return NextResponse.json({ recipes });
}

export async function POST(req: Request) {
  const { name, ingredients, instructions } = await req.json();
  const recipeDoc = await createRecord<RecipeListItem>('recipes', {
    name,
  });

  //   const recipeDoc = await db.collection('recipes').add({
  //     name,
  //   });

  console.log('recipeDoc', recipeDoc.id);
  return NextResponse.json({ id: recipeDoc.id });
}
