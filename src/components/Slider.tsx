'use client';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import Image from 'next/image';

export const SlickSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    // slidesToShow: 3,
    // slidesToScroll: 3,
    nextArrow: undefined,
    prevArrow: undefined,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <Box sx={{ width: 64, maxWidth: 64 }}>
          <Card>
            <Image
              src="/images/breakfast.jpg"
              alt="breakfast"
              width={64}
              height={64}
            />
          </Card>
        </Box>
        <Box sx={{ width: 64, maxWidth: 64 }}>
          <Card>
            <Image
              src="/images/breakfast.jpg"
              alt="breakfast"
              width={64}
              height={64}
            />
          </Card>
        </Box>
        {/* <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image="/static/images/cards/contemplative-reptile.jpg"
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card> */}
      </Slider>
    </div>
  );
};

/*
export function Avatar({ id, alt }) {
  return <Image src={`/avatars/${id}.png`} alt={alt} width="64" height="64" />
}
*/
