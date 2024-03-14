/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Table, Tag, Button, Modal, Form, Input, message, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import SideBar from '../../../../components/Sidebar';
import sidebar_menu from '../../../../constants/sidebar-menu';
import DashboardHeader from '../../../../components/DashboardHeader';

const { Option } = Select;
function Category() {
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
        form.setFieldsValue({
            categoryName: record.name
        });
        setModalVisible(true);
    };

    const handleEditOk = () => {
        form.validateFields()
            .then(values => {
                // Logic to update category goes here
                message.success('Category updated successfully');
                setModalVisible(false);
            })
            .catch(error => {
                console.error('Validation failed:', error);
            });
    };

    const handleEditCancel = () => {
        setModalVisible(false);
    };

    const showDeleteConfirm = (record) => {
        confirm({
            title: 'Are you sure you want to delete this category?',
            icon: <ExclamationCircleOutlined />,
            content: `Category: ${record.name}`,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                // Logic to delete category goes here
                message.success('Category deleted successfully');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };
    const showModal = () => {
        setModalVisible(true);
    };

    const handleOk = () => {
        // Logic to add category goes here
        setModalVisible(false);
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: tags => (
                <>
                    {tags.map(tag => (
                        <Tag color="blue" key={tag}>
                            {tag}
                        </Tag>
                    ))}
                </>
            ),
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

    const handleEdit = (record) => {
        // Logic to edit category goes here
        console.log('Edit', record);
    };

    const handleDelete = (record) => {
        // Logic to delete category goes here
        console.log('Delete', record);
    };

    return (
        <div className='dashboard-container'>
            <SideBar menu={sidebar_menu} />
            <div className='dashboard-content'>
            <div className="dashboard-header">
              
                <h3>Category List</h3>
                <div className="add-btn">
                <DashboardHeader/>
                <div >
                    <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
                        Add Category
                    </Button>
                </div>
                </div>
            </div>
                
                
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    bordered={false}
                    pagination={false}
                />
                <Modal
                    title="Add Category"
                    visible={modalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <Form layout="vertical">
                        <Form.Item label="Category Name" name="categoryName" rules={[{ required: true, message: 'Please input the category name!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Select Type" name="selectType" rules={[{ required: true, message: 'Please select the category type!' }]}>
                            <Select>
                                <Option value="cloudKitchen">Cloud Kitchen</Option>
                                <Option value="corporateMeals">Corporate Meals</Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div>
    );
}

export default Category;
