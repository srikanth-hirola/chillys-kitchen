/* eslint-disable no-unused-vars */
import React from 'react';
import { Tabs } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons'; // Import Ant Design icons
import { Link } from 'react-router-dom';

const { TabPane } = Tabs;

const OurMenu = () => {
  return (
    <div className="our-menu">
      <div className="our-menu-sub" style={{ backgroundImage: `url(images/home/tabs.jpg)` }}>
        <div className="container">
          <Tabs
            defaultActiveKey="1"
            centered
            style={{ height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <TabPane
              tab={
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} className='tb-title'>
                  <span><img src="images/home/pizza.png" className='tab-img' alt="" /></span>
                  <span>All  </span>
                </div>
              }
              key="1"
            >
              <div className="our-menu-tab-cards">
                <div className="row">
                  <div className="col-md-4">
                    <div className="our-menu-cards">
                      <div className="our-menu-tab-cards-image">
                        <img src="images/home/fast-2.webp" alt="" />
                      </div>
                      <div className="our-menu-tab-cards-text">
                        <h3>Margherita Pizza</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                          Nunc tellus turpis</p>
                        <div className="cart-sec">
                          <span>Delivery Fee : 500</span>
                          <Link><ShoppingCartOutlined /></Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="our-menu-cards">
                      <div className="our-menu-tab-cards-image">
                        <img src="images/home/fast-1.webp" alt="" />
                      </div>
                      <div className="our-menu-tab-cards-text">
                        <h3>Margherita Pizza</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                          Nunc tellus turpis</p>
                        <div className="cart-sec">
                          <span>Delivery Fee : 500</span>
                          <Link><ShoppingCartOutlined /></Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="our-menu-cards">
                      <div className="our-menu-tab-cards-image">
                        <img src="images/home/fast-1.webp" alt="" />
                      </div>
                      <div className="our-menu-tab-cards-text">
                        <h3>Margherita Pizza</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                          Nunc tellus turpis</p>
                        <div className="cart-sec">
                          <span>Delivery Fee : 500</span>
                          <Link><ShoppingCartOutlined /></Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="our-menu-cards">
                      <div className="our-menu-tab-cards-image">
                        <img src="images/home/fast-1.webp" alt="" />
                      </div>
                      <div className="our-menu-tab-cards-text">
                        <h3>Margherita Pizza</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                          Nunc tellus turpis</p>
                        <div className="cart-sec">
                          <span>Delivery Fee : 500</span>
                          <Link><ShoppingCartOutlined /></Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="our-menu-cards">
                      <div className="our-menu-tab-cards-image">
                        <img src="images/home/fast-1.webp" alt="" />
                      </div>
                      <div className="our-menu-tab-cards-text">
                        <h3>Margherita Pizza</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                          Nunc tellus turpis</p>
                        <div className="cart-sec">
                          <span>Delivery Fee : 500</span>
                          <Link><ShoppingCartOutlined /></Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="our-menu-cards">
                      <div className="our-menu-tab-cards-image">
                        <img src="images/home/fast-1.webp" alt="" />
                      </div>
                      <div className="our-menu-tab-cards-text">
                        <h3>Margherita Pizza</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                          Nunc tellus turpis</p>
                        <div className="cart-sec">
                          <span>Delivery Fee : 500</span>
                          <Link><ShoppingCartOutlined /></Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane
              tab={
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} className='tb-title'>
                  <span><img src="images/home/biryani.png" className='tab-img' alt="" /></span>
                  <span>Biriyani  </span>
                </div>
              }
              key="2"
            >
              Content of Biriyani
            </TabPane>
            <TabPane
              tab={
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} className='tb-title'>
                  <span><img src="images/home/dessert.png" className='tab-img' alt="" /></span>
                  <span>Desserts  </span>
                </div>
              }
              key="3"
            >
              Content of Desserts
            </TabPane>
            <TabPane
              tab={
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} className='tb-title'>
                  <span><img src="images/home/gravy.png" className='tab-img' alt="" /></span>
                  <span>Gravy  </span>
                </div>
              }
              key="4"
            >
              Content of Gravy
            </TabPane>
            <TabPane
              tab={
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} className='tb-title'>
                  <span><img src="images/home/food.png" className='tab-img' alt="" /></span>
                  <span>Meals  </span>
                </div>
              }
              key="5"
            >
              Content of Meals
            </TabPane>
            <TabPane
              tab={
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} className='tb-title'>
                  <span><img src="images/home/rice.png" className='tab-img' alt="" /></span>
                  <span>Rice  </span>
                </div>
              }
              key="6"
            >
              Content of Rice
            </TabPane>
            <TabPane
              tab={
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} className='tb-title'>
                  <span><img src="images/home/starter.png" className='tab-img' alt="" /></span>
                  <span>Starter  </span>
                </div>
              }
              key="7"
            >
              Content of Starter
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default OurMenu;
