/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'

const Services = ({serviceContent}) => {
  return (
    <>
    <div className="home-services">
        <div className="home-services-sub">
            <div className="container">
                {serviceContent && 
                <div className="home-services-title">
                <strong>{serviceContent?.title}</strong>
                    <h3>{serviceContent?.subTitle}</h3>
                </div>
                }
                <div className="home-services-cards">
                    <div className="row">
                        {serviceContent && serviceContent?.serviceCards?.map((servicecards, i) => (
                             <div className="col-md-4" key={i}>
                             <div className="home-services-sec-card">
                                 <div className="home-services-sec-card-img">
                                     <img src={servicecards?.image?.url} alt="" />
                                 </div>
                                 <div className="home-services-sec-card-text">
                                     <h3>{servicecards?.serviceTitle}</h3>
                                     <p>{servicecards?.description}</p>
                                 </div>
                             </div>
                         </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Services