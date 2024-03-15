/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {StarFilled , StarOutlined} from '@ant-design/icons'
import { Select } from "antd";
const { Option } = Select;
const ReviewsTab = () => {
    const [onChange , setOnchange] =useState()
    const handleSortChange = (value) => {
        onChange(value);
    };
  return (
    <>
      <div className="product-review-sec">
       <div className="product-review-sec-sub">
        <h4 className="title">Customer Reviews</h4>
        <div className="cus-rating">
        <StarFilled />
            <StarFilled />
            <StarFilled />
            <StarFilled />
            <StarOutlined />
        </div>
        <div className="review-count-filter">
            <h4>11 Reviews</h4>
            <div className="sort-select">
            <Select width={200} defaultValue="latest" onChange={handleSortChange}>
            <Option value="latest">Latest</Option>
            <Option value="oldest">Oldest</Option>
            <Option value="highestRated">Highest Rated</Option>
            <Option value="lowestRated">Lowest Rated</Option>
            <Option value="mostHelpful">Most Helpful</Option>
            <Option value="leastHelpful">Least Helpful</Option>
        </Select>

            </div>
        </div>
        <div className="main-review">
            <div className="rev-img">
                <img src="/images/home/test-1.webp" alt="" />
            </div>
            <div className="rev-text">
                <h3>Sofia Harvetz</h3>
                <div className="real-rating">
        <StarFilled />
            <StarFilled />
            <StarFilled />
            <StarFilled />
            <StarOutlined />
        </div>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores adipisci saepe repudiandae nihil incidunt. Consectetur, aliquid? Et asperiores placeat magni. Temporibus quia voluptatibus libero debitis, vitae officiis possimus dolores reiciendis.</p>
        <strong>20 min ago</strong>
            </div>
        </div>
       </div>
      </div>
    </>
  );
};

export default ReviewsTab;
