/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Form, Input, Select, DatePicker } from 'antd';
import axios from 'axios';
import { server } from '../../server';
import toast from 'react-hot-toast';

const { Option } = Select;
const CateringForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values:', values);
  };
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    category: "",
    noOfPeople: "",
    type: "",
    date: new Date(),
    location: "",
    pincode: "",
    message: "",
  })

  const handleChange = (value, FieldName) => {
    setFormData({
      ...formData,
      [FieldName]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${server}/form/cateringform`, formData)
      if(response.status === 201) {
        toast.success("Form Submitted Successfully")
        setFormData({
          name: "",
          email: "",
          phoneNumber: "",
          category: "",
          noOfPeople: "",
          type: "",
          date: new Date(),
          location: "",
          pincode: "",
          message: "",
        })
      }
    } catch (error) {
      console.log(error);
      toast.error("Error Submitting form");
    }
  }
  return (
    <>
  <div className="catering-form" id='cateringForm' >
    <div className="catering-form-sub" style={{backgroundImage:`url(/images/home/form-banner.webp)`}}>
      <div className="container">
       
        <div className="catering-form-sec">
        <div className="catering-form-title">
          <h4>Book us</h4>
          <h5>Where you want Our Services</h5>
        </div>
        <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          eventType: 'Wedding', // Initial values for event type select
          foodType: 'Vegetarian', // Initial values for food type select
        }}
      >
      <div className="banner-sec-form">
      <div className="form-img-one">
        <img src="/images/home/form-scribe.webp" alt="" />
      </div>
      <div className="form-img-two">
        <img src="/images/home/form-scribe.webp" alt="" />
      </div>
        <div className="row">
          <div className="col-md-4">
            <Form.Item name="name" label="Name">
              <Input value={formData?.name} onChange={(e) => handleChange(e.target.value, "name")} />
            </Form.Item>
          </div>
          <div className="col-md-4">
            <Form.Item name="email" label="Email">
              <Input type="email" value={formData?.email} onChange={(e) => handleChange(e.target.value,"email")} />
            </Form.Item>
          </div>
          <div className="col-md-4">
            <Form.Item name="mobile" label="Mobile Number">
              <Input type="tel" value={formData?.phoneNumber} onChange={(e) => handleChange(e.target.value,"phoneNumber")}  />
            </Form.Item>
          </div>
          <div className="col-md-4">
            <Form.Item name="eventType" label="Event Type" value={formData?.category} onChange={(e) => handleChange(e.target.value, "category")} required>
              <Select>
                <Option value="Wedding">Wedding</Option>
                <Option value="Birthday">Birthday</Option>
                <Option value="Corporate">Corporate</Option>
              </Select>
            </Form.Item>
          </div>
          <div className="col-md-4">
            <Form.Item name="numberOfPeople" label="Number of People">
              <Input type="number" value={formData?.noOfPeople} onChange={(e) => handleChange(e.target.value, "noOfPeople")} />
            </Form.Item>
          </div>
          <div className="col-md-4">
            <Form.Item name="foodType" label="Food Type" value={formData?.type} onChange={(e) => handleChange(e.target.value, "type" )} required>
              <Select>
                <Option value="Vegetarian">Vegetarian</Option>
                <Option value="Non-Vegetarian">Non-Vegetarian</Option>
              </Select>
            </Form.Item>
          </div>
          <div className="col-md-4">
            <Form.Item name="dateOfEvent" label="Date of Event">
              <DatePicker width={'100%'} value={formData?.date} onChange={(e) => handleChange(e.target.value, "date")}/>
            </Form.Item>
          </div>
          <div className="col-md-4">
            <Form.Item name="location" label="Location">
              <Input value={formData?.location} onChange={(e) => handleChange(e.target.value, "location")} />
            </Form.Item>
          </div>
          <div className="col-md-4">
            <Form.Item name="pincode" label="Pincode">
              <Input value={formData?.pincode} onChange={(e) => handleChange(e.target.value, "pincode")}/>
            </Form.Item>
          </div>
        </div>
        </div>
        <Form.Item>
          <button className="btn btn-primary" type="submit" onClick={(e) => handleSubmit(e)}>
            Submit
          </button>
        </Form.Item>
      </Form>
        </div>
      </div>
    </div>
  </div>
    </>
  )
}

export default CateringForm