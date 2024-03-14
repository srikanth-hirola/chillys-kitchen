/* eslint-disable no-unused-vars */
import React from 'react';
import { Form, Input, Button, Select } from 'antd';
import DashboardHeader from '../../../components/DashboardHeader';
import SideBar from '../../../components/Sidebar';
import sidebar_menu from '../../../constants/sidebar-menu';

const { Option } = Select;

function Catering() {
    const onFinish = (values) => {
        console.log('Received values:', values);
    };

    return (
        <div className='dashboard-container'>
        <SideBar menu={sidebar_menu}/>
         <div className='dashboard-content'>
            <div className="dashboard-header">
              
              <h3>Category List</h3>
              <div className="add-btn">
              <DashboardHeader/>
              
              </div>
          </div>
        <div style={{ padding: '20px' }}>
            <h1>Catering</h1>
            <Form
                name="cateringForm"
                onFinish={onFinish}
                layout="vertical"
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input type="email" />
                </Form.Item>
                <Form.Item
                    label="Contact Number"
                    name="contactNumber"
                    rules={[{ required: true, message: 'Please input your contact number!' }]}
                >
                    <Input />
                </Form.Item>
               
                <Form.Item
                    label="Services"
                    name="services"
                    rules={[{ required: true, message: 'Please select at least one service!' }]}
                >
                    <Select mode="multiple" placeholder="Select services">
                        <Option value="wedding">Wedding</Option>
                        <Option value="birthday">Birthday</Option>
                        <Option value="corporate">Corporate</Option>
                        <Option value="other">Other</Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
        </div>
        </div>
    );
}

export default Catering;
