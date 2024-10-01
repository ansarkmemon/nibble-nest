import { SlickSlider } from '@/components/Slider';
import { MobileSwiper } from '@/components/Swiper';
import { Box, TextField, Typography } from '@mui/material';

export default function Home() {
  return (
    <div>
      <Box sx={{ margin: '0 1rem' }}>
        <Typography variant="h6">Hello, World!</Typography>
        <Typography variant="h4" sx={{ marginTop: '10px' }}>
          What would you like to cook today?
        </Typography>
        <Box sx={{ marginTop: '10px' }}>
          <TextField fullWidth label="Search" />
        </Box>
      </Box>

      <Box sx={{ marginTop: '30px', marginLeft: '1rem' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
          }}
        >
          <Typography variant="h6">Categories</Typography>
          {/* <Typography variant="body2">See All</Typography> */}
        </Box>
        <MobileSwiper />
      </Box>
    </div>
  );
}
