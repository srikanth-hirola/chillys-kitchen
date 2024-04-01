/* eslint-disable react/no-unknown-property */
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
        <div className="container-lg container-xl container-xxl">
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
      <div className="mt-5">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25156.33223148648!2d77.56945863918072!3d13.064003144943541!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae197009f9aca5%3A0x61c4ce79552a0dbd!2sChilly%20Kitchen!5e0!3m2!1sen!2sin!4v1711782133966!5m2!1sen!2sin" width="100%" height="480" style={{border:'none'}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

      </div>
          </div>
      <Footer/>
    </>
  )
}

export default Contact