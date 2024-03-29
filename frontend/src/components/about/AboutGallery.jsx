/* eslint-disable no-unused-vars */
import React from 'react';

const AboutGallery = () => {
  return (
    <div className="about-gallery">
      <div className="about-gallery-sub">
        <div className="marquee-container">
          <div className="marquee left">
            <img src="/images/home/ab-image.png" alt="Left Image 1" />
            <img src="/images/home/ab-image.png" alt="Left Image 2" />
            <img src="/images/home/ab-image.png" alt="Left Image 3" />
            <img src="/images/home/ab-image.png" alt="Left Image 4" />
            <img src="/images/home/ab-image.png" alt="Left Image 5" />
            <img src="/images/home/ab-image.png" alt="Left Image 5" />
            
            {/* Add more images here */}
          </div>
          <div className="marquee right">
            <img src="/images/home/ab-image.png" alt="Right Image 1" />
            <img src="/images/home/ab-image.png" alt="Right Image 2" />
            <img src="/images/home/ab-image.png" alt="Right Image 3" />
            <img src="/images/home/ab-image.png" alt="Right Image 4" />
            <img src="/images/home/ab-image.png" alt="Right Image 5" />
         
            {/* Add more images here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutGallery;
