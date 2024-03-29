import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import logo from '/images/logo.png';
import LogoutIcon from '../../assets/icons/logout.svg';
import sidebar_menu from '../../constants/sidebar-menu';
import menuicon from '/images/home/menu.png'

import './styles.css';
import axios from 'axios';
import { server } from '../../server';
import toast from 'react-hot-toast';

const { Sider } = Layout;

const SideBar = () => {
    const location = useLocation();
    const [openKeys, setOpenKeys] = useState([]);
    const navigate = useNavigate();

    const activeItem = location.pathname;
    const handleLogout = () => {
        axios
            .get(`${server}/shop/logout-admin, { withCredentials: true }`)
            .then((res) => {
                toast.success(res.data.message);
                window.location.reload(true);
                navigate("/login");
            })
            .catch((error) => {
                console.log(error.response.data.message);
            });
    };

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
        const isActive = location.pathname.startsWith(subMenuItems.path);
        const menuClass = isActive ? 'Menu-title-dashboard active' : 'Menu-title-dashboard';
        return subMenuItems.map(subItem => (
            <Menu.Item key={subItem.id} className={menuClass}>
                <Link to={subItem.path}>{subItem.title}</Link>
            </Menu.Item>
        ));
    };

    const renderMenu = (menuItems) => {
        return menuItems.map(item => {
            const isActive = location.pathname.startsWith(item.path);
            const menuClass = isActive ? 'Menu-title-dashboard active' : 'Menu-title-dashboard';

            if (item.submenu) {
                return (
                    <Menu.SubMenu
                        key={item.id}
                        title={item.title}
                        // className={menuClass}
                        onTitleClick={() => setOpenKeys(openKeys.includes(item.id.toString()) ? [] : [item.id.toString()])}
                    >
                        {renderSubMenu(item.submenu)}
                    </Menu.SubMenu>
                );
            } else {
                return (
                    <Menu.Item key={item.id} className={menuClass}>
                        <Link to={item.path}>{item.title}</Link>
                    </Menu.Item>
                );
            }
        });
    };

    return (
        <>
        <div className='sidebar-toggle-button-large-main'>
                    <button
                        className="offcanvas-toggle"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasExample"
                        aria-controls="offcanvasExample"
                    >
                        <div className='Dashboard-sidebar-menu-icon'>
                            <img src={menuicon} alt="" />
                        </div>
                    </button>
                </div>
            <div className='sidebar-for-largescreens'>
                <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                    <div class="offcanvas-header">
                        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body">
                        <Sider style={{ padding: '0' }} className="sidebar">
                            <div className="logo">
                                <img src={logo} alt="logo" />
                            </div>
                            <Menu
                                mode="inline"
                                theme="dark"
                                selectedKeys={[]}
                                openKeys={openKeys}
                                onClick={handleMenuClick}
                            >
                                {renderMenu(sidebar_menu)}
                            </Menu>
                            <div className="sidebar-footer">
                                <span className="sidebar-item-label">
                                    <Link onClick={handleLogout}>
                                        Logout
                                    </Link>
                                </span>
                                <img src={LogoutIcon} alt="icon-logout" className="sidebar-item-icon" />
                            </div>
                        </Sider>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SideBar;