/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import SideBar from '../../../components/Sidebar';
import sidebar_menu from '../../../constants/sidebar-menu';
import DashboardHeader from '../../../components/DashboardHeader';
import CloudKitchenForm from './category/productVariation/CloudKitchenForm';
import CorporateMealForm from './category/productVariation/CorporateMealForm';
import useAPI from '../../../customHooks/API/useAPI';

const { Option } = Select;

function AddProduct() {
    const { getApi } = useAPI();

    useEffect(() => {
        let { data } = getApi({ endpoint: '/api/v2/category/get-all-categories' })
        console.log(data)
    }, [])
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionChange = (value) => {
        setSelectedOption(value);
    };

    const handleSubmit = (values) => {
        // Logic to add product goes here
        console.log('Selected option:', selectedOption);
        console.log('Product details:', values);
    };

    return (
        <div className='dashboard-container'>
            <SideBar menu={sidebar_menu} />
            <div className='dashboard-content'>
                <div className="dashboard-header">
                    <h3>Select Category To Add Product</h3>
                    <div className="add-btn">
                        <DashboardHeader />
                    </div>
                </div>
                <Select placeholder="Select an option" onChange={handleOptionChange} style={{ width: 200, marginBottom: '16px' }}>
                    <Option value="cloudKitchen">Cloud Kitchen</Option>
                    <Option value="corporateMeal">Corporate Meal</Option>
                </Select>
                {selectedOption === "cloudKitchen" && (
                    <CloudKitchenForm onFinish={handleSubmit} />
                )}
                {selectedOption === "corporateMeal" && (
                    <CorporateMealForm onFinish={handleSubmit} />
                )}
            </div>
        </div>
    );
}

export default AddProduct;
