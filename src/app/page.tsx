import { SlickSlider } from '@/components/Slider';
import { MobileSwiper } from '@/components/Swiper';
import { UserInfo } from '@/components/UserInfo';
import { Box, TextField, Typography } from '@mui/material';
import { getSession } from '@auth0/nextjs-auth0';

export default async function Home() {
  // const session = await getSession();

  // console.log(session?.user);

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
          <UserInfo />
          {/* <Typography variant="body2">See All</Typography> */}
        </Box>
        <MobileSwiper />
      </Box>
    </div>
  );
}
