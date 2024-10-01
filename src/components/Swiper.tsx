'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import Link from 'next/link';
import 'swiper/css';
import { Box, Card, Typography, useMediaQuery } from '@mui/material';
import { FOOD_CATEGORIES } from '@/constants';

export const MobileSwiper = () => {
  // const isMobile = useMediaQuery('(max-width: 768px)');
  return (
    <Swiper freeMode={true} spaceBetween={60} slidesPerView={4}>
      {FOOD_CATEGORIES.map((category) => (
        <SwiperSlide key={category.name}>
          <Box sx={{ margin: '10px 0' }}>
            <Link
              href={`/categories/${category.link}`}
              style={{ textDecoration: 'none' }}
            >
              <Card
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
              </Card>
            </Link>
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
