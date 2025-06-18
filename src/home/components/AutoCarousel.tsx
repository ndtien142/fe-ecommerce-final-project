import React from 'react';
import Slider from 'react-slick';

const imageUrls = [
  'https://cdn.hoasenhome.vn/magestore/bannerslider/images/x/a/xaydung-01_1_.jpg',
  'https://cdn.hoasenhome.vn/magestore/bannerslider/images/z/5/z5672727643145_fb7aec9c5175a2dd448ae9f2384689db.jpg',
  'https://cdn.hoasenhome.vn/magestore/bannerslider/images/b/a/banner_key.jpg',
  'https://cdn.hoasenhome.vn/magestore/bannerslider/images/s/n/snss.jpg',
  'https://cdn.hoasenhome.vn/magestore/bannerslider/images/w/_/w_tuslo2.jpg',
];

const Carousel: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Slider {...settings}>
      {imageUrls.map((url, index) => (
        <div key={index}>
          <img src={url} alt={`Slide ${index}`} style={{ width: '100%', height: 'auto' }} />
        </div>
      ))}
    </Slider>
  );
};

export default Carousel;
