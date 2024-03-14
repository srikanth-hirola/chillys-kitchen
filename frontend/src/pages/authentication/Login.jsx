/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import axios from "axios";
import { useNavigate } from 'react-router';

function Login() {
    const navigate = useNavigate();
    const onFinish = (values) => {
        console.log('Received values:', values);
        // Implement your login logic here
    };

    const [logindata, setLoginData] = useState({
        email: "",
        password: "",
    });

    console.log("logindata", logindata)

    const handleInputChange = (value, FieldName) => {
        setLoginData((prevData) => ({
            ...prevData,
            [FieldName]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8000/api/v2/shop/login-shop", logindata);
            console.log("response", response)
            if(response.status === 201) {
                navigate("/admin");
            }
        } catch (error) {
            console.log("login error",error)
            alert(error.response.data.message)
        }
    }

    return (
       <>
         <Navbar/>
        <div className="login-container">
            <Row className='login-container-login'>
               
                <div  className="login-form-container">
                    {/* Login details on the other side */}
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <h2>Login to Dashboard</h2>
                        <Form.Item
                            name="email" 
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input onChange={(e) => handleInputChange(e.target.value, "email")} value={logindata.email} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input
                                onChange={(e) => handleInputChange(e.target.value, "password")}
                                value={logindata.password}
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button onClick={(e) => handleSubmit(e)} type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Row>
        </div>
        <Footer/>
       </>
    );
}

export default Login;
