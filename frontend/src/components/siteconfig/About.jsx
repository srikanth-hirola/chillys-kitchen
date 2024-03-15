/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import SideBar from '../Sidebar';
import sidebar_menu from '../../constants/sidebar-menu';

const { TextArea } = Input;

const SiteConfigAbout = () => {
  const [form] = Form.useForm();
  const [fields, setFields] = useState([]);

  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  const handleAddField = () => {
    const newFields = [...fields];
    newFields.push({});
    setFields(newFields);
  };

  const handleRemoveField = (index) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  return (
    <div className='dashboard-container'>
            <SideBar menu={sidebar_menu} />
            <div className='dashboard-content'>
            <Form form={form} name="dynamicFieldsForm" onFinish={onFinish} layout="vertical">
      <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please input the title!' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Sub Title" name="subTitle" rules={[{ required: true, message: 'Please input the sub title!' }]}>
        <Input />
      </Form.Item>
      {fields.map((field, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
          <Form.Item label="Image" name={['fields', index, 'image']} rules={[{ required: true, message: 'Please input the image!' }]}>
            <input type="file" name="" id="" />
          </Form.Item>
          <Form.Item label="Title" name={['fields', index, 'title']} rules={[{ required: true, message: 'Please input the title!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Description" name={['fields', index, 'description']} rules={[{ required: true, message: 'Please input the description!' }]}>
            <Input />
          </Form.Item>
          <Button type="primary" danger onClick={() => handleRemoveField(index)} style={{ marginLeft: '8px' }} icon={<MinusCircleOutlined />}>
            Remove
          </Button>
        </div>
      ))}
      <Form.Item>
        <Button type="dashed" onClick={handleAddField} style={{ width: '100%' }} icon={<PlusOutlined />}>
          Add Field
        </Button>
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

export default SiteConfigAbout;
