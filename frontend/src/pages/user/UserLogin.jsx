/* eslint-disable no-unused-vars */
// UserLogin.js
import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { useNavigate } from 'react-router';
import { server } from '../../server';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

function UserLogin() {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios
            .post(
                `${server}/user/login-user`,
                {
                    email,
                    password,
                },
                { withCredentials: true }
            )
            .then((res) => {
                toast.success("Login Success!");
                // if (res?.data?.user?.role === "Admin") {
                //     navigate("/admin/dashboard");
                // } else {
                navigate("/");
                // }
                window.location.reload(true);
            })
            .catch((err) => {
                toast.error(err.response.data.message);
            });
    };

    const handleForgetPassword = (e) => {
        e.preventDefault();
        if (!email) {
            toast.error("Email is required");
            return
        }
        navigate(`/forgot-password?email=${email}`)
    }
  

    return (
   <>
     <Navbar/>
       <div className="user-login">
       <Form
            name="loginForm"
           
            layout="vertical"
        >
            <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your user email!' }]}
            >
                <Input value={email} onChange={(e) => setEmail(e.target.value)} prefix={<UserOutlined />} placeholder="User Email" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>
            <Form.Item>
                <Button onClick={handleSubmit} type="primary" htmlType="submit">Login</Button>
            </Form.Item>
            {/* <p onClick={handleForgetPassword} className='cursor-text'>Forget Your Password?</p> */}
            <Link to={''} onClick={handleForgetPassword}>Forget Your Password?</Link>
        </Form>
       </div>
        <Footer/>
   </>
    );
}

export default UserLogin;
