/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Form, Input, Button, Upload } from 'antd';
import SideBar from '../Sidebar';
import sidebar_menu from '../../constants/sidebar-menu';

const { TextArea } = Input;


const SiteConfigBanner = () => {

  const [bannerImages, setbannerImages] = useState([]);
  const [bannerSubTitle, setBannerSubTitle] = useState();

  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file types!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must be smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  console.log("first", beforeUpload)
  
  return (
    <div className='dashboard-container'>
      <SideBar menu={sidebar_menu} />
      <div className='dashboard-content'>
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
            valuePropName="fileList"
            getValueFromEvent={(e) => e.fileList}
            rules={[{ required: true, message: 'Please upload an image!' }]}
          >
            <Upload
              beforeUpload={beforeUpload}
              listType="picture-card"
              multiple={true}
            >
              <Button>Click to upload</Button>
            </Upload>
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
