/* eslint-disable no-unused-vars */
import React from 'react';
import sidebar_menu from '../../../constants/sidebar-menu';
import SideBar from '../../../components/Sidebar';
import DashboardMain from '../../../components/AdminDashboard/DashboardMain';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import DashboardHeader from '../../../components/DashboardHeader';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
function Dashboard() {
    return (
        <div className='dashboard-container'>
            <SideBar menu={sidebar_menu} />
            <div className='dashboard-content'>
                <div className="dashboard-header">
                    <h3>Admin Dashboard</h3>
                    <div className="add-btn">
                        <DashboardHeader />
                    </div>
                </div>
                <DashboardMain />
            </div>

        </div>
    );
}

export default Dashboard;
