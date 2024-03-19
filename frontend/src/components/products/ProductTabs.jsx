/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Tabs } from 'antd';
import ProductDescriptionTab from './ProductDescriptionTab';
import AddtionalInfoTab from './AddtionalInfotab';
import ReviewsTab from './ReviewsTab';
import PropTypes from 'prop-types';


const { TabPane } = Tabs;

function Producttabs({ productData }) {

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
                            <ProductDescriptionTab description={productData?.description} />
                        </TabPane>
                        <TabPane tab="Additional Info" key="additionalInfo">
                            <AddtionalInfoTab productData={productData} />
                        </TabPane>
                        <TabPane tab="Reviews" key="reviews">
                            <ReviewsTab reviews={productData?.reviews} />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

Producttabs.propTypes = {
    productData: PropTypes.object.isRequired,
}

export default Producttabs;
