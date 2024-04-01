import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import { server } from '../../server';
import FeatherIcon from "feather-icons-react";

/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Layout, Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
// import logo from './images/logo.png';
import logo from '../../../public/images/logo.png';
import LogoutIcon from '../../assets/icons/logout.svg';
import sidebar_menu from './ProfileSidbar-Menu';

import "./ProfileStyles.css";

const { Sider } = Layout;
const UserProfileModal = () => {
    const { user } = useSelector((state) => state.user);
    const [isActive, setIsActive] = useState("");
    const navigate = useNavigate();
    const logoutHandler = () => {
        axios
            .get(`${server}/user/logout`, { withCredentials: true })
            .then((res) => {
                toast.success(res.data.message);
                window.location.reload(true);
                navigate("/user-login");
            })
            .catch((error) => {
                console.log(error.response.data.message);
            });
    };
    const location = useLocation();
    const [openKeys, setOpenKeys] = useState([]);

    const activeItem = location.pathname;

    useEffect(() => {
        const findOpenKeys = (menuItems) => {
            for (const item of menuItems) {
                if (location.pathname.startsWith(item.path) && item.submenu) {
                    setOpenKeys([item.id.toString()]);
                    return;
                }
                if (item.submenu) {
                    findOpenKeys(item.submenu);
                }
            }
        };

        findOpenKeys(sidebar_menu);
    }, [location.pathname]);

    const handleMenuClick = ({ keyPath }) => {
        setOpenKeys([keyPath[keyPath.length - 1]]);
    };

    const renderSubMenu = (subMenuItems) => {
        return subMenuItems.map(subItem => (
            <Menu.Item key={subItem.id} className={activeItem === subItem.path ? 'active' : ''}>
                <Link to={subItem.path} className={activeItem === subItem.path ? "active" : ""}>{subItem.title}</Link>
            </Menu.Item>
        ));
    };

    const renderMenu = (menuItems) => {
        return menuItems.map(item => {
            if (item.submenu) {
                return (
                    <Menu.SubMenu
                        key={item.id}
                        title={item.title}
                        onTitleClick={() => setOpenKeys(openKeys.includes(item.id.toString()) ? [] : [item.id.toString()])}
                    >
                        {renderSubMenu(item.submenu)}
                    </Menu.SubMenu>
                );
            } else {
                return (
                    <Menu.Item
                        key={item.id}
                        className={activeItem === item.path ? "active" : ""}
                    >
                        <Link to={item.path} className={activeItem === item.path ? "active" : ""}>{item.title}</Link>
                    </Menu.Item>
                );
            }
        });
    };
    return (
        <>

            <Sider style={{ padding: '0' }} className="sidebar sidebar-profile siderbar-page-profile">
                <div className='side-toggle-button'>
                    <Menu
                        mode="inline"
                        theme='#F3F5F7'
                        selectedKeys={[]}
                        openKeys={openKeys}
                        onClick={handleMenuClick}
                        className='menu-data-profile-pic'
                    >
                        {renderMenu(sidebar_menu)}
                    </Menu>
                    <div className="sidebar-footer picture-data">
                        <span className="sidebar-item-label">
                            <button type='button' onClick={logoutHandler}>Logout</button>
                        </span>
                        {/* <Feather icon="log-out"/> */}
                        <FeatherIcon icon="log-out" />
                        {/* <img src={LogoutIcon} alt="icon-logout" className="sidebar-item-icon" /> */}
                    </div>
                </div>
                {/* //mobile content */}
                <div className='toggle-close-button'>
                    <a class="btn btn-primary" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                        <FeatherIcon icon='menu' />
                    </a>
                    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                        <div class="offcanvas-header">
                            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div class="offcanvas-body">
                            <Menu
                                mode="inline"
                                theme='#F3F5F7'
                                selectedKeys={[]}
                                openKeys={openKeys}
                                onClick={handleMenuClick}
                                className='menu-data-profile-pic'
                            >
                                {renderMenu(sidebar_menu)}
                            </Menu>
                            <div className="sidebar-footer picture-data">
                                <span className="sidebar-item-label">Logout</span>
                                {/* <Feather icon="log-out"/> */}
                                <FeatherIcon icon="log-out" />
                                {/* <img src={LogoutIcon} alt="icon-logout" className="sidebar-item-icon" /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </Sider>
            {/* <div className='UserProfileModal-parent'>
                <div className=" bd-example m-0 border-0">
                    
                    <a className="btn" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                        <p>Open</p>
                       
                    </a>
                    <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                        <div className="offcanvas-header">
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <div className="">
                                <div className='ContactDetails-sub2'>
                                    <h3>Hello {user?.name}</h3>
                                    <p>Welcome to your Account</p>
                                    <div className='ContactDetails-sub2-list'>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className='ContactDetails-sub2-list-content'>
                                                    <div className='ContactDetails-sub2-list-content-image'>
                                                        <img src="DronesHomepage/userimage.png" alt="" />
                                                    </div>
                                                    <Link to="/profile">
                                                        <p>Profile</p>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className='ContactDetails-sub2-list-content'>
                                                    <div className='ContactDetails-sub2-list-content-image'>
                                                        <img src="DronesHomepage/my orders.png" alt="" />
                                                    </div>
                                                    <Link to='/orderspage'>
                                                        <p>My orders</p>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className='ContactDetails-sub2-list-content'>
                                                    <div className='ContactDetails-sub2-list-content-image'>
                                                        <img src="DronesHomepage/refund.png" alt="" />
                                                    </div>
                                                    <Link to="/refundpage">
                                                        <p>Refunds</p>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className='Profilepage-sub2-list-content'>
                                                    <div className='Profilepage-sub2-list-content-image'>
                                                        <img src="DronesHomepage/addresshome.png" alt="" />
                                                    </div>
                                                    <Link to="/contactDetailsPage">
                                                        <p>Address</p>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className='ContactDetails-sub2-list-content'>
                                                    <div className='ContactDetails-sub2-list-content-image'>
                                                        <img src="DronesHomepage/sign out.png" alt="" />
                                                    </div>
                                                    <p onClick={logoutHandler}>Sign Out</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div> */}
        </>
    );
};

export default UserProfileModal;
