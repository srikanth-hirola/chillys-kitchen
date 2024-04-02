/* eslint-disable no-unused-vars */
import React from 'react'
import {Link} from 'react-router-dom'
const AboutBanner = () => {
  return (
    <>
      <div className="about-banner">
        <div className="about-banner-sec">
          <div className="container">
            <div className="row">
              <div className="col-md-6">

                <div className="banner-sec-img">
                <div className="about-banner-text">
               
               <h2>The Fastest Delivery In <span>Your City</span></h2>
               <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Commodo, sed proin amet a vestibulum enim volutpat lacus. Volutpat arcu sit sed tortor etiam volutpat ipsum. </p>
               <Link to='/catering'>Get Started</Link>
               <Link to='/services'>More Services</Link>
             </div>
             <div className="banner-scrible">
             <img src="/images/home/ab-group.jpg" alt="" />
             </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="about-banner-text-sec">
                <div className="about-banner-text-bg"></div>
                  <div className="row">
                    <div className="col-md-6">
                   <Link to='/menu?category=Cloud%20Kitchen&subcat=Starters&product=chicken-65'>
                   <div className="about-banner-cards">
                      <div className="about-banner-cards-image">
                      <img src="/images/home/ab-banner-1.png" alt="" />
                      </div>
                      <div className="about-banner-cards-text">
                        <h4>Starters</h4>
                        <strong>Chilly Chicken</strong>
                        <p>250</p>
                      </div>
                    </div>
                   </Link>
                    </div>
                    <div className="col-md-6">
                    <Link to='/menu?category=Cloud%20Kitchen&subcat=Gravy&product=dal-tadka'>
                    <div className="about-banner-cards">
                      <div className="about-banner-cards-image">
                        <img src="/images/home/ab-banner-2.png" alt="" />
                      </div>
                      <div className="about-banner-cards-text">
                        <h4>Gravy</h4>
                        <strong>Chilly Chicken</strong>
                        <p>250</p>
                      </div>
                    </div>
                    </Link>
                    </div>
                    <div className="col-md-6">
                    <Link to='/menu?category=Cloud%20Kitchen&subcat=Combos&product=dal-chawal-combo'>
                    <div className="about-banner-cards">
                      <div className="about-banner-cards-image">
                        <img src="/images/home/ab-banner-3.png" alt="" />
                      </div>
                      <div className="about-banner-cards-text">
                        <h4>Combos</h4>
                        <strong>Chilly Chicken</strong>
                        <p>250</p>
                      </div>
                    </div>
                    </Link>
                    </div>
                    <div className="col-md-6">
                    <Link to='/menu?category=Cloud%20Kitchen&subcat=Rice%20and%20Biryani&product=dal-khichdi'>
                    <div className="about-banner-cards">
                      <div className="about-banner-cards-image">
                        <img src="/images/home/ab-banner-4.png" alt="" />
                      </div>
                      <div className="about-banner-cards-text">
                        <h4>Rice & Biryani</h4>
                        <strong>Chilly Chicken</strong>
                        <p>250</p>
                      </div>
                    </div>
                    </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutBanner