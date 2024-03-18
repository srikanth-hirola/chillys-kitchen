/* eslint-disable no-unused-vars */
import React from 'react';
import { Form, Input, Checkbox, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Item } = Form;

const ContactForm = () => {
  return (
    <>
      <div className="contact-form">
        <div className="contact-form-sub">
          <h3>Contact Form</h3>
          <Form layout="vertical">
            <div className="row">
           <div className="col-md-6 my-2">
           <Item
                label="First Name"
                name="firstname"
                rules={[{ required: true, message: 'Please enter your First Name' }]}
              >
                <Input prefix={<UserOutlined />} />
              </Item>
           </div>
           <div className="col-md-6 my-2">
           <Item
                label="Last Name"
                name="lastname"
                rules={[{ required: true, message: 'Please enter your Last Name' }]}
              >
                <Input prefix={<UserOutlined />} />
              </Item>
           </div>
              <div className="col-md-6 my-2">
              <Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Please enter a valid email address' },
                ]}
              >
                <Input />
              </Item>
              </div>
              <div className="col-md-6 my-2">
           <Item
                label="Mobile"
                name="mobile"
                rules={[{ required: true, message: 'Please enter your mobile' }]}
              >
                <Input prefix={<UserOutlined />} />
              </Item>
           </div>
          
            </div>
           <div className="col-md-12">
           <Item
              label="Select Catering Type"
              name="options"
            >
              <Checkbox.Group style={{ width: '100%' }}>
                <Checkbox value="birthday">Birthday</Checkbox>
                <Checkbox value="corporate">Corporate</Checkbox>
                <Checkbox value="wedding">Wedding</Checkbox>
                <Checkbox value="events">Events</Checkbox>
              </Checkbox.Group>
            </Item>
           </div>
           <div className="col-md-12">
           <Item
              label="Message"
              name="message"
              rules={[{ required: true, message: 'Please enter your message' }]}
            >
              <Input.TextArea rows={4} />
            </Item>
           </div>
           <div className="col-md-6">
         <div className="contact-button">
         <Button type="primary" block>Final Checkout</Button>
         </div>
           </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
