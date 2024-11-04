'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import Link from 'next/link';
import 'swiper/css';
import { Box, Card, Typography, useMediaQuery } from '@mui/material';
import { FOOD_CATEGORIES } from '@/constants';
import { Work_Sans } from 'next/font/google';

const workSans = Work_Sans({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-work-sans',
});

export const MobileSwiper = () => {
  // const isMobile = useMediaQuery('(max-width: 768px)');
  return (
    <Swiper freeMode={true} spaceBetween={70} slidesPerView={4}>
      {FOOD_CATEGORIES.map((category) => (
        <SwiperSlide key={category.name}>
          <Box sx={{ margin: '10px 0' }}>
            <Link
              href={`/categories/${category.link}`}
              style={{ textDecoration: 'none' }}
            >
              <Box
                sx={{
                  background: (theme) => theme.palette.black.main,
                  padding: '10px',
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: '#fff',
                  textTransform: 'uppercase',
                  fontFamily: workSans.style.fontFamily,
                  fontSize: '12px',
                  fontWeight: 500,
                  letterSpacing: '1px',
                }}
              >
                {category.name}
              </Box>
              {/* <Card
                sx={{
                  width: 90,
                  height: 90,
                  borderRadius: '10px',
                  display: 'flex',
                  justifyContent: 'center',
                  backgroundColor: '#F5F5F5',
                }}
              >
                <Box sx={{ padding: '5px 0' }}>
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={60}
                    height={60}
                    style={{ objectFit: 'cover' }}
                  />
                  <Typography
                    sx={{
                      fontSize: '12px',
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}
                  >
                    {category.name}
                  </Typography>
                </Box>
              </Card> */}
            </Link>
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
