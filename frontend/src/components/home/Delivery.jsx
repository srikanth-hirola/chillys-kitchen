/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import {
  ClockCircleOutlined,
  ShoppingCartOutlined,
  ContainerOutlined,
} from "@ant-design/icons";
const Delivery = ({ deliverySectionContent }) => {
  return (
    <>
      <div className="home-delivery">
        <div className="home-delivery-sub">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-8">
                <div className="home-delivery-img-sec">
                  <div className="row">
                    <div className="col-md-8">
                      {deliverySectionContent && (
                        <div className="home-delivery-img-sec-img-one">
                          <img
                            src={deliverySectionContent?.MainImage?.image?.url}
                            alt=""
                          />
                        </div>
                      )}
                    </div>
                    {deliverySectionContent && (
                      <div className="col-md-4">
                        <div className="home-delivery-img-sec-img-two">
                          <img
                            src={
                              deliverySectionContent?.SideImageOne?.image?.url
                            }
                            alt=""
                          />
                        </div>
                        <div className="home-delivery-img-sec-img-three">
                          <img
                            src={
                              deliverySectionContent?.SideImageTwo?.image?.url
                            }
                            alt=""
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="home-delivery-sec-text">
                  <div className="home-delivery-sec-text">
                    {deliverySectionContent && (
                      <h3>{deliverySectionContent?.title}</h3>
                    )}
                    {deliverySectionContent && (
                      <p>{deliverySectionContent?.description}</p>
                    )}
                    <ul>
                      {deliverySectionContent &&  deliverySectionContent?.deliveryLists?.map((lists, i) => (
                        <li key={i}>
                        <span>
                          <img src={lists?.image?.url} alt="" />
                        </span>
                        <p>{lists?.text}</p>
                      </li>
                      ))}
                      {/* <li>
                        <span>
                          <ContainerOutlined />
                        </span>
                        <p>Best Offer & Prices</p>
                      </li>
                      <li>
                        <span>
                          <ShoppingCartOutlined />
                        </span>
                        <p>Online Services Available</p>
                      </li> */}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Delivery;
