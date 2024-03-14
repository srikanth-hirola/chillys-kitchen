/* eslint-disable no-unused-vars */
import React from 'react';
import sidebar_menu from '../../../constants/sidebar-menu';
import SideBar from '../../../components/Sidebar';

function Dashboard() {
    return (
        <div className='dashboard-container'>
            <SideBar menu={sidebar_menu} />
            <div className='dashboard-content'>
               <h2>Admin Dashboard</h2>
            </div>
        </div>
    );
}

export default Dashboard;
