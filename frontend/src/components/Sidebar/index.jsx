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
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import SideBarItem from './sidebar-item';
import './styles.css';
import logo from '/images/logo.png';
import LogoutIcon from '../../assets/icons/logout.svg';

function SideBar({ menu }) {
    const location = useLocation();

    const [active, setActive] = useState(1);
    const [openSubMenu, setOpenSubMenu] = useState(null);

    useEffect(() => {
        menu.forEach(element => {
            if (location.pathname === element.path) {
                setActive(element.id);
            } else if (element.submenu) {
                element.submenu.forEach(subItem => {
                    if (location.pathname === subItem.path) {
                        setActive(subItem.id);
                        setOpenSubMenu(element.id);
                    }
                });
            }
        });
    }, [location.pathname]);

    const handleSubMenuToggle = (itemId) => {
        if (openSubMenu === itemId) {
            setOpenSubMenu(null);
        } else {
            setOpenSubMenu(itemId);
        }
    };
    return (
        <nav className='sidebar'>
        <div className='sidebar-container'>
            <div className='sidebar-logo-container'>
                <img src={logo} alt="logo" />
            </div>

            <div className='sidebar-container'>
                <div className='sidebar-items'>
                    {menu.map(item => (
                        <React.Fragment key={item.id}>
                            {item.submenu ? (
                                <>
                                    <div onClick={() => handleSubMenuToggle(item.id)}>
                                        <SideBarItem
                                            active={item.id === active}
                                            item={item}
                                        />
                                    </div>
                                    {openSubMenu === item.id && (
                                        item.submenu.map(subItem => (
                                            <Link key={subItem.id} to={subItem.path}>
                                                <SideBarItem
                                                    active={subItem.id === active}
                                                    item={subItem}
                                                    isSubItem
                                                />
                                            </Link>
                                        ))
                                    )}
                                </>
                            ) : (
                                <Link key={item.id} to={item.path}>
                                    <SideBarItem
                                        active={item.id === active}
                                        item={item}
                                    />
                                </Link>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                <div className='sidebar-footer'>
                    <span className='sidebar-item-label'>Logout</span>
                    <img src={LogoutIcon} alt='icon-logout' className='sidebar-item-icon' />
                </div>
            </div>
        </div>
    </nav>
    );
}

export default SideBar;
