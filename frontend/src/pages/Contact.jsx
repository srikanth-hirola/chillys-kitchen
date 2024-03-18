/* eslint-disable no-unused-vars */
import React from 'react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import ContactBanner from '../components/contact/ContactBanner'
import ContactForm from '../components/contact/ContactForm'

const Contact = () => {
  return (
    <>
      <Navbar/>
    <div className="contact-us">
      <div className="contact-us-sub">
        <div className="contact-us-text">
          <h3>Contact Us</h3>
          <p>Any question or remarks? Just write us a message!</p>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <ContactBanner/>
            </div>
            <div className="col-md-6">
              <ContactForm/>
            </div>
          </div>
        </div>
      </div>
    </div>
      <Footer/>
    </>
  )
}

export default Contact