/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Table, Tag, Button, Modal, Form, Input, message, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import SideBar from '../../../../components/Sidebar';
import sidebar_menu from '../../../../constants/sidebar-menu';
import DashboardHeader from '../../../../components/DashboardHeader';
import useAPI from '../../../../customHooks/API/useAPI';
import confirm from 'antd/es/modal/confirm';
import toast from 'react-hot-toast';

const { Option } = Select;
function Category() {

    const [categories, setCategories] = useState([]);
    const { getApi, postApi, putApi, deleteApi } = useAPI();
    const [selectedOption, setSelectedOption] = useState(null);
    const [subCategoryData, setSubCategory] = useState({
        subCategory: '',
        category: '',
        subCatImg: ''
    })
    const [subCategories, setSubCategories] = useState([]);
    console.log("subCategories", subCategories)
    const [editActive, setEditActive] = useState(false);

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
        const fetchSubCategory = async () => {
            try {
                let { data } = await getApi({ endpoint: '/api/v2/category/get-all-sub-categories' })
                setSubCategories(data.categories)
            } catch (error) {
                console.log(error)
            }
        }
        fetchSubCategory()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const [dataSource, setDataSource] = useState([
        {
            key: '1',
            name: 'John Doe',
            age: 32,
            address: 'New York',
            tags: ['developer', 'react'],
        },
        {
            key: '2',
            name: 'Jane Smith',
            age: 28,
            address: 'Los Angeles',
            tags: ['designer', 'ui/ux'],
        },
    ]);

    const [modalVisible, setModalVisible] = useState(false);
    const [editRecord, setEditRecord] = useState(null);
    const [form] = Form.useForm();

    const showEditModal = (record) => {
        setEditRecord(record);
        setSubCategory({ ...record, subCatImg: record?.subCatImg?.url ? record?.subCatImg : '' })
        setSelectedOption(record?.category)
        setEditActive(true)
        form.setFieldsValue({
            subCategory: record.subCategory
        });
        setModalVisible(true);
    };

    const handleEditOk = () => {
        form.validateFields()
            .then(values => {
                // Logic to update category goes here
                toast.success('Category updated successfully',{ position: 'top-right' });
                setModalVisible(false);
            })
            .catch(error => {
                console.error('Validation failed:', error);
            });
    };

    const handleEditCancel = () => {
        setModalVisible(false);
    };

    const handleDeleteSubCategory = async (id) => {
        const { data, error } = await deleteApi({ endpoint: `/api/v2/category/delete-sub-category/${id}` });
        if (error) {
            toast.info(error?.response?.data?.message,{ position: 'top-right' })
            toast.error('Deleted Sub Category and related products successfully',{ position: 'top-right' });
        }
        if (data) {
            toast.success('Deleted Sub Category and related products successfully',{ position: 'top-right' });
            let updatedState = [...subCategories];
            updatedState = updatedState?.filter((item) => item?._id !== id);
            setSubCategories(updatedState)
        }
    }

    const showDeleteConfirm = (record) => {
        confirm({
            title: 'Are you sure you want to delete this sub category?, All Products related to this sub category will be also deleted!',
            icon: <ExclamationCircleOutlined />,
            content: `Category: ${record.subCategory}`,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                handleDeleteSubCategory(record?._id)
                // Logic to delete category goes here

            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };
    const showModal = () => {
        setModalVisible(true);
        setEditActive(false);
    };

    const handleOk = () => {
        // Logic to add category goes here
        setModalVisible(false);
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    const handleCloudinaryImageDelete = async (public_id, _id) => {
        try {
            const { error, data } = await deleteApi({ endpoint: `/api/v2/category/delete-subCat-Img/${_id}`, postData: { data: { public_id } } })
            if (error) {
                toast.info(error?.response?.data?.message,{ position: 'top-right' })
            }
            if (data) {
                let updatedState = { ...subCategoryData };
                updatedState.subCatImg = '';
                setSubCategory(updatedState);
                toast.success('Image delete successfully!',{ position: 'top-right' })
            }
        } catch (error) {
            toast.info(error?.response?.data?.message,{ position: 'top-right' })
        }
    }

    const columns = [
        {
            title: 'Sub Category',
            dataIndex: 'subCategory',
            key: 'subCategory',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            render: text => <a>{fetchCategoryName({ id: text, categories })}</a>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <>
                    <Button type="link" icon={<EditOutlined />} onClick={() => showEditModal(record)}>Edit</Button>
                    <Button type="link" icon={<DeleteOutlined />} onClick={() => showDeleteConfirm(record)}>Delete</Button>
                </>
            ),
        },
    ];

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Img = reader.result;
                let updatedState = { ...subCategoryData };
                updatedState.subCatImg = base64Img;
                setSubCategory(updatedState);
            }
            reader.readAsDataURL(file);
        }
    }


    const handleOptionChange = (value) => {
        let categoryName = fetchCategoryName({ id: value, categories })
        setSelectedOption(categoryName);
        setSubCategory({ ...subCategoryData, category: value })
    };

    const fetchCategoryName = ({ id, categories }) => {
        let found = categories?.length > 0 && categories.find((item) => item._id === id);
        if (found) {
            return found?.category
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data, error } = await postApi({ endpoint: `/api/v2/category/add-sub-category`, postData: subCategoryData });
        if (error) {
            toast.info(error?.response?.data?.message,{ position: 'top-right' })
        }
        if (data) {
           toast.success("Added SubCategory Successfully",{ position: 'top-right' })
        }
    }

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const { data, error } = await putApi({ endpoint: `/api/v2/category/edit-sub-category`, postData: subCategoryData });
        if (error) {
            toast.info(error?.response?.data?.message,{ position: 'top-right' })
        }
        if (data) {
            toast.success("Added SubCategory Successfully",{ position: 'top-right' });
        }
    }




    return (
        <div className='dashboard-container'>
            <SideBar menu={sidebar_menu} />
            <div className='dashboard-content'>
                <div className="dashboard-header">
                    <h3>Category List</h3>
                    <div className="add-btn">
                        <DashboardHeader />
                        <div >
                            <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
                                Add Category
                            </Button>
                        </div>
                    </div>
                </div>


                <Table
                    dataSource={subCategories}
                    columns={columns}
                    bordered={false}
                    pagination={false}
                />
                <Modal
                    title="Add Category"
                    visible={modalVisible}
                    onOk={editActive ? handleEditSubmit : handleSubmit}
                    onCancel={handleCancel}
                >
                    <Form layout="vertical">
                        <Form.Item label="Select Type" name="selectType" rules={[{ required: true, message: 'Please select the category type!' }]}>
                            <Select value={subCategoryData?.category} defaultValue={subCategoryData?.category} placeholder="Select an option" onChange={handleOptionChange} style={{ width: 200, marginBottom: '16px' }}>
                                {categories?.map((category, index) => (
                                    <Option value={category?._id} key={index}>{category?.category}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Sub Category Name" name="categoryName" rules={[{ required: true, message: 'Please input the category name!' }]}>
                            <input defaultValue={subCategoryData?.subCategory} value={subCategoryData?.subCategory} onChange={(e) => setSubCategory({ ...subCategoryData, subCategory: e.target.value })} disabled={selectedOption ? false : true} />
                        </Form.Item>
                        {subCategoryData?.subCatImg?.url ? <>
                            <Form.Item label="Sub Category Image" name="subCatImg" rules={[{ required: true, message: 'Please select the sub category image!' }]}>
                                <div className="w-full flex items-center flex-wrap">
                                    {subCategoryData?.subCatImg?.url !== '' && (
                                        <div className="image-div">
                                            <img
                                                src={subCategoryData?.subCatImg?.url}
                                                alt="main"
                                                className="h-[130px] w-[130px] object-cover"
                                            />
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleCloudinaryImageDelete(subCategoryData?.subCatImg?.public_id, subCategoryData?._id)
                                                }}
                                                className="images-delete-btn"
                                            >
                                                {/* <FontAwesomeIcon icon={faTrash} style={{ color: 'red' }} /> */}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </Form.Item>
                        </> : <>
                            <Form.Item label="Sub Category Image" name="subCatImg" rules={[{ required: true, message: 'Please select the sub category image!' }]}>
                                <input type='file' value={subCategoryData?.subCatImg} onChange={handleImageChange} disabled={selectedOption ? false : true} />
                            </Form.Item>
                            <div className="w-full flex items-center flex-wrap">
                                {subCategoryData?.subCatImg !== '' && (
                                    <div className="image-div">
                                        <img
                                            src={subCategoryData?.subCatImg}
                                            alt="main"
                                            className="h-[130px] w-[130px] object-cover"
                                        />
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setSubCategory({ ...subCategoryData, subCatImg: '' })
                                            }}
                                            className="images-delete-btn"
                                        >
                                            {/* <FontAwesomeIcon icon={faTrash} style={{ color: 'red' }} /> */}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>}
                    </Form>
                </Modal>
            </div>
        </div>
    );
}

export default Category;
