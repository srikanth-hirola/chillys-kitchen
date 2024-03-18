/* eslint-disable no-unused-vars */
import React from 'react';
import { Form, Input, Button } from 'antd';
import SideBar from '../Sidebar';
import sidebar_menu from '../../constants/sidebar-menu';
import DashboardHeader from '../DashboardHeader';

const { TextArea } = Input;

const SiteConfigBanner = () => {
  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  return (
    <div className='dashboard-container'>
      <SideBar menu={sidebar_menu} />
      <div className='dashboard-content'>
      <div className="dashboard-header">
                    <h3>Banner Configuraion Settings</h3>
                    <div className="add-btn">
                        <DashboardHeader />
                    </div>
                </div>
        <Form
          name="customForm"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please input the title!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Main Title"
            name="mainTitle"
            rules={[{ required: true, message: 'Please input the main title!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please input the description!' }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            label="Button One"
            name="buttonOne"
            rules={[{ required: true, message: 'Please input the button one!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Button One Link"
            name="buttonOneLink"
            rules={[{ required: true, message: 'Please input the button one link!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Button Two"
            name="buttonTwo"
            rules={[{ required: true, message: 'Please input the button two!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Button Two Link"
            name="buttonTwoLink"
            rules={[{ required: true, message: 'Please input the button two link!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Upload Image"
            name="image"
            rules={[{ required: true, message: 'Please upload an image!' }]}
          >
            <Input type="file" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SiteConfigBanner;
