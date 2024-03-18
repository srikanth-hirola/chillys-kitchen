/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import PropTypes from 'prop-types'
import { FreeMode, Thumbs } from 'swiper/modules';
import { Pagination, Navigation } from 'swiper/modules';


export default function SliderProduct({ mainImg }) {

    // const [thumbsSwiper, setThumbsSwiper] = useState(null);
    // magnifier effect
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const [magnifier, setMagnifier] = useState({
        isVisible: false,
        posX: 0,
        posY: 0,
    });

    const handleImageHover = (e) => {
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const posX = (e.clientX - left) / width * 100;
        const posY = (e.clientY - top) / height * 100;

        setMagnifier({
            isVisible: true,
            posX,
            posY,
        });
    };

    const handleImageLeave = () => {
        setMagnifier({
            isVisible: false,
            posX: 0,
            posY: 0,
        });
    };
    return (
        <div className='laptop-slider-product-page'>
            <Swiper
                spaceBetween={10}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
            >
                {mainImg?.map((item, i) => (
                    <SwiperSlide key={i}>
                        <div className='mainImg' onMouseMove={handleImageHover} onMouseLeave={handleImageLeave}>
                            <img src={item?.url} alt='product' />
                            {magnifier.isVisible && (
                                <div
                                    className="magnifier"
                                    style={{
                                        backgroundImage: `url(${item?.url})`,
                                        backgroundSize: '200% 200%',
                                        backgroundPosition: `${magnifier.posX}% ${magnifier.posY}%`,
                                    }}
                                />
                            )}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                slidesPerView={4}
                spaceBetween={10}
                centeredSlides={true}
                loop={true}
                watchSlidesProgress={true}
                FreeMode={true}
                modules={[Pagination, Navigation, FreeMode, Thumbs]}
                navigation={true}
                className="mySwiper"
            >
                {mainImg?.map((item, i) => (
                    <SwiperSlide key={i}>
                        <div className='mainImg1'>
                            <img src={item?.url} alt='product' />

                        </div>


                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

SliderProduct.propTypes = {
    mainImg: PropTypes.string.isRequired
}