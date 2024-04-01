/* eslint-disable no-unused-vars */
import { Breadcrumb } from 'antd'
import React from 'react'
import { HomeOutlined, UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';

// eslint-disable-next-line react/prop-types
const Banner = ({title, text1 , text2}) => {
  return (
    <>
    <div className="menu-banner">
        <div className="menu-banner-sub " style={{backgroundImage:'url(images/menu/banner.png)'}}>
            <div className="menu-banner-sec">
            <h2>{title}</h2>
       
       <Breadcrumb>
     <Breadcrumb.Item className='bd-item' href="/">
       <HomeOutlined  className='bd-icon' />
       <span className='bd-item' >{text1}</span>
     </Breadcrumb.Item>
     <Breadcrumb.Item className='bd-item' href="/user">
       <UserOutlined className='bd-icon'  />
       <span className='bd-item'>{text2}</span>
     </Breadcrumb.Item>
    
   </Breadcrumb>
            </div>
    </div>
    </div>
    </>
  )
}

export default Banner