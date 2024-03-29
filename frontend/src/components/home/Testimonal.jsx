// eslint-disable-next-line no-unused-vars
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';

// import required modules
import { FreeMode } from 'swiper/modules';

export default function Testimonal() {
  return (
    <>
     <div className="home-testimonal">
     <div className="container">
     <div className="title-testimonal">
        <h3>What Our Customers Say</h3>
     </div>
     <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
            delay:200
        }}
        modules={[FreeMode]}
        className="mySwiper"
      >
        <SwiperSlide>
            <div className="testimonal-card">
                <div className="testimonal-sec-cards">
                    <div className="testi-sec-review">
                        <h3>“The best restaurant”</h3>
                        <p>Last night, we dined at place and were simply blown away. From the moment we stepped in, we were enveloped in an inviting atmosphere and greeted with warm smiles.</p>
                    </div>
                    <div className="testi-sec-user">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="test-user-image">
                                    <img src="images/home/test-1.webp" alt="" />
                                </div>
                            </div>
                            <div className="col-md-9">
                                <div className="testi-user-role">
                                    <h4>Sophire Robson</h4>
                                    <p>Los Angeles, CA</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="testimonal-card">
                <div className="testimonal-sec-cards">
                    <div className="testi-sec-review">
                        <h3>“The best restaurant”</h3>
                        <p>Last night, we dined at place and were simply blown away. From the moment we stepped in, we were enveloped in an inviting atmosphere and greeted with warm smiles.</p>
                    </div>
                    <div className="testi-sec-user">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="test-user-image">
                                    <img src="images/home/test-1.webp" alt="" />
                                </div>
                            </div>
                            <div className="col-md-9">
                                <div className="testi-user-role">
                                    <h4>Sophire Robson</h4>
                                    <p>Los Angeles, CA</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="testimonal-card">
                <div className="testimonal-sec-cards">
                    <div className="testi-sec-review">
                        <h3>“The best restaurant”</h3>
                        <p>Last night, we dined at place and were simply blown away. From the moment we stepped in, we were enveloped in an inviting atmosphere and greeted with warm smiles.</p>
                    </div>
                    <div className="testi-sec-user">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="test-user-image">
                                    <img src="images/home/test-1.webp" alt="" />
                                </div>
                            </div>
                            <div className="col-md-9">
                                <div className="testi-user-role">
                                    <h4>Sophire Robson</h4>
                                    <p>Los Angeles, CA</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="testimonal-card">
                <div className="testimonal-sec-cards">
                    <div className="testi-sec-review">
                        <h3>“The best restaurant”</h3>
                        <p>Last night, we dined at place and were simply blown away. From the moment we stepped in, we were enveloped in an inviting atmosphere and greeted with warm smiles.</p>
                    </div>
                    <div className="testi-sec-user">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="test-user-image">
                                    <img src="images/home/test-1.webp" alt="" />
                                </div>
                            </div>
                            <div className="col-md-9">
                                <div className="testi-user-role">
                                    <h4>Sophire Robson</h4>
                                    <p>Los Angeles, CA</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="testimonal-card">
                <div className="testimonal-sec-cards">
                    <div className="testi-sec-review">
                        <h3>“The best restaurant”</h3>
                        <p>Last night, we dined at place and were simply blown away. From the moment we stepped in, we were enveloped in an inviting atmosphere and greeted with warm smiles.</p>
                    </div>
                    <div className="testi-sec-user">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="test-user-image">
                                    <img src="images/home/test-1.webp" alt="" />
                                </div>
                            </div>
                            <div className="col-md-9">
                                <div className="testi-user-role">
                                    <h4>Sophire Robson</h4>
                                    <p>Los Angeles, CA</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="testimonal-card">
                <div className="testimonal-sec-cards">
                    <div className="testi-sec-review">
                        <h3>“The best restaurant”</h3>
                        <p>Last night, we dined at place and were simply blown away. From the moment we stepped in, we were enveloped in an inviting atmosphere and greeted with warm smiles.</p>
                    </div>
                    <div className="testi-sec-user">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="test-user-image">
                                    <img src="images/home/test-1.webp" alt="" />
                                </div>
                            </div>
                            <div className="col-md-9">
                                <div className="testi-user-role">
                                    <h4>Sophire Robson</h4>
                                    <p>Los Angeles, CA</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="testimonal-card">
                <div className="testimonal-sec-cards">
                    <div className="testi-sec-review">
                        <h3>“The best restaurant”</h3>
                        <p>Last night, we dined at place and were simply blown away. From the moment we stepped in, we were enveloped in an inviting atmosphere and greeted with warm smiles.</p>
                    </div>
                    <div className="testi-sec-user">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="test-user-image">
                                    <img src="images/home/test-1.webp" alt="" />
                                </div>
                            </div>
                            <div className="col-md-9">
                                <div className="testi-user-role">
                                    <h4>Sophire Robson</h4>
                                    <p>Los Angeles, CA</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="testimonal-card">
                <div className="testimonal-sec-cards">
                    <div className="testi-sec-review">
                        <h3>“The best restaurant”</h3>
                        <p>Last night, we dined at place and were simply blown away. From the moment we stepped in, we were enveloped in an inviting atmosphere and greeted with warm smiles.</p>
                    </div>
                    <div className="testi-sec-user">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="test-user-image">
                                    <img src="images/home/test-1.webp" alt="" />
                                </div>
                            </div>
                            <div className="col-md-9">
                                <div className="testi-user-role">
                                    <h4>Sophire Robson</h4>
                                    <p>Los Angeles, CA</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="testimonal-card">
                <div className="testimonal-sec-cards">
                    <div className="testi-sec-review">
                        <h3>“The best restaurant”</h3>
                        <p>Last night, we dined at place and were simply blown away. From the moment we stepped in, we were enveloped in an inviting atmosphere and greeted with warm smiles.</p>
                    </div>
                    <div className="testi-sec-user">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="test-user-image">
                                    <img src="images/home/test-1.webp" alt="" />
                                </div>
                            </div>
                            <div className="col-md-9">
                                <div className="testi-user-role">
                                    <h4>Sophire Robson</h4>
                                    <p>Los Angeles, CA</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SwiperSlide>
       
      </Swiper>
     </div>
     </div>
    </>
  );
}
