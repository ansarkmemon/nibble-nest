import { Suspense } from 'react';
import { getSession } from '@auth0/nextjs-auth0';
import { SearchableRecipeList } from '@/components/SearchableRecipesList';
// import { RecipesLoading } from '@/components/RecipesLoading';
import { Box, Typography, CircularProgress } from '@mui/material';

export function RecipesLoading() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
      <CircularProgress />
    </Box>
  );
}

async function getInitialRecipes(userId: string) {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/recipes?userId=${userId}`,
    { cache: 'no-store' }
  );
  const result = await data.json();
  return result.recipes;
}

export default async function ListPage() {
  const session = await getSession();
  const initialRecipes = await getInitialRecipes(session?.user.sub);

  return (
    <div>
      <Box sx={{ backgroundColor: '#F2F3F2' }}>
        <Typography variant="h4" sx={{ padding: '20px 0' }}>
          What would you like to cook today?
        </Typography>

        <Suspense fallback={<RecipesLoading />}>
          <SearchableRecipeList initialRecipes={initialRecipes} />
        </Suspense>
      </Box>
    </div>
  );
}

// import { SlickSlider } from '@/components/Slider';
// import { MobileSwiper } from '@/components/Swiper';
// import { UserInfo } from '@/components/UserInfo';
// import { Box, TextField, Typography } from '@mui/material';
// import { getSession } from '@auth0/nextjs-auth0';
// import RecipesList from '@/components/RecipesList';
// import { Work_Sans } from 'next/font/google';
// import { useRouter } from 'next/dist/client/components/navigation';
// import { useUser } from '@auth0/nextjs-auth0/client';
// import { useState } from 'react';

// const fetchRecipes = async (userId: string, search?: string) => {
//   let data = await fetch(
//     `${process.env.NEXT_PUBLIC_BASE_URL}/api/recipes?userId=${userId}`
//   );

//   if (search) {
//     data = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/api/recipes/search?q=${search}`
//     );
//   }

//   return (await data.json()).recipes;
// };

// export default async function ListPage() {
//   const user = await getSession();

//   if (!user) {
//     return null;
//   }

//   const recipes = await fetchRecipes(user?.user?.sub);

//   // let data = await fetch(
//   //   `${process.env.NEXT_PUBLIC_BASE_URL}/api/recipes?userId=${user?.user?.sub}`
//   // );
//   // let recipes = (await data.json()).recipes;

//   return (
//     <div>
//       <Box sx={{ margin: '0 1rem' }}>
//         <Typography variant="h4" sx={{ marginTop: '10px' }}>
//           What would you like to cook today?
//         </Typography>
//         <Box sx={{ marginTop: '10px' }}>
//           <TextField fullWidth label="Search" />
//         </Box>
//       </Box>

//       <Box sx={{ marginTop: '30px', marginLeft: '1rem' }}>
//         <MobileSwiper />

//         <Box sx={{ marginRight: '1rem', marginBottom: '5rem' }}>
//           <RecipesList recipes={recipes} />
//         </Box>
//       </Box>
//     </div>
//   );
// }
