/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { PhoneOutlined, MailOutlined, AimOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const AboutUs = ({ aboutUsOneContent }) => {
  return (
    <>
      <div className="home-about">
        <div className="home-about-sub">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="home-about-img">
                  {aboutUsOneContent && (
                    <div className="home-about-img-sec-one">
                      <img
                        src={aboutUsOneContent?.AboutUsSectionImage?.image?.url}
                        alt=""
                      />
                    </div>
                  )}
                  <div className="home-about-img-text-sec">
                    <div className="home-about-img-text-sec-sub">
                      {aboutUsOneContent && (
                        <h4>{aboutUsOneContent?.infoTitle}</h4>
                      )}
                      <ul>
                        <li>
                          <span>
                            <PhoneOutlined />
                          </span>
                          <p>
                            {aboutUsOneContent && (
                              <a href={`tel:${aboutUsOneContent?.phoneNumber}`}>
                                {aboutUsOneContent?.phoneNumber}
                              </a>
                            )}
                          </p>
                        </li>
                        <li>
                          <span>
                            <MailOutlined />
                          </span>
                          <p>
                            {aboutUsOneContent && (
                              <a href={`mainto:${aboutUsOneContent?.email}`}>
                                {aboutUsOneContent?.email}
                              </a>
                            )}
                          </p>
                        </li>
                        <li>
                          <span>
                            <AimOutlined />
                          </span>
                          {aboutUsOneContent && (
                            <p>{aboutUsOneContent?.address}</p>
                          )}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                {aboutUsOneContent && (
                  <div className="home-about-text">
                    <h3>{aboutUsOneContent?.title}</h3>
                    <p className="text-p-one">
                      {aboutUsOneContent?.descriptionOne}
                    </p>
                    <p className="text-p-two">
                      {aboutUsOneContent?.descriptionTwo}
                    </p>
                    <Link className="" to={aboutUsOneContent?.buttonLink}>{aboutUsOneContent?.buttonName}</Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
