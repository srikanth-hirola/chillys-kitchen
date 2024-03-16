// /* eslint-disable no-unused-vars */
// import React, { useState } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/thumbs';

// import SwiperCore from 'swiper/core';
// import { Navigation, Thumbs } from 'swiper';

// SwiperCore.use([Navigation, Thumbs]);

// function ProductSlider() {
//     const [thumbsSwiper, setThumbsSwiper] = useState(null);

//     return (
//         <>
//             <Swiper
//                 style={{
//                     '--swiper-navigation-color': '#fff',
//                     '--swiper-pagination-color': '#fff',
//                 }}
//                 spaceBetween={10}
//                 navigation={true}
//                 thumbs={{ swiper: thumbsSwiper }}
//                 className="mySwiper2"
//             >
//                 <SwiperSlide>
//                     <img src="https://swiperjs.com/demos/images/nature-1.jpg" alt="Nature 1" />
//                 </SwiperSlide>
//                 {/* Add more slides as needed */}
//             </Swiper>
//             <Swiper
//                 onSwiper={setThumbsSwiper}
//                 spaceBetween={10}
//                 slidesPerView={4}
//                 freeMode={true}
//                 watchSlidesProgress={true}
//                 className="mySwiper"
//             >
//                 <SwiperSlide>
//                     <img src="https://swiperjs.com/demos/images/nature-1.jpg" alt="Nature 1" />
//                 </SwiperSlide>
//                 {/* Add more slides as needed */}
//             </Swiper>
//         </>
//     );
// }

// export default ProductSlider;
