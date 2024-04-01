/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import PropTypes from 'prop-types';
import ProductCard from '../Cards/ProductCard';
import { Select, Rate, Checkbox, Button } from 'antd';
import { StarFilled } from '@ant-design/icons';

const { Option } = Select;
const Products = ({ productData }) => {
    const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const products = ["Product 1", "Product 2", "Product 3", "Product 4", "Product 5"];
  const priceRanges = ["0 - 100", "100 - 200", "200 - 300", "300 - 400", "400 - 500"];
  const ratings = [1, 2, 3, 4, 5];
console.log("products",productData)
  const handleProductChange = (value) => {
    setSelectedProduct(value);
  };

  const handleRatingChange = (value) => {
    setSelectedRating(value);
  };

  const handlePriceRangeChange = (value) => {
    setSelectedPriceRange(value);
  };

  const handleSubmit = () => {
    // Here you can apply your filtering logic using the selected values
    console.log('Selected Product:', selectedProduct);
    console.log('Selected Rating:', selectedRating);
    console.log('Selected Price Range:', selectedPriceRange);
  };
    return (
        <>
      
            <div className="menu-product">
                <div className="menu-product-sub">
                    <div className="container">
                    <Button className='filter-btn' onClick={() => setIsFilterOpen(!isFilterOpen)}>
        {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
      </Button>
                 
    {isFilterOpen && (
        <div className='row'>
                    
                    <div className="col-md-3">
                    <Select
                        style={{ width: '100%' }}
                        placeholder="Select Product"
                        onChange={handleProductChange}
                      >
                        {productData && productData.length> 0 && productData.map((product, index) => (
                          <Option key={index} value={product.name}>{product.name}</Option>
                        ))}
                      </Select>
                    </div>
                    <div className="col-md-3">
                    <Select
                        style={{ width: '100%' }}
                        placeholder="Select Product"
                        onChange={handleProductChange}
                      >
                       {productData && productData.length> 0 && productData.map((product, index) => (
                          <Option key={index} value={product.name}>{product.name}</Option>
                        ))}
                      </Select>
                    </div>
                
                   <div className="col-md-3">
                   <Select
                        style={{ width: '100%' }}
                        placeholder="Select Rating"
                        onChange={handleRatingChange}
                      >
                        {ratings.map((rating) => (
                          <Option key={rating} value={rating}>
                            {Array.from({ length: rating }, (_, index) => (
                              <StarFilled key={index} style={{ color: '#FFD700' }} />
                            ))}
                            {Array.from({ length: 5 - rating }, (_, index) => (
                              <StarFilled key={index + rating} style={{ color: '#C0C0C0' }} />
                            ))}
                            ({rating})
                          </Option>
                        ))}
                      </Select>
                   </div>
                
                      <div className="col-md-3">
                      <Select
                        style={{ width: '100%' }}
                        placeholder="Select Price Range"
                        onChange={handlePriceRangeChange}
                      >
                        {priceRanges.map((priceRange, index) => (
                          <Option key={index} value={priceRange}>{priceRange}</Option>
                        ))}
                      </Select>
                      </div>
                
                      <br /><br />
                      {/* <Button type="primary" onClick={handleSubmit}>Apply Filters</Button> */}
                    </div>
      )}
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