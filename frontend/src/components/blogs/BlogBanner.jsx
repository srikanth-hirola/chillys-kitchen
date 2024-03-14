/* eslint-disable no-unused-vars */
import { Breadcrumb } from 'antd'
import React from 'react'
import { HomeOutlined, UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';

const Blogbanner = () => {
  return (
    <>
    <div className="menu-banner">
        <div className="menu-banner-sub " style={{backgroundImage:'url(images/menu/banner.png)'}}>
            <div className="menu-banner-sec">
            <h2>Menu</h2>
       
       <Breadcrumb>
     <Breadcrumb.Item className='bd-item' href="/">
       <HomeOutlined  className='bd-icon' />
       <span className='bd-item' >Home</span>
     </Breadcrumb.Item>
     <Breadcrumb.Item className='bd-item' href="#">
       <UserOutlined className='bd-icon'  />
       <span className='bd-item'>Blog</span>
     </Breadcrumb.Item>
    
   </Breadcrumb>
            </div>
    </div>
    </div>
    </>
  )
}

export default Blogbanner