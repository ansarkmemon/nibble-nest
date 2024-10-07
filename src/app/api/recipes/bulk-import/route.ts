// TODO: Implement an endpoint to enable uploading a CSV file containing recipes

import { NextResponse } from 'next/server';
import { Readable } from 'stream';
import csv from 'csvtojson';
import { db } from '@/db';
import { UTCDate } from '@date-fns/utc';
import { Recipe } from '@/types';
import { get } from 'lodash';

export async function POST(req: Request, res: Response) {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  if (!file) {
    return NextResponse.json({ error: 'No files received.' }, { status: 400 });
  }

  const readableStream = Readable.fromWeb(file.stream() as any);
  const batch = db.batch();
  let response = {};
  let status = 200;

  try {
    await csv()
      .fromStream(readableStream)
      .subscribe(
        (json) => {
          return new Promise((resolve, reject) => {
            // long operation for each json e.g. transform / write into database.
            const recipe: Recipe = json;
            const ingredients = get(json, 'ingredients', '').split('|');

            recipe.name = get(json, 'title', '');
            recipe.ingredients = ingredients;
            recipe.category = get(json, 'category', ['Breakfast']);

            const parsedRecipe = Recipe.parse(recipe);
            const id = db.collection('recipes').doc().id;
            const docRef = db.collection('recipes').doc(id);
            batch.set(docRef, {
              ...parsedRecipe,
              id,
              createdAt: new UTCDate(),
            });

            resolve(json);
          });
        },
        (err) => {
          response = { error: 'Failed to process CSV' };
          status = 500;
        },
        async () => {
          console.log('onComplete');
          await batch.commit();
          response = { message: 'Import successful' };
          status = 200;
        }
      );
  } catch (error) {
    response = {
      error: 'Failed to process CSV',
      message: get(error, 'message', ''),
    };
    status = 500;
  }

  return NextResponse.json(response, { status });
}