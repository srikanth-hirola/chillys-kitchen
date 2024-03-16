/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import SideBar from '../../../components/Sidebar';
import sidebar_menu from '../../../constants/sidebar-menu';
import DashboardHeader from '../../../components/DashboardHeader';
import { Select } from 'antd';
import CloudKitchenForm from './category/productVariation/CloudKitchenForm';
import CorporateMealForm from './category/productVariation/CorporateMealForm';
import useAPI from '../../../customHooks/API/useAPI';
import { useParams } from 'react-router';
import EditCloudKitchen from './category/productVariation/EditCloudKitchen';
const { Option } = Select;

function EditProduct() {
    const { edit } = useParams();
    const { getApi } = useAPI();

    //useStates data
    const [categories, setCategories] = useState([]);
    const [productData, setProductData] = useState({});
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

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                let { data } = await getApi({ endpoint: `/api/v2/product/get-a-product-shop/${edit}` })
                setProductData(data.products[0])
                console.log(data.products[0])
                let category = fetchCategoryName({ id: data.products[0]?.category, categories })
                setSelectedOption(category)
            } catch (error) {
                console.log(error)
            }
        }
        if (edit) {
            fetchProduct()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [edit, categories])

    useEffect(() => {
        console.log(productData, "prod")
    }, [productData])


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
                    <h3>Edit Product</h3>
                    <div className="add-btn">
                        <DashboardHeader />
                    </div>
                </div>
                <Select placeholder="Select an option" onChange={handleOptionChange} style={{ width: 200, marginBottom: '16px' }} value={selectedOption}>
                    {categories?.map((category, index) => (
                        <Option value={category?._id} key={index}>{category?.category}</Option>
                    ))}
                </Select>
                {selectedOption === "Cloud Kitchen" && (
                    <EditCloudKitchen onFinish={handleSubmit} productData={productData} setProductData={setProductData} />
                )}
                {selectedOption === "Corporate Meal" && (
                    <CorporateMealForm onFinish={handleSubmit} productData={productData} setProductData={setProductData} />
                )}
            </div>
        </div>
    );
}

export default EditProduct;
