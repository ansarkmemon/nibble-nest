import { z } from 'zod';

export const RecipeListItem = z.object({
  name: z.string(),
  image: z.string().optional(),
  slug: z.string().optional(),
  category: z.array(z.string()).optional(),
});

export type RecipeListItem = z.infer<typeof RecipeListItem>;
