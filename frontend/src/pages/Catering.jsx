/* eslint-disable no-unused-vars */
import React from 'react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import CateringBanner from '../components/catering/CateringBanner'
import CateringServices from '../components/catering/CateringServices'
import CateringForm from '../components/catering/CateringForm'
import CateringStory from '../components/catering/CateringStory'
import CateringNews from '../components/catering/CateringNews'

const CateringMain = () => {
  return (
    <>
        <Navbar/>
            <div className="catering-main">
                <div className="catering-main-sub">
                    <CateringBanner/>
                    <CateringServices/>
                    <CateringForm/>
                    <CateringStory/>
                    <CateringNews/>
                </div>
            </div>
        <Footer/>
    </>
  )
}

export default CateringMain