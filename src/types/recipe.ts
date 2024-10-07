import { z } from 'zod';
import { CuisineEnum } from './cuisine';

export const Recipe = z.object({
  category: z.array(z.string(), { required_error: 'Category is required' }),
  cuisine: CuisineEnum.optional(),
  cookTime: z.string().optional(),
  id: z.string().optional(),
  image: z.string().optional(),
  ingredients: z.array(z.string()).optional(),
  instructions: z.string().optional(),
  name: z.string(),
  notes: z.string().optional(),
  prepTime: z.string().optional(),
  servings: z.number().optional(),
  source: z.string({ description: 'Source of the recipe' }).optional(),
  tags: z.array(z.string()).optional(),
  totalTime: z.string().optional(),
  video: z.string({ description: 'Video URL of the recipe' }).optional(),
});

export type Recipe = z.infer<typeof Recipe>;

export const RecipeSchema = {
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
  ],
};
