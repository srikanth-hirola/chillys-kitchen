/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import { Select } from "antd";
import { Link } from "react-router-dom";
const { Option } = Select; 
const Details = () => {

const options = [
    { id: 1, title: 'Option 1', description: 'Description for Option 1', price: '$10' },
    { id: 2, title: 'Option 2', description: 'Description for Option 2', price: '$20' },
    { id: 3, title: 'Option 3', description: 'Description for Option 3', price: '$30' }
];
const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionChange = (value) => {
        const option = options.find(opt => opt.id === parseInt(value));
        setSelectedOption(option);
    };
  return (
    <>
      <div className="product-details-sec">
        <div className="product-details-main">
          <h3>CORPORATE MEAL BOX</h3>
          <ul>
            <li>
              SkU<span>KJHKJN654</span>
            </li>
            <li>
              Category<span>Meals</span>
            </li>
          </ul>
          <div className="rating">
            <StarFilled />
            <StarFilled />
            <StarFilled />
            <StarFilled />
            <StarOutlined />
          </div>
          <div className="price">
            <h4>300 <span>-30%</span></h4>
            <p>Healthy Vegetarian and Non Vegetarian thalis with everyday changing menu designed to give you wholesome nutrition and homemade taste delivered.</p>
          </div>
          <div className="select-variant" >
          <h4>Select an Option</h4>
            <Select  onChange={handleOptionChange} placeholder="Select an option">
                {options.map(option => (
                    <Option key={option.id} value={option.id}>{option.title}</Option>
                ))}
            </Select>
            {selectedOption && (
                <div className="variation-product" >
                    <div className="var-title"><h3>{selectedOption.title}</h3></div>
                    <div className="var-price"><p><strong>Price:</strong> {selectedOption.price}</p></div>
                    <div className="var-desc"><p><strong>Description:</strong> {selectedOption.description}</p></div>
                </div>
            )}
            
        </div>
        <div className="add-to-btn">
        <Link to=''>ADD TO CART</Link>
        </div>
        </div>
      </div>
    </>
  );
};

export default Details;
