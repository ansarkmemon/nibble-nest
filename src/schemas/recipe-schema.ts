import { searchClient } from '@/typesense';
import { CollectionCreateSchema } from 'typesense/lib/Typesense/Collections';

export const RecipeSchema: CollectionCreateSchema = {
  name: 'recipes',
  default_sorting_field: 'createdAt',
  enable_nested_fields: true,
  fields: [
    {
      name: 'name',
      type: 'string',
    },
    {
      name: 'ingredients',
      type: 'string[]',
      optional: true,
    },
    {
      name: 'category',
      type: 'string[]',
      facet: true,
      optional: true,
    },
    {
      name: 'cuisine',
      type: 'string',
      facet: true,
      optional: true,
    },
    {
      name: 'createdAt',
      type: 'int64',
      sort: true,
    },
    {
      name: 'authorId',
      type: 'string',
      optional: true,
    },
  ],
};

export const createRecipeSchema = async () => {
  await searchClient
    .collections()
    .create(RecipeSchema)
    .then((res) => {
      console.log('res >>>', res);
    })
    .catch((err) => {
      console.log('err >>>', err);
    });
};

// createRecipeSchema();
