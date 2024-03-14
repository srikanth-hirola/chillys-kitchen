/* eslint-disable no-unused-vars */
// ForgotPassword.js
import React from 'react';
import { Form, Input, Button } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

function ForgotPassword() {
    const handleFinish = (values) => {
    };

    return (
      <>
        <Navbar/>
    <div className="forgot-password">
    <Form
            name="forgotPasswordForm"
            onFinish={handleFinish}
            layout="vertical"
        >
            <Form.Item
                name="Enter Otp"
                rules={[{ required: true, message: 'Please input your Otp!' }]}
            >
                <Input.Password prefix={<LockOutlined />} placeholder="Enter Otp" />
            </Form.Item>
            <Form.Item
                name="newPassword"
                rules={[{ required: true, message: 'Please input your new password!' }]}
            >
                <Input.Password prefix={<LockOutlined />} placeholder="New Password" />
            </Form.Item>
            <Form.Item
                name="confirmPassword"
                dependencies={['newPassword']}
                rules={[
                    { required: true, message: 'Please confirm your password!' },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('newPassword') === value) {
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
                <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
        </Form>
    </div>
        <Footer/>
      </>
    );
}

export default ForgotPassword;
