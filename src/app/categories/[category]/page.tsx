import RecipeListItem from '@/components/RecipeListItem';
import { RECIPES_LIST } from '@/constants';
import { Box, Typography } from '@mui/material';
import { startCase } from 'lodash';

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  return (
    <Box sx={{ margin: '0 1rem' }}>
      <Typography variant="h4">{startCase(params.category)}</Typography>

      <Box>
        {RECIPES_LIST.map((recipe) => (
          <RecipeListItem key={recipe.slug} recipe={recipe} />
        ))}
      </Box>
    </Box>
  );
}
