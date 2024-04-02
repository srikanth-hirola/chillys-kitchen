/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";

// import required modules
import { FreeMode } from "swiper/modules";

export default function Testimonal({ testimonialsContent }) {
  return (
    <>
      <div className="home-testimonal">
        <div className="container">
          <div className="title-testimonal">
            {testimonialsContent && <h3>{testimonialsContent?.title}</h3>}
          </div>
        <Swiper
            slidesPerView={3}
            spaceBetween={30}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 200,
            }}
            loop={true}
            modules={[FreeMode]}
            breakpoints={{
            // when window width is >= 768px
            320: {
              slidesPerView: 1,
            },
            480: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 1,
            },
            // when window width is >= 992px
            992: {
              slidesPerView: 2,
            },
            1200: {
              slidesPerView: 2,
            },
          }}
            className="mySwiper"
          >
            {testimonialsContent &&
              testimonialsContent?.testimonialCard?.map((cards, i) => (
                <SwiperSlide key={i}>
                  <div className="testimonal-card">
                    <div className="testimonal-sec-cards">
                      <div className="testi-sec-review">
                        <h3>“{cards?.title}”</h3>
                        <p>{cards?.review}</p>
                      </div>
                      <div className="testi-sec-user">
                        <div className="row">
                          <div className="col-md-3">
                            <div className="test-user-image">
                              <img src={cards?.image?.url} alt="" />
                            </div>
                          </div>
                          <div className="col-md-9">
                            <div className="testi-user-role">
                              <h4>{cards?.name}</h4>
                              <p>{cards?.placeAndDesignation}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}
