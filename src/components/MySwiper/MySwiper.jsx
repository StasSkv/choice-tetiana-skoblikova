import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import s from './MySwiper.module.css';

const images = [
  '/images/day-cream-age-control.png',
  '/images/enzyme-powder-age-control.png',
  '/images/night-cream-age-control.png',
  '/images/shower-gel-mood-creative.png',
  '/images/toner-age-control.png',
];

export const MySwiper = () => {
  
  return (
    <Swiper
      direction="horizontal"
      loop={true}
      pagination={{ clickable: true }}
      navigation={true}
      scrollbar={{ draggable: true }}
      modules={[Navigation, Pagination, Scrollbar]}
      style={{ height: '400px', width: '300px' }}
      className={s.swiper}
    >
      {images.map((src, index) => (
        <SwiperSlide key={index}>
          <div className={s.slide}>
            <img src={src} alt={`product ${index + 1}`} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
