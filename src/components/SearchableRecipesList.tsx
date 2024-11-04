'use client';

import { useState, useCallback, useEffect } from 'react';
import debounce from 'lodash/debounce';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { RecipeListItemType } from '@/types';

import { Box, TextField } from '@mui/material';
import RecipesList from './RecipesList';
import { MobileSwiper } from './Swiper';

interface SearchableRecipeListProps {
  initialRecipes: RecipeListItemType[];
}

export function SearchableRecipeList({
  initialRecipes,
}: SearchableRecipeListProps) {
  const { user } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [recipes, setRecipes] = useState(initialRecipes);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');

  const searchRecipes = useCallback(
    async (search: string) => {
      if (!user?.sub) return;

      const data = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/recipes/search?q=${search}&query_by=name`
      );
      const result = await data.json();
      setRecipes(result.recipes);
    },
    [user?.sub]
  );

  // Update URL with search param
  const updateSearchParam = useCallback(
    (search: string) => {
      const params = new URLSearchParams(searchParams);
      if (search) {
        params.set('q', search);
      } else {
        params.delete('q');
      }
      router.replace(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams]
  );

  const debouncedSearch = useCallback(
    debounce((search: string) => {
      updateSearchParam(search);
      if (search) {
        searchRecipes(search);
      } else {
        setRecipes(initialRecipes);
      }
    }, 500),
    [searchRecipes, initialRecipes, updateSearchParam]
  );

  // Load search results if URL has search param on mount
  useEffect(() => {
    const searchQuery = searchParams.get('q');
    if (searchQuery) {
      searchRecipes(searchQuery);
    }
  }, [searchRecipes]);

  return (
    <>
      <Box sx={{ marginTop: '10px' }}>
        <TextField
          fullWidth
          label="Search"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            debouncedSearch(e.target.value);
          }}
        />
      </Box>

      <Box sx={{ marginTop: '30px', marginLeft: '1rem' }}>
        <MobileSwiper />
        <Box sx={{ marginRight: '1rem', marginBottom: '5rem' }}>
          <RecipesList recipes={recipes} />
        </Box>
      </Box>
    </>
  );
}

// 'use client';

// import { useState, useCallback } from 'react';
// import debounce from 'lodash/debounce';
// import { useUser } from '@auth0/nextjs-auth0/client';
// import { RecipeListItemType } from '@/types';
// import { Box, TextField } from '@mui/material';
// import RecipesList from './RecipesList';
// import { MobileSwiper } from './Swiper';

// interface SearchableRecipeListProps {
//   initialRecipes: RecipeListItemType[];
// }

// export function SearchableRecipeList({
//   initialRecipes,
// }: SearchableRecipeListProps) {
//   const { user } = useUser();
//   const [recipes, setRecipes] = useState(initialRecipes);
//   const [searchTerm, setSearchTerm] = useState('');

//   const searchRecipes = useCallback(
//     async (search: string) => {
//       if (!user?.sub) return;

//       const data = await fetch(
//         `${process.env.NEXT_PUBLIC_BASE_URL}/api/recipes/search?q=${search}`
//       );
//       const result = await data.json();
//       setRecipes(result.recipes);
//     },
//     [user?.sub]
//   );

//   const debouncedSearch = useCallback(
//     debounce((search: string) => {
//       if (search) {
//         searchRecipes(search);
//       } else {
//         setRecipes(initialRecipes);
//       }
//     }, 500),
//     [searchRecipes, initialRecipes]
//   );

//   return (
//     <>
//       <Box sx={{ marginTop: '10px' }}>
//         <TextField
//           fullWidth
//           label="Search"
//           value={searchTerm}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             debouncedSearch(e.target.value);
//           }}
//         />
//       </Box>

//       <Box sx={{ marginTop: '30px', marginLeft: '1rem' }}>
//         <MobileSwiper />
//         <Box sx={{ marginRight: '1rem', marginBottom: '5rem' }}>
//           <RecipesList recipes={recipes} />
//         </Box>
//       </Box>
//     </>
//   );
// }
