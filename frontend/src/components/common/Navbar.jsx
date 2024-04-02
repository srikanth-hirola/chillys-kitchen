/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
// import React, { useEffect, useState } from 'react';
// import { ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons'
// import { Link } from 'react-router-dom';
// import { Badge, Dropdown, Menu } from 'antd';
// import { useSelector } from 'react-redux';

// const Navbar = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [categories, setCategories] = useState([]);

//   const { category } = useSelector((state) => state.category);
//   const { wishlist } = useSelector((state) => state.wishlist);
//   const { cart } = useSelector((state) => state.cart);
//   const { user } = useSelector((state) => state.user);

//   console.log(cart?.length, wishlist?.length)

//   useEffect(() => {
//     const handleScroll = () => {
//       const bannerHeight = document.getElementById("banner-sec").offsetHeight;
//       const scrollTop = window.scrollY;
//       const scrolled = scrollTop > bannerHeight;
//       setIsScrolled(scrolled);
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   useEffect(() => {
//     const fetchCategory = async () => {
//       try {
//         setCategories(() => category?.map((item, index) => {
//           return {
//             key: index + 1,
//             label: (
//               <Link to={`/menu?category=${item?.category}`}>{item?.category}</Link>
//             )
//           }
//         }))
//       } catch (error) {
//         console.log(error)
//       }
//     }
//     fetchCategory()
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [category])

//   const menu = (
//     <Menu>
//       {categories?.length > 0 && categories?.map((category) => (
//         <Menu.Item key={category.key}>{category.label}</Menu.Item>
//       ))}
//     </Menu>
//   );

//   return (
//     <>
//       <div className={`header-sec ${isScrolled ? "solid" : "transparent"}`}>
//         <div className="header-sec-sub">
//           <div className="container">
//             <div className="row align-items-center">
//               <div className="col-md-3">
//                 <div className="logo-sec">
//                   <img src="/images/logo.png" alt="" />
//                 </div>
//               </div>
//               <div className="col-md-9">
//                 <div className="header-menu">
//                   <ul>
//                     <li>
//                       <Link to="/">Home</Link>
//                     </li>
//                     <li>
//                       <Link to="/about">About</Link>
//                     </li>
//                     <li>
//                       {/* <Link to='/menu'>Menu</Link> */}
//                       <Dropdown overlay={menu} placement="bottomLeft">
//                         <Link >Menu</Link>
//                       </Dropdown>
//                     </li>
//                     <li>
//                       <Link to="/catering">Catering</Link>
//                     </li>
//                     <li>
//                       <Link to="/blog">Blog</Link>
//                     </li>
//                     <li>
//                       <Link to="/contact-us">Contact</Link>
//                     </li>
//                     <li>
//                       <Link to='/cart'>
//                         <Badge count={cart?.length ?? 0} /* Set your desired count here */>
//                           <span className='badge-count' >
//                             <ShoppingCartOutlined style={{ fontSize: '20px' }} />
//                           </span>
//                         </Badge>
//                       </Link>
//                     </li>
//                     <li>
//                       <Link to='/wishlist'>
//                         <Badge count={wishlist?.length} /* Add the 'dot' prop for a simple dot without a count */>
//                           <span className='badge-count'>
//                             <HeartOutlined style={{ fontSize: '20px' }} />
//                           </span>
//                         </Badge>
//                       </Link>
//                     </li>

//                     <li>
//                       <span>
//                         <a href="tel:+91 9874563210">+91 9874563210</a>
//                       </span>
//                     </li>
//                     <li>
//                       <span>
//                         <Link to={user ? '/profile' : '/user-login'}>{user ? "Profile" : "Login"}</Link>
//                       </span>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Navbar;

import React, { useEffect, useState } from 'react';
import { ShoppingCartOutlined, HeartOutlined, MenuOutlined,CloseOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Badge, Dropdown, Menu, Drawer } from 'antd';
import { useSelector } from 'react-redux';

const Navbar = () => {

  const { success, error, siteConfigData } = useSelector(
    (state) => state.siteConfig
  );

  const navbardata = siteConfigData.headerContent;

  const [isScrolled, setIsScrolled] = useState(false);
  const [categories, setCategories] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const { category } = useSelector((state) => state.category);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const handleScroll = () => {
      const bannerHeight = document.getElementById("banner-sec").offsetHeight;
      const scrollTop = window.scrollY;
      const scrolled = scrollTop > bannerHeight;
      setIsScrolled(scrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setCategories(() =>
          category?.map((item, index) => {
            return {
              key: index + 1,
              label: (
                <Link className='text-dark' to={`/menu?category=${item?.category}`}>{item?.category}</Link>
              )
            };
          })
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const menu = (
    <Menu>
      {categories?.length > 0 &&
        categories?.map((category) => (
          <Menu.Item className='text-dark' key={category.key}>{category.label}</Menu.Item>
        ))}
       
    </Menu>
  );

  const handleDrawerClose = () => {
    setDrawerVisible(false);
  };

  const handleDrawerOpen = () => {
    setDrawerVisible(true);
  };

  return (
    <>
      <div className={`header-sec ${isScrolled ? "solid" : "transparent"}`}>
        <div className="header-sec-sub">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-3">
                {navbardata && 
                <div className="logo-sec">
                  <Link to='/'>
                  <img src={navbardata?.headerLogo?.image?.url} alt="" />
                  </Link>
                </div>
                }
              </div>
              <div className="col-md-9">
                <div className="header-menu">
                  <ul>
                    {navbardata && navbardata?.navItems?.map((navitems, i) => (
                      <li key={i}>
                      <Link to={navitems?.link}>{navitems?.title}</Link>
                    </li>
                    ))}
                    <li>
                      <Link to="/cart">
                        <Badge count={cart?.length ?? 0}>
                          <ShoppingCartOutlined style={{ fontSize: '20px' }} />
                        </Badge>
                      </Link>
                    </li>
                    <li>
                      <Link to="/wishlist">
                        <Badge count={wishlist?.length}>
                          <HeartOutlined style={{ fontSize: '20px' }} />
                        </Badge>
                      </Link>
                    </li>
                    <li>
                      {navbardata && 
                      <span>
                        <a href={`tel:${navbardata.phonenumber}`}>{navbardata.phonenumber}</a>
                      </span>
                      }
                    </li>
                    <li>
                      <span>
                        <Link to={user ? '/profile' : '/user-login'}>{user ? "Profile" : "Login"}</Link>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mobile-menu">
        {drawerVisible ? (
            <CloseOutlined onClick={handleDrawerClose} />
          ) : (
            <MenuOutlined onClick={handleDrawerOpen} />
          )}
          <Drawer
            title={<span><CloseOutlined className="close-icon" onClick={handleDrawerClose} /></span>}
            placement="right"
            closable={false}
            onClose={handleDrawerClose}
            visible={drawerVisible}
            className="drawer-menu" 
          >
            <Menu mode="inline">
              <Menu.Item>
                <Link className='one text-dark fw-semibold fs-6' to="/">Home</Link>
              </Menu.Item>
              <Menu.Item>
                <Link className='one text-dark fw-semibold fs-6' to="/about">About</Link>
              </Menu.Item>
              {/* <Menu.SubMenu title="Menu">
                {categories?.map((category) => (
                  <Menu.Item className='one text-dark fw-semibold fs-6' key={category.key}>{category.label}</Menu.Item>
                ))}
              </Menu.SubMenu> */}
              
              <Menu.Item>
                <Link className='one text-dark fw-semibold fs-6' to="/catering">Catering</Link>
              </Menu.Item>

              <Menu.Item>
                <Link className='one text-dark fw-semibold fs-6' to="/services">Services</Link>
              </Menu.Item>
              <Menu.Item>
                <Link className='one text-dark fw-semibold fs-6' to="/blog">Blog</Link>
              </Menu.Item>
              <Menu.Item>
                <Link className='one text-dark fw-semibold fs-6' to="/contact-us">Contact</Link>
              </Menu.Item>
              <Menu.Item>
                <Link className='one text-dark fw-semibold fs-6 mo-cart' to="/cart">
                  <Badge count={cart?.length ?? 0}>
                    <ShoppingCartOutlined className='one text-dark fw-semibold fs-6' style={{ fontSize: '20px' }} />
                  </Badge>
                  Cart
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/wishlist">
                  <Badge count={wishlist?.length}>
                    <HeartOutlined className='one text-dark fw-semibold fs-6 .mo-wish'  style={{ fontSize: '20px' }} />
                  </Badge>
                  Wishlist
                </Link>
              </Menu.Item>
              <Menu.Item>
                <a className='one-main' href="tel:+91 9874563210">+91 9874563210</a>
              </Menu.Item>
              <Menu.Item>
                <Link className='one-main' to={user ? '/profile' : '/user-login'}>{user ? "Profile" : "Login"}</Link>
              </Menu.Item>
            </Menu>
          </Drawer>
        </div>
      </div>
    </>
  );
};

export default Navbar;

