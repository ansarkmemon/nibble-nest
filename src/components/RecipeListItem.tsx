'use client';

import { Typography, CardContent, Card, Box } from '@mui/material';
import Image from 'next/image';
import type { RecipeListItem } from '@/types';
import { useRouter } from 'next/navigation';

export default function RecipeListItem({ recipe }: { recipe: RecipeListItem }) {
  const router = useRouter();
  return (
    <Card
      sx={{ display: 'flex', margin: '1rem 0' }}
      onClick={() => {
        router.push(recipe.slug);
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: 120,
          height: 151,
          minWidth: 120,
        }}
      >
        <Image
          src={recipe.image}
          alt="Recipe image"
          fill
          style={{ objectFit: 'cover' }}
        />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {recipe.name}
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ color: 'text.secondary' }}
          >
            {recipe.category.join(' | ')}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
