/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */
// /* eslint-disable react/prop-types */
// import React, {useEffect, useState} from 'react';
// import { useLocation } from 'react-router-dom';

// import SideBarItem from './sidebar-item';

// import './styles.css';
// import logo from '../../assets/images/white-logo.png';
// import LogoutIcon from '../../assets/icons/logout.svg';

// function SideBar ({ menu }) {
//     const location = useLocation();

//     const [active, setActive] = useState(1);

//     useEffect(() => {
//         menu.forEach(element => {
//             if (location.pathname === element.path) {
//                 setActive(element.id);
//             }
//         });
//     }, [location.pathname])

//     const __navigate = (id) => {
//         setActive(id);
//     }

//     return(
//         <nav className='sidebar'>
//             <div className='sidebar-container'>
//                 <div className='sidebar-logo-container'>
//                     <img
//                         src={logo}
//                         alt="logo" />
//                 </div>

//                 <div className='sidebar-container'>
//                     <div className='sidebar-items'>
//                         {menu.map((item, index) => (
//                             <div key={index} onClick={() => __navigate(item.id)}>
//                                 <SideBarItem
//                                     active={item.id === active}
//                                     item={item} />
//                             </div>
//                         ))}
//                     </div>

//                     <div className='sidebar-footer'>
//                         <span className='sidebar-item-label'>Logout</span>
//                         <img 
//                             src={LogoutIcon}
//                             alt='icon-logout'
//                             className='sidebar-item-icon' />
//                     </div>
//                 </div>
//             </div>
//         </nav>
//     )
// }

// export default SideBar;
// import React, { useEffect, useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';

// import SideBarItem from './sidebar-item';
// import './styles.css';
// import logo from '/images/logo.png';
// import LogoutIcon from '../../assets/icons/logout.svg';

// function SideBar({ menu }) {
//     const location = useLocation();

//     const [active, setActive] = useState(1);
//     const [openSubMenu, setOpenSubMenu] = useState(null);

//     useEffect(() => {
//         menu.forEach(element => {
//             if (location.pathname === element.path) {
//                 setActive(element.id);
//             } else if (element.submenu) {
//                 element.submenu.forEach(subItem => {
//                     if (location.pathname === subItem.path) {
//                         setActive(subItem.id);
//                         setOpenSubMenu(element.id);
//                     }
//                 });
//             }
//         });
//     }, [location.pathname]);

//     const handleSubMenuToggle = (itemId) => {
//         if (openSubMenu === itemId) {
//             setOpenSubMenu(null);
//         } else {
//             setOpenSubMenu(itemId);
//         }
//     };
//     return (
//         <nav className='sidebar'>
//         <div className='sidebar-container'>
//             <div className='sidebar-logo-container'>
//                 <img src={logo} alt="logo" />
//             </div>

//             <div className='sidebar-container'>
//                 <div className='sidebar-items'>
//                     {menu.map(item => (
//                         <React.Fragment key={item.id}>
//                             {item.submenu ? (
//                                 <>
//                                     <div onClick={() => handleSubMenuToggle(item.id)}>
//                                         <SideBarItem
//                                             active={item.id === active}
//                                             item={item}
//                                         />
//                                     </div>
//                                     {openSubMenu === item.id && (
//                                         item.submenu.map(subItem => (
//                                             <Link key={subItem.id} to={subItem.path}>
//                                                 <SideBarItem
//                                                     active={subItem.id === active}
//                                                     item={subItem}
//                                                     isSubItem
//                                                 />
//                                             </Link>
//                                         ))
//                                     )}
//                                 </>
//                             ) : (
//                                 <Link key={item.id} to={item.path}>
//                                     <SideBarItem
//                                         active={item.id === active}
//                                         item={item}
//                                     />
//                                 </Link>
//                             )}
//                         </React.Fragment>
//                     ))}
//                 </div>

//                 <div className='sidebar-footer'>
//                     <span className='sidebar-item-label'>Logout</span>
//                     <img src={LogoutIcon} alt='icon-logout' className='sidebar-item-icon' />
//                 </div>
//             </div>
//         </div>
//     </nav>
//     );
// }

// export default SideBar;

import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import logo from '/images/logo.png';
import LogoutIcon from '../../assets/icons/logout.svg';
import sidebar_menu from '../../constants/sidebar-menu';

import './styles.css';

const { Sider } = Layout;

const SideBar = () => {
    const location = useLocation();
    const [openKeys, setOpenKeys] = useState([]);

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
                <span className="sidebar-item-label">Logout</span>
                <img src={LogoutIcon} alt="icon-logout" className="sidebar-item-icon" />
            </div>
        </Sider>
    );
};

export default SideBar;

