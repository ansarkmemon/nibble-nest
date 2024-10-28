import { Recipe } from '@/types';
import { searchClient } from '@/typesense';
import { set } from 'lodash';
import { NextRequest, NextResponse } from 'next/server';
import { SearchParams } from 'typesense/lib/Typesense/Documents';

export async function GET(req: NextRequest) {
  console.log('searchParams >> ', req.nextUrl.searchParams.has('q'));
  const searchParams = req.nextUrl.searchParams;

  const searchTerm = req.nextUrl.searchParams.get('q');
  const ingredients = req.nextUrl.searchParams.get('ingredients');

  if (!searchTerm && !ingredients) {
    return NextResponse.json({ recipes: [] });
  }

  const searchPayload: SearchParams = {
    q: searchTerm || '*',
    query_by: ['name', 'ingredients'],
  };

  if (ingredients) {
    searchPayload.filter_by = `ingredients:${ingredients}`;
  }

  const results = await searchClient
    .collections('recipes')
    .documents()
    .search(searchPayload);

  if (!results.found) {
    return NextResponse.json({ recipes: [] });
  }

  const response = results.hits?.map((hit) => {
    const recipe = hit.document as Recipe;

    set(recipe, 'createdAt', new Date((recipe.createdAt as number) * 1000));

    if (Object.keys(hit.highlight).length > 0) {
      Object.entries(hit.highlight).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          set(
            recipe,
            `${key}_html`,
            value.map((v) => v.snippet)
          );
        } else {
          set(recipe, `${key}_html`, value.snippet);
        }
      });
    }
    return recipe;
  });

  return NextResponse.json({ recipes: response });
}
