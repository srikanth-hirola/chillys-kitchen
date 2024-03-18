/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types';
import ProductCard from '../Cards/ProductCard';

const Products = ({ productData }) => {


    return (
        <>
            <div className="menu-product">
                <div className="menu-product-sub">
                    <div className="container">
                        <div className="row">
                            {productData?.map((product, i) => (
                                <ProductCard product={product} key={i} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

Products.propTypes = {
    productData: PropTypes.array.isRequired
}

export default Products