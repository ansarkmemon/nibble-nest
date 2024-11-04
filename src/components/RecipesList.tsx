import { RecipeListItemType } from '@/types';
import RecipeListItem from './RecipeListItem';
import { Box } from '@mui/material';

export default function RecipesList({
  recipes,
}: {
  recipes: RecipeListItemType[];
}) {
  console.log({ recipes });

  return (
    <Box>
      {recipes.map((recipe: RecipeListItemType) => (
        <RecipeListItem key={recipe.id} recipe={recipe} />
      ))}
    </Box>
  );
}
