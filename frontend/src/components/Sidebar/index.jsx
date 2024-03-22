/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import logo from '/images/logo.png';
import LogoutIcon from '../../assets/icons/logout.svg';
import sidebar_menu from '../../constants/sidebar-menu';

import './styles.css';
import axios from 'axios';
import { server } from '../../server';
import toast from 'react-hot-toast';

const { Sider } = Layout;

const SideBar = () => {
    const location = useLocation();
    const [openKeys, setOpenKeys] = useState([]);
    const navigate = useNavigate();

    const handleLogout = () => {
        axios
            .get(`${server}/shop/logout-admin`, { withCredentials: true })
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
        return subMenuItems.map(subItem => (
            <Menu.Item key={subItem.id}>
                <Link to={subItem.path}>{subItem.title}</Link>
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
                    <Menu.Item key={item.id}>
                        <Link to={item.path}>{item.title}</Link>
                    </Menu.Item>
                );
            }
        });
    };

    return (
        <Sider style={{padding:'0'}} className="sidebar">
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
    );
};

export default SideBar;

