/* eslint-disable no-unused-vars */
import React from 'react';
import { Form, Input, Button, Space } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import SideBar from '../Sidebar';
import sidebar_menu from '../../constants/sidebar-menu';

const { TextArea } = Input;

const SiteConfigDelivery = () => {
  const onFinish = (values) => {
    console.log('Received values:', values);
  };

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
         
          {/* Main Title */}
          <Form.Item
            label="Main Title"
            name="mainTitle"
            rules={[{ required: true, message: 'Please input the main title!' }]}
          >
            <Input />
          </Form.Item>

          {/* Description */}
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please input the description!' }]}
          >
            <TextArea rows={4} />
          </Form.Item>

         

   

          {/* Additional Fields */}
          <Form.List name="additionalFields">
            {(fields, { add, remove }) => (
              <div>
                {fields.map((field, index) => (
                  <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...field}
                      name={[field.name, 'fieldName']}
                      fieldKey={[field.fieldKey, 'fieldName']}
                      rules={[{ required: true, message: 'Please input field name!' }]}
                    >
                      <input type="file" name=""  placeholder={`Field Name ${index + 1}`} id="" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, 'fieldValue']}
                      fieldKey={[field.fieldKey, 'fieldValue']}
                      rules={[{ required: true, message: 'Please input field value!' }]}
                    >
                      <Input placeholder={`Field Value ${index + 1}`} />
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
                    Add Field
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

export default SiteConfigDelivery;
