import { RecipeListItemType } from '@/types';
import RecipeListItem from './RecipeListItem';
import { Box } from '@mui/material';
import { getSession } from '@auth0/nextjs-auth0';
export default async function RecipesList() {
  const user = await getSession();

  if (!user) {
    return null;
  }

  let data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/recipes?userId=${user?.user?.sub}`
  );
  let recipes = (await data.json()).recipes;
  console.log({ recipes });

  return (
    <Box>
      {recipes.map((recipe: RecipeListItemType) => (
        <RecipeListItem key={recipe.id} recipe={recipe} />
      ))}
    </Box>
  );
}
