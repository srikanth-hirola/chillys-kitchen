// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import {ShoppingCartOutlined,HeartOutlined} from '@ant-design/icons'
import { Link } from 'react-router-dom';
import { Badge } from 'antd';
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const bannerHeight = document.getElementById('banner-sec').offsetHeight;
      const scrollTop = window.scrollY;
      const scrolled = scrollTop > bannerHeight;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className={`header-sec ${isScrolled ? 'solid' : 'transparent'}`}>
        <div className="header-sec-sub">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-3">
                <div className="logo-sec">
                  <img src="/images/logo.png" alt="" />
                </div>
              </div>
              <div className="col-md-9">
                <div className="header-menu">
                  <ul>
                    <li>
                      <Link to='/'>Home</Link>
                    </li>
                    <li>
                      <Link to='/about'>About</Link>
                    </li>
                    <li>
                      <Link to='/menu'>Menu</Link>
                    </li>
                    <li>
                      <Link to='/services'>Services</Link>
                    </li>
                    <li>
                      <Link to='/blog'>Blog</Link>
                    </li>
                    <li>
                      <Link to='/contact-us'>Contact</Link>
                    </li>
                    <li>
        <Badge count={5} /* Set your desired count here */>
          <span className='badge-count' >
            <ShoppingCartOutlined style={{fontSize:'20px'}} />
          </span>
        </Badge>
      </li>
      <li>
        <Badge count={2} /* Add the 'dot' prop for a simple dot without a count */>
          <span className='badge-count'>
            <HeartOutlined style={{fontSize:'20px'}} />
          </span>
        </Badge>
      </li>
                 
                    <li>
                      <span>
                      <a href="tel:+91 9874563210">+91 9874563210</a>
                      </span>
                    </li>
                    <li>
                      <span>
                      <Link to='/login'>Login</Link>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
