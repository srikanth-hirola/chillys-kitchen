/* eslint-disable no-unused-vars */
import React from 'react';
import SideBar from '../../../components/Sidebar';
import sidebar_menu from '../../../constants/sidebar-menu';
import DashboardHeader from '../../../components/DashboardHeader';

function EditProduct() {
    return (
        <div className='dashboard-container'>
            <SideBar menu={sidebar_menu} />
            <div className='dashboard-content'>
            <DashboardHeader/>
            <h2>Edit Products</h2>
            </div>
        </div>
    );
}

export default EditProduct;
