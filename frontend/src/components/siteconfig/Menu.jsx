/* eslint-disable no-unused-vars */
// Import necessary components and icons
import React, { useState } from 'react';
import { Form, Input, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import SideBar from '../Sidebar';
import sidebar_menu from '../../constants/sidebar-menu';
import DashboardHeader from '../DashboardHeader';

const SiteConfigMenu = () => {
  const [form] = Form.useForm();
  const [contactFormKeys, setContactFormKeys] = useState(['contact1']);
  const [mainDescription, setMainDescription] = useState('');

  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  const onAddContact = () => {
    const newKeys = [...contactFormKeys];
    const nextKey = `contact${newKeys.length + 1}`;
    newKeys.push(nextKey);
    setContactFormKeys(newKeys);
  };

  const onRemoveContact = (key) => {
    setContactFormKeys(contactFormKeys.filter((k) => k !== key));
  };

  return (
    <div className='dashboard-container'>
      <SideBar menu={sidebar_menu} />
      <div className='dashboard-content'>
      <div className="dashboard-header">
                    <h3>Header Configuration Settings</h3>
                    <div className="add-btn">
                        <DashboardHeader />
                    </div>
                </div>
        <Form form={form} name="dynamic_form" onFinish={onFinish}>
          <Form.Item label="Main Description" name="mainDescription">
            <Input.TextArea value={mainDescription} onChange={(e) => setMainDescription(e.target.value)} />
          </Form.Item>
         
          <Form.Item label="Title" name="title">
            <Input />
          </Form.Item>
          
         
          <Form.List name="contacts">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                  <div className="row">
                    <div className="col-md-12">
                    <Form.Item
                      {...restField}
                      name={[name, 'image']}
                      label="image"
                      fieldKey={[fieldKey, 'image']}
                      rules={[{ required: true, message: 'Missing contact image' }]}
                    >
                      <input type="file" name="" id="" />
                    </Form.Item>
                    </div>
                    <div className="col-md-12">
                    <Form.Item
                      {...restField}
                      name={[name, 'description']}
                      label="description"
                      fieldKey={[fieldKey, 'description']}
                      rules={[{ required: true, message: 'Missing contact description' }]}
                    >
                     <Input placeholder="Description" />
                    </Form.Item>
                    </div>
                    <div className="col-md-12">
                    <Form.Item
                      {...restField}
                      name={[name, 'text']}
                      label="text"
                      fieldKey={[fieldKey, 'text']}
                      rules={[{ required: true, message: 'Missing contact text' }]}
                    >
                      <Input placeholder="Contact Text" />
                    </Form.Item>
                    </div>
                    <div className="col-md-12">
                    <Form.Item
                      {...restField}
                      name={[name, 'link']}
                      label="link"
                      fieldKey={[fieldKey, 'link']}
                      rules={[{ required: true, message: 'Missing contact link' }]}
                    >
                      <Input placeholder="Contact Link" />
                    </Form.Item>
                    </div>
                  </div>
                  
                  
                    
                   
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  >
                    Add Contact
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
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

export default SiteConfigMenu;
