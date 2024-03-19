/* eslint-disable no-unused-vars */
import React from 'react';
import { Form, Input, Button, Space } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import SideBar from '../Sidebar';
import sidebar_menu from '../../constants/sidebar-menu';
import DashboardHeader from '../DashboardHeader';

const SiteConfigHeader = () => {
  const onFinish = (values) => {
    console.log('Received values:', values);
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
        <Form
          name="siteConfigForm"
          onFinish={onFinish}
          layout="vertical"
        >
          {/* Logo */}
          <Form.List name="logo">
            {(fields, { add, remove }) => (
              <div>
                {fields.map((field, index) => (
                  <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...field}
                      name={[field.name, 'url']}
                      fieldKey={[field.fieldKey, 'url']}
                      rules={[{ required: true, message: 'Please input logo URL!' }]}
                    >
                    <input type="button" value="" placeholder={`Logo URL ${index + 1}`} />
                    </Form.Item>
                    {index > 0 && (
                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    )}
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  >
                    Add Logo
                  </Button>
                </Form.Item>
              </div>
            )}
          </Form.List>

          {/* Title with Link */}
          <Form.List name="titles">
            {(fields, { add, remove }) => (
              <div>
                {fields.map((field, index) => (
                  <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...field}
                      name={[field.name, 'title']}
                      fieldKey={[field.fieldKey, 'title']}
                      rules={[{ required: true, message: 'Please input title!' }]}
                    >
                      <input type="file" name="placeholder={`Title ${index + 1}`}" id="" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, 'link']}
                      fieldKey={[field.fieldKey, 'link']}
                      rules={[{ required: true, message: 'Please input link!' }]}
                    >
                      <Input placeholder={`Link ${index + 1}`} />
                    </Form.Item>
                    {index > 0 && (
                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    )}
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  >
                    Add Title with Link
                  </Button>
                </Form.Item>
              </div>
            )}
          </Form.List>

          {/* Submit Button */}
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

export default SiteConfigHeader;
