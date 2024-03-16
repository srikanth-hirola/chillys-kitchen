/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import ProductBanner from '../../components/products/ProductBanner';
import Details from '../../components/products/Details';
import Producttabs from '../../components/products/ProductTabs';

const ProductDetails = () => {
    
 
  return (
    <>
    <Navbar/>
    <div className="product-details-section">
    <div className="product-details" >
        <div className="container-fluid">
          <div className="row align-items-center justify-content-between main-product-row" >
            <div className="col-md-6">
              <ProductBanner/>
            </div>
            <div className="col-md-6">
              <Details/>
            </div>

          </div>
        </div>
    </div>
    <Producttabs/>
    </div>
    <Footer/>
    </>
  )
}

export default ProductDetails