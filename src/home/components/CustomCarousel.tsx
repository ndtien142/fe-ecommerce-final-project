import React, { useRef, useState, useEffect } from 'react';
import Slider from 'react-slick';
import { Box } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import Image from 'src/common/components/Image';
import { CarouselArrowIndex, CarouselArrows } from 'src/common/components/carousel';

// Constants
const THUMB_SIZE = 64;

// Styled Components
const RootStyle = styled('div')(({ theme }) => ({
  '& .slick-slide': {
    float: theme.direction === 'rtl' ? 'right' : 'left',
    '&:focus': { outline: 'none' },
  },
}));

// Component Props
interface CustomCarouselProps {
  images: string[];
}

const CustomCarousel: React.FC<CustomCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [nav1, setNav1] = useState<Slider>();
  const [nav2, setNav2] = useState<Slider>();

  const slider1 = useRef<Slider | null>(null);
  const slider2 = useRef<Slider | null>(null);

  useEffect(() => {
    if (slider1.current) {
      setNav1(slider1.current);
    }
    if (slider2.current) {
      setNav2(slider2.current);
    }
  }, []);

  const settings1 = {
    speed: 320,
    dots: false,
    arrows: false,
    slidesToShow: 1,
    draggable: false,
    slidesToScroll: 1,
    adaptiveHeight: true,
    beforeChange: (current: number, next: number) => setCurrentIndex(next),
  };

  const settings2 = {
    speed: 320,
    dots: false,
    arrows: false,
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    variableWidth: true,
    centerPadding: '0px',
    slidesToShow: images.length > 3 ? 3 : images.length,
  };

  const handlePrevious = () => {
    slider2.current?.slickPrev();
  };

  const handleNext = () => {
    slider2.current?.slickNext();
  };

  return (
    <RootStyle>
      <Box sx={{ p: 1 }}>
        <Box sx={{ zIndex: 0, borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
          <Slider {...settings1} asNavFor={nav2} ref={slider1}>
            {images.map((img) => (
              <Image key={img} alt="large image" src={img} ratio="1/1" sx={{ cursor: 'zoom-in' }} />
            ))}
          </Slider>
          <CarouselArrows />
        </Box>
      </Box>
    </RootStyle>
  );
};

export default CustomCarousel;
