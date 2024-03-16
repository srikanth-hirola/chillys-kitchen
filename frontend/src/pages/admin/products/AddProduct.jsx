/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import SideBar from '../../../components/Sidebar';
import sidebar_menu from '../../../constants/sidebar-menu';
import DashboardHeader from '../../../components/DashboardHeader';
import CloudKitchenForm from './category/productVariation/CloudKitchenForm';
import CorporateMealForm from './category/productVariation/CorporateMealForm';
import useAPI from '../../../customHooks/API/useAPI';
import ProductModal from '../../../utils/useStateModals/ProductModal';

const { Option } = Select;

function AddProduct() {
    const { getApi } = useAPI();

    //useStates data
    const [categories, setCategories] = useState([]);
    const [productData, setProductData] = useState(ProductModal);
    //useStates data

    const [selectedOption, setSelectedOption] = useState(null);


    useEffect(() => {
        const fetchCategory = async () => {
            try {
                let { data } = await getApi({ endpoint: '/api/v2/category/get-all-categories' })
                setCategories(data.categories)
            } catch (error) {
                console.log(error)
            }
        }
        fetchCategory()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleOptionChange = (value) => {
        let categoryName = fetchCategoryName({ id: value, categories })
        setSelectedOption(categoryName);
        setProductData({ ...productData, category: value })
    };

    const handleSubmit = (values) => {
        console.log('Selected option:', selectedOption);
        console.log('Product details:', values);
    };

    const fetchCategoryName = ({ id, categories }) => {
        let found = categories?.length > 0 && categories.find((item) => item._id === id);
        if (found) {
            return found?.category
        }
    }

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
                    {categories?.map((category, index) => (
                        <Option value={category?._id} key={index}>{category?.category}</Option>
                    ))}
                </Select>
                {selectedOption === "Cloud Kitchen" && (
                    <CloudKitchenForm onFinish={handleSubmit} productData={productData} setProductData={setProductData} />
                )}
                {selectedOption === "Corporate Meal" && (
                    <CorporateMealForm onFinish={handleSubmit} productData={productData} setProductData={setProductData} />
                )}
            </div>
        </div>
    );
}

export default AddProduct;
