/* eslint-disable no-unused-vars */
// AdminForgotPassword.js
import React, { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import { LockOutlined } from "@ant-design/icons";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import OtpInput from 'react-otp-input';
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import OTPInput from "react-otp-input";
import { server } from "../../server";

function AdminForgotPassword() {
  const handleFinish = (values) => {};

  const [searchParams] = useSearchParams();
  const [otp, setOtp] = useState(null);
  const [timer, setTimer] = useState(120);
  const [resendBtn, setResendBtn] = useState(false);

  const [email, setEmail] = useState("");

  const [otpScreen, setOtpScreen] = useState(true);

  const [enterOtpScreen, setEnterOtpScreen] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [visible, setVisible] = useState(false);
  const visible = false;

  const navigate = useNavigate();

  const timeCountDown = () => {
    var timeleft = 120;
    var downloadTimer = setInterval(function () {
      timeleft--;
      setTimer(timeleft);
      if (timeleft <= 0) {
        clearInterval(downloadTimer);
        handleDeleteOTP();
      }
    }, 1000);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const params = {};
    for (const [key, value] of urlParams.entries()) {
      params[key] = value;
    }
    setEmail(params?.email);

    // const url = `${server}/user/forget-password?${new URLSearchParams(params)}`;
    // const searchApiCall = async () => {
    //     try {
    //         const { data } = await axios.get(url);
    //         setIsLoading(false)
    //         setData(data.products)
    //     } catch (error) {
    //         toast.error(error.response.data.message)
    //     }
    // }

    // console.log(url)

    // searchApiCall()
  }, [searchParams]);

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${server}/shop/admin-forget-password`, { email });
      setEnterOtpScreen(true);
      timeCountDown();
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  const handleOTP = async (e) => {
    e.preventDefault();
    const otpVer = otpValidation(otp);
    if (otpVer) {
      try {
        await axios.post(`${server}/shop/admin-otpVer`, {
          email,
          otp,
        });
        setOtpScreen(false);
        setEnterOtpScreen(false);
        setResendBtn(false);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  const otpValidation = (num) => {
    if (num.length < 4) {
      toast.error("OTP should be 4 digit");
      return false;
    } else {
      return true;
    }
  };

  const handleDeleteOTP = async () => {
    try {
      await axios.post(`${server}/shop/admin-resetOTP`, {
        email,
      });
      setResendBtn(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password is not matching");
    }
    try {
      await axios.post(`${server}/shop/changeAdminPassword`, {
        email,
        password,
      });
      toast.success("password Changes Successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="forgot-password">
        <div className="text-center">
          <p className="text-center">Send OTP to mail address?</p>
          <p className="text-center">{email && email}</p>
          {!enterOtpScreen && (
            <button
              type="submit"
              onClick={handelSubmit}
              className="btn btn-primary text-center"
            >
              send
            </button>
          )}
          {resendBtn && (
            <button
              type="submit"
              onClick={handelSubmit}
              className="btn btn-primary text-center"
            >
              Resend
            </button>
          )}
        </div>
        {enterOtpScreen && (
          <>
            <div className="flex row justify-content-center mt-3">
              <p className="otpExpire mb-0 text-center">OTP expires in : {timer}</p>
            </div>
            <div className="forgetOtp my-4">
              <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props} />}
              />
            </div>

            <div className="flex row justify-content-center mt-4">
              <button
                className="btn btn-primary text-center"
                onClick={handleOTP}
              >
                Submit
              </button>
            </div>
          </>
        )}
        {!otpScreen &&
        <Form
          name="forgotPasswordForm"
          onFinish={handleFinish}
          layout="vertical"
        >
          {/* <Form.Item
            name="Enter Otp"
            rules={[{ required: true, message: "Please input your Otp!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Enter Otp" />
          </Form.Item> */}
          <Form.Item
            name="newPassword"
            rules={[
              { required: true, message: "Please input your new password!" },
            ]}
          >
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              prefix={<LockOutlined />}
              placeholder="New Password"
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              prefix={<LockOutlined />}
              placeholder="Confirm Password"
            />
          </Form.Item>
          <Form.Item>
            <Button onClick={handleChangePassword} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
       }
      </div>
      <Footer />
    </>
  );
}

export default AdminForgotPassword;
