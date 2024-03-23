/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

const CateringServices = () => {
  return (
    <>
      <div className="catering-services">
        <div className="catering-services-sub" style={{backgroundImage:`url('/images/home/ser-banner.png')`}}>
          <div className="container">
            <div className="catering-services-title">
              <h4>
                <span className="line-one"></span>
                <p>Our Services</p>
                <span className="line-two"></span>
              </h4>
              <h5>What We Offer</h5>
            </div>
            <div className="services-section">
              <div className="scribe-one">
                <img src="/images/home/scribe-3.webp" alt="" />
              </div>
              <div className="row">
                <div className="col-md-3">
                  <div className="services-section-cards">
                    <div className="services-section-cards-img">
                      <img src="/images/home/wedding.svg" alt="" />
                    </div>
                    <div className="services-section-cards-text">
                      <h5>Wedding Services</h5>
                      <p>
                        Contrary to popular belief, ipsum is not simply random.
                      </p>
                      <Link to="">Read More</Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="services-section-cards">
                    <div className="services-section-cards-img">
                      <img src="/images/home/corporate.svg" alt="" />
                    </div>
                    <div className="services-section-cards-text">
                      <h5>Corporate Catering</h5>
                      <p>
                        Contrary to popular belief, ipsum is not simply random.
                      </p>
                      <Link to="">Read More</Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="services-section-cards">
                    <div className="services-section-cards-img">
                      <img src="/images/home/cocktail.svg" alt="" />
                    </div>
                    <div className="services-section-cards-text">
                      <h5>Cocktail Reception</h5>
                      <p>
                        Contrary to popular belief, ipsum is not simply random.
                      </p>
                      <Link to="">Read More</Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="services-section-cards">
                    <div className="services-section-cards-img">
                      <img src="/images/home/bento.svg" alt="" />
                    </div>
                    <div className="services-section-cards-text">
                      <h5>Bento Catering</h5>
                      <p>
                        Contrary to popular belief, ipsum is not simply random.
                      </p>
                      <Link to="">Read More</Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="services-section-cards">
                    <div className="services-section-cards-img">
                      <img src="/images/home/buffet.svg" alt="" />
                    </div>
                    <div className="services-section-cards-text">
                      <h5>Buffet Catering</h5>
                      <p>
                        Contrary to popular belief, ipsum is not simply random.
                      </p>
                      <Link to="">Read More</Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="services-section-cards">
                    <div className="services-section-cards-img">
                      <img src="/images/home/sit-down.svg" alt="" />
                    </div>
                    <div className="services-section-cards-text">
                      <h5>Sit-down Catering</h5>
                      <p>
                        Contrary to popular belief, ipsum is not simply random.
                      </p>
                      <Link to="">Read More</Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="services-section-cards">
                    <div className="services-section-cards-img">
                      <img src="/images/home/home.svg" alt="" />
                    </div>
                    <div className="services-section-cards-text">
                      <h5>Home Delivery</h5>
                      <p>
                        Contrary to popular belief, ipsum is not simply random.
                      </p>
                      <Link to="">Read More</Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="services-section-cards">
                    <div className="services-section-cards-img">
                      <img src="/images/home/pub.svg" alt="" />
                    </div>
                    <div className="services-section-cards-text">
                      <h5>Pub Party</h5>
                      <p>
                        Contrary to popular belief, ipsum is not simply random.
                      </p>
                      <Link to="">Read More</Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="scribe-two">
                <img src="/images/home/scribe-4.webp" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CateringServices;
