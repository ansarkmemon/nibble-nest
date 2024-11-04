'use client';
import { Box, Typography } from '@mui/material';
import { PrimaryButton } from './PrimaryButton';
import { redirect, useRouter } from 'next/navigation';
import { Work_Sans } from 'next/font/google';

const workSans = Work_Sans({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-work-sans',
});

export const HomePage = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
      fontWeight={400}
      fontSize={24}
      className={workSans.className}
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Box sx={{ width: '350px' }}>
        <Box pb={4}>
          <Typography
            variant="h4"
            sx={{
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontWeight: 500,
              fontSize: '22px',
            }}
          >
            Welcome to NibbleNest
          </Typography>
        </Box>

        <PrimaryButton href="/api/auth/login">Login</PrimaryButton>
      </Box>
    </Box>
  );
};
