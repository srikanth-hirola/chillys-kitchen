/* eslint-disable no-unused-vars */
import React from 'react'
import { Form, Input, Select, DatePicker } from 'antd';

const { Option } = Select;
const CateringForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values:', values);
  };
  return (
    <>
  <div className="catering-form">
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
              <Input />
            </Form.Item>
          </div>
          <div className="col-md-4">
            <Form.Item name="email" label="Email">
              <Input type="email" />
            </Form.Item>
          </div>
          <div className="col-md-4">
            <Form.Item name="mobile" label="Mobile Number">
              <Input type="tel" />
            </Form.Item>
          </div>
          <div className="col-md-4">
            <Form.Item name="eventType" label="Event Type">
              <Select>
                <Option value="Wedding">Wedding</Option>
                <Option value="Birthday">Birthday</Option>
                <Option value="Corporate">Corporate</Option>
              </Select>
            </Form.Item>
          </div>
          <div className="col-md-4">
            <Form.Item name="numberOfPeople" label="Number of People">
              <Input type="number" />
            </Form.Item>
          </div>
          <div className="col-md-4">
            <Form.Item name="foodType" label="Food Type">
              <Select>
                <Option value="Vegetarian">Vegetarian</Option>
                <Option value="Non-Vegetarian">Non-Vegetarian</Option>
              </Select>
            </Form.Item>
          </div>
          <div className="col-md-4">
            <Form.Item name="dateOfEvent" label="Date of Event">
              <DatePicker width={'100%'} />
            </Form.Item>
          </div>
          <div className="col-md-4">
            <Form.Item name="location" label="Location">
              <Input />
            </Form.Item>
          </div>
          <div className="col-md-4">
            <Form.Item name="pincode" label="Pincode">
              <Input />
            </Form.Item>
          </div>
        </div>
        </div>
        <Form.Item>
          <button className="btn btn-primary" type="submit">
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