/* eslint-disable no-unused-vars */
// UserRegister.js
import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined, PhoneOutlined } from '@ant-design/icons';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import axios from 'axios';
import { server } from '../../../../../frontend/src/server';

function UserRegister() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    // eslint-disable-next-line no-unused-vars

    console.log("email", email)

    const handleFinish = (values) => {
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        axios
            .post(`${server}/api/v2/user/create-user`, { name, email, password, phonenumber, confirmpassword })
            .then((res) => {
                console.log(res.data)
                toast.success(res.data.message,{position:'top-right'});
                // alert(res.data.message)
                setName("");
                setEmail("");
                setPhonenumber("");
                setPassword("");
                setConfirmPassword("");
            })
            .catch((error) => {
                toast.error(error.response.data.message,{position:'top-right'});
                // alert(error.response.data.message)
            })
            .finally(() => {
                // setLoading(false)
            })
    };

    return (
      <>
        <Navbar/>
      <div className="user-register">
      <Form
            name="registerForm"
            onFinish={handleFinish}
            layout="vertical"
        >
            <Form.Item
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}
            >
                <Input value={name} onChange={(e) => setName(e.target.value)} prefix={<UserOutlined />} placeholder="Name" />
            </Form.Item>
            <Form.Item
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
            >
                <Input value={email} onChange={(e) => setEmail(e.target.value)} prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
                name="mobile"
                rules={[{ required: true, message: 'Please input your mobile number!' }]}
            >
                <Input value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} prefix={<PhoneOutlined />} placeholder="Mobile Number" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password prefix={<LockOutlined />} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
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
                <Input.Password onChange={(e) => setConfirmPassword(e.target.value)} value={confirmpassword} prefix={<LockOutlined />} placeholder="Confirm Password" />
            </Form.Item>
            <Form.Item>
                <Button onClick={handleSubmit} type="primary" htmlType="submit">Register</Button>
            </Form.Item>
        </Form>
      </div>
        <Footer/>
      </>
    );
}

export default UserRegister;
