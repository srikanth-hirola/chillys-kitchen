/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Tabs } from 'antd';
import ProductDescriptionTab from './ProductDescriptionTab';
import AddtionalInfoTab from './AddtionalInfotab';
import ReviewsTab from './ReviewsTab';


const { TabPane } = Tabs;

function Producttabs() {
    const [activeTab, setActiveTab] = useState('description');

    const handleTabChange = (key) => {
        setActiveTab(key);
    };

    return (
        <div className="product-tabs">
            <div className="product-tabs-sec">
                <div className="container">
                <Tabs activeKey={activeTab} onChange={handleTabChange}>
            <TabPane tab="Description" key="description">
                <ProductDescriptionTab/>
            </TabPane>
            <TabPane tab="Additional Info" key="additionalInfo">
            <AddtionalInfoTab/>
            </TabPane>
            <TabPane tab="Reviews" key="reviews">
                <ReviewsTab/>
            </TabPane>
        </Tabs>
                </div>
            </div>
        </div>
    );
}

export default Producttabs;
