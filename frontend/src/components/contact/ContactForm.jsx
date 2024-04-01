/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Form, Input, Checkbox, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import { server } from '../../server';
import toast from 'react-hot-toast';

const { Item } = Form;

const ContactForm = () => {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileno: "",
    catType: [],
    message: "",
  });
  console.log("formData", formData)
  
  const handleInputChange = (fieldName, value) => {
    if (fieldName === 'catType') {
      // Toggle the value in the catType array
      const updatedCatType = formData.catType.includes(value)
        ? formData.catType.filter(cat => cat !== value)
        : [...formData.catType, value];

      setFormData({
        ...formData,
        [fieldName]: updatedCatType,
      });
    } else {
      setFormData({
        ...formData,
        [fieldName]: value,
      });
    }
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${server}/form/contact`, {formData})
      if(response.status === 201){
        toast.success("Form Submitted Successfully");
      } else {
        toast.error("error submitting form")
      }
    } catch (error) {
      console.log(error);
    }
  }


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
                <Input onChange={(e) => handleInputChange("firstName", e.target.value)} value={formData.firstName} prefix={<UserOutlined />} />
              </Item>
           </div>
           <div className="col-md-6 my-2">
           <Item
                label="Last Name"
                name="lastname"
                rules={[{ required: true, message: 'Please enter your Last Name' }]}
              >
                <Input onChange={(e) => handleInputChange("lastName", e.target.value)} value={formData.lastName} prefix={<UserOutlined />} />
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
                <Input onChange={(e) => handleInputChange("email", e.target.value)} value={formData.email} />
              </Item>
              </div>
              <div className="col-md-6 my-2">
           <Item
                label="Mobile"
                name="mobile"
                rules={[{ required: true, message: 'Please enter your mobile' }]}
              >
                <Input onChange={(e) => handleInputChange("mobileno", e.target.value)} value={formData.mobileno} prefix={<UserOutlined />} />
              </Item>
           </div>
          
            </div>
           <div className="col-md-12">
           <Item
              label="Select Catering Type"
              name="options"
            >
              <Checkbox.Group style={{ width: '100%' }}>
                <Checkbox onChange={(e) => handleInputChange("catType", e.target.value)} value="birthday">Birthday</Checkbox>
                <Checkbox onChange={(e) => handleInputChange("catType", e.target.value)} value="corporate">Corporate</Checkbox>
                <Checkbox onChange={(e) => handleInputChange("catType", e.target.value)} value="wedding">Wedding</Checkbox>
                <Checkbox onChange={(e) => handleInputChange("catType", e.target.value)} value="events">Events</Checkbox>
              </Checkbox.Group>
            </Item>
           </div>
           <div className="col-md-12">
           <Item
              label="Message"
              name="message"
              rules={[{ required: true, message: 'Please enter your message' }]}
            >
              <Input.TextArea rows={4} onChange={(e) => handleInputChange("message", e.target.value)} value={formData.message}/>
            </Item>
           </div>
           <div className="col-md-6">
         <div className="contact-button">
         <Button onClick={(e) => handleSubmit(e)} type="primary" block>Submit</Button>
         </div>
           </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
