'use client';

import { Typography, CardContent, Card, Box } from '@mui/material';
import Image from 'next/image';
import type { RecipeListItemType } from '@/types';
import { useRouter } from 'next/navigation';
import { Work_Sans, Merriweather } from 'next/font/google';
import { get } from 'lodash';

const workSans = Work_Sans({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-work-sans',
});

const merriweather = Merriweather({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-merriweather',
});

export default function RecipeListItem({
  recipe,
}: {
  recipe: RecipeListItemType;
}) {
  const router = useRouter();
  return (
    <Card
      sx={{ display: 'flex', margin: '1rem 0' }}
      onClick={() => {
        router.push(`/recipes/${recipe.id}`);
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: 100,
          height: 130,
          minWidth: 100,
          backgroundImage: `url(${recipe.image || ''})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography
            component="div"
            variant="h5"
            fontSize={15}
            fontFamily={merriweather.style.fontFamily}
          >
            <span
              dangerouslySetInnerHTML={{
                __html: get(recipe, 'name_html', recipe.name),
              }}
            />
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ color: 'text.secondary' }}
            fontFamily={workSans.style.fontFamily}
            textTransform="uppercase"
            fontSize={12}
          >
            {recipe.category.join(' | ')}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
