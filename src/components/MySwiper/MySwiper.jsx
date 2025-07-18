import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import s from './MySwiper.module.css';
import ProductCard from '../ProductCard/ProductCard.jsx';

const MySwiper = ({ products, slidesPerView = 4 }) => {
  return (
    <Swiper
      direction="horizontal"
      loop={true}
      navigation={true}
      slidesPerView={slidesPerView}
      spaceBetween={20}
      speed={400}
      modules={[Navigation, Pagination, Scrollbar, Autoplay]}
      style={{ height: '300px', width: '100%', padding: '20px 0 20px 0' }}
      breakpoints={{
        320: { slidesPerView: 1 },
        678: { slidesPerView: 2 },
        968: { slidesPerView: 5 },
      }}
      className={s.swiper}
    >
      {products.map((product) => (
        <SwiperSlide key={product.id} className={s.slideWrap}>
          <div className={s.slide}>
            <ProductCard product={product} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MySwiper;