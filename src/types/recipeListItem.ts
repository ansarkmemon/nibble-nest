import { z } from 'zod';
import { Recipe } from './recipe';

export const RecipeListItem = Recipe.pick({
  id: true,
  name: true,
  image: true,
  category: true,
});

export type RecipeListItemType = z.infer<typeof RecipeListItem>;
