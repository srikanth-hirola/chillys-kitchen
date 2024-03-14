/* eslint-disable no-unused-vars */
// UserRegister.js
import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined, PhoneOutlined } from '@ant-design/icons';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

function UserRegister() {
    const handleFinish = (values) => {
    };

    return (
      <>
        <Navbar/>
        <Form
            name="registerForm"
            onFinish={handleFinish}
            layout="vertical"
        >
            <Form.Item
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}
            >
                <Input prefix={<UserOutlined />} placeholder="Name" />
            </Form.Item>
            <Form.Item
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
            >
                <Input prefix={<UserOutlined />} type="email" placeholder="Email" />
            </Form.Item>
            <Form.Item
                name="mobile"
                rules={[{ required: true, message: 'Please input your mobile number!' }]}
            >
                <Input prefix={<PhoneOutlined />} placeholder="Mobile Number" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>
            <Form.Item
                name="confirmPassword"
                dependencies={['password']}
                rules={[
                    { required: true, message: 'Please confirm your password!' },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The two passwords do not match!'));
                        },
                    }),
                ]}
            >
                <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">Register</Button>
            </Form.Item>
        </Form>
        <Footer/>
      </>
    );
}

export default UserRegister;
