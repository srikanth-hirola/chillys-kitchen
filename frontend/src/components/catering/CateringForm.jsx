/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import { server } from '../../server';
import toast from 'react-hot-toast';

const CateringForm = () => {

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
    <div>
      <Form>
          <Form.Group>
          <Form.Label>Name</Form.Label>
            <Form.Control value={formData?.name} onChange={(e) => handleChange(e.target.value, "name")} />
          </Form.Group>
          <Form.Group>
          <Form.Label>Email ID</Form.Label>
            <Form.Control value={formData?.email} onChange={(e) => handleChange(e.target.value,"email")} />
          </Form.Group>
          <Form.Group>
          <Form.Label>Phone Number</Form.Label>
            <Form.Control value={formData?.phoneNumber} onChange={(e) => handleChange(e.target.value,"phoneNumber")} />
          </Form.Group>
          <Form.Group>
          <Form.Label>Select Category</Form.Label>
          <Form.Select placeholder="Choose Your Category" className="form-control" value={formData?.category} onChange={(e) => handleChange(e.target.value, "category")} required >
            <option disabled selected value="">Choose Your Service</option>
            <option value="Wedding">Wedding</option>
            <option value="Corporate">Corporate</option>
            <option value="Events">Events</option>
            <option value="Birthdays">Birthdays</option>
          </Form.Select>
          </Form.Group>
          <Form.Group>
          <Form.Label>No Of Peoples</Form.Label>
            <Form.Control value={formData?.noOfPeople} onChange={(e) => handleChange(e.target.value, "noOfPeople")} />
          </Form.Group>
          <Form.Group>
          <Form.Label>Type</Form.Label>
          <Form.Select placeholder="Choose Your Type" className="form-control" value={formData?.type} onChange={(e) => handleChange(e.target.value, "type" )} required >
            <option disabled selected value="">Choose Your Type</option>
            <option value="Vegeterian">Vegeterian</option>
            <option value="Non-Vegeterian">Non-Vegeterian</option>
          </Form.Select>
          </Form.Group>
          <Form.Group>
          <Form.Label>Date</Form.Label>
            <Form.Control type='date' value={formData?.date} onChange={(e) => handleChange(e.target.value, "date")} />
          </Form.Group>
          <Form.Group>
          <Form.Label>Location</Form.Label>
            <Form.Control value={formData?.location} onChange={(e) => handleChange(e.target.value, "location")} />
          </Form.Group>
          <Form.Group>
          <Form.Label>Pincode</Form.Label>
            <Form.Control value={formData?.pincode} onChange={(e) => handleChange(e.target.value, "pincode")} />
          </Form.Group>
          <Form.Group>
          <Form.Label>Message</Form.Label>
            <Form.Control as="textarea" rows={5} value={formData?.message} onChange={(e) => handleChange(e.target.value, "message")} />
          </Form.Group>
        </Form>
        <button type='submit' className='btn btn-md btn-primary' onClick={(e) => handleSubmit(e)}>Submit</button>
    </div>
  )
}

export default CateringForm