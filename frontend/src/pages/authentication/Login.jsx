/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { server } from "../../server";
function Login() {
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Received values:", values);
  };

  const [logindata, setLoginData] = useState({
    email: "",
    password: "",
  });
  console.log("logindata", logindata);

  const handleInputChange = (value, FieldName) => {
    setLoginData((prevData) => ({
      ...prevData,
      [FieldName]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `${server}/shop/login-shop`,
        {
          email: logindata?.email,
          password: logindata?.password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Login Success!");
        navigate("/admin");
        window.location.reload(true);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const handleForgetPassword = (e) => {
    e.preventDefault();
    if (!logindata.email) {
      toast.error("Email is required");
      return;
    }
    navigate(`/admin-forgot-password?email=${logindata.email}`);
  };
  return (
    <>
      <Navbar />
      <div className="login-container">
        <Row className="login-container-login">
          <div className="login-form-container">
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
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input
                  onChange={(e) => handleInputChange(e.target.value, "email")}
                  value={logindata.email}
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input
                  onChange={(e) =>
                    handleInputChange(e.target.value, "password")
                  }
                  value={logindata.password}
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  onClick={(e) => handleSubmit(e)}
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
                </Button>
              </Form.Item>
              <Link to={""} onClick={handleForgetPassword}>
                Forget Your Password?
              </Link>
            </Form>
          </div>
        </Row>
      </div>
      <Footer />
    </>
  );
}
export default Login;
