/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Form, Input, Button, Switch, Upload, message } from 'antd';
import { UploadOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

function CloudKitchen({ onFinish }) {
    const [inputs, setInputs] = useState([{ key: '', value: '' }]);
    const [variations, setVariations] = useState([{ name: '', price: '', description: '', discountPrice: '', image: null }]);
    const [variationsEnabled, setVariationsEnabled] = useState(false);

    const handleInputChange = (index, event) => {
        const values = [...inputs];
        values[index][event.target.name] = event.target.value;
        setInputs(values);
    };


    const handleVariationsToggle = (checked) => {
        setVariationsEnabled(checked);
    };

    const handleAddVariation = () => {
        setVariations([...variations, { name: '', price: '', description: '', discountPrice: '', image: null }]);
    };

    const handleRemoveVariation = (index) => {
        const updatedVariations = [...variations];
        updatedVariations.splice(index, 1);
        setVariations(updatedVariations);
    };

    const handleSubmit = () => {
        onFinish(inputs, variations);
    };

    const uploadProps = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    return (
        <>
            <h3>Add Product (Cloud Kitchen)</h3>
            <Form
                name="addProductForm"
                onFinish={handleSubmit}
                layout="vertical"
            >
                {/* Main Product Information */}
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input the product name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Quantity"
                    name="quantity"
                    rules={[{ required: true, message: 'Please input the quantity!' }]}
                >
                    <Input type="number" />
                </Form.Item>
                <Form.Item
                    label="Image"
                    name="image"
                >
                    <Upload {...uploadProps}>
                        <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                </Form.Item>
                <Form.Item
                    label="Price"
                    name="price"
                    rules={[{ required: true, message: 'Please input the price!' }]}
                >
                    <Input type="number" />
                </Form.Item>
                <Form.Item
                    label="Discount Price"
                    name="discountPrice"
                    rules={[{ required: true, message: 'Please input the price!' }]}
                >
                    <Input type="number" />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                >
                    <Input.TextArea />
                </Form.Item>
               

                {/* Variations */}
                <Form.Item>
                    <Switch checked={variationsEnabled} onChange={handleVariationsToggle} />
                    <span style={{ marginLeft: '8px' }}>Variations</span>
                </Form.Item>
                {variationsEnabled && (
                    <>
                        {variations.map((variation, index) => (
                            <div key={index}>
                                <h4>Variation {index + 1}</h4>
                                <Form.Item
                                    label="Name"
                                    name={`variations[${index}].name`}
                                    rules={[{ required: true, message: 'Please input the variation name!' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Price"
                                    name={`variations[${index}].price`}
                                    rules={[{ required: true, message: 'Please input the variation price!' }]}
                                >
                                    <Input type="number" />
                                </Form.Item>
                                <Form.Item
                                    label="Description"
                                    name={`variations[${index}].description`}
                                >
                                    <Input.TextArea />
                                </Form.Item>
                                <Form.Item
                    label="Variation Sku Code"
                    name="variationskuCode"
                    rules={[{ required: true, message: 'Please enter sku code' }]}
                >
                    <Input />
                </Form.Item>
                                <Form.Item
                                    label="Image"
                                    name={`variations[${index}].image`}
                                >
                                    <Upload {...uploadProps}>
                                        <Button icon={<UploadOutlined />}>Upload</Button>
                                    </Upload>
                                </Form.Item>
                                <Button type="danger" icon={<MinusCircleOutlined />} onClick={() => handleRemoveVariation(index)}>
                                    Remove Variation
                                </Button>
                            </div>
                        ))}
                        <Button type="dashed" onClick={handleAddVariation} style={{ marginBottom: '8px' }}>
                            Add Variation
                        </Button>
                    </>
                )}

                {/* Additional Fields */}
                
                
                <div className="">
                    <h4 className='' >Stock Information</h4>
                    <Form.Item
                    label="Number of Items"
                    name="numberOfItems"
                    rules={[{ required: true, message: 'Please enter items' }]}
                >
                    <Input type="number" />
                </Form.Item>
                <Form.Item
                    label="Search Terms"
                    name="searchTerms"
                >
                    <Input />
                </Form.Item>

                {/* SKU Code */}
                <Form.Item
                    label="Sku Code"
                    name="skuCode"
                    rules={[{ required: true, message: 'Please enter sku code' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Stock"
                    name="stock"
                    rules={[{ required: true, message: 'Please enter stock' }]}
                >
                    <Input type="number" />
                </Form.Item>
                </div>
                            <div className="">
                            <h4>Meta Information</h4>
                            <Form.Item
                    label="Meta Title"
                    name="metatitle"
                    rules={[{ required: true, message: 'Please Enter Meta Title' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Meta Description"
                    name="metaDescription"
                    rules={[{ required: true, message: 'Please enter meta description' }]}
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    label="Slug"
                    name="slug"
                    rules={[{ required: true, message: 'Please Enter slug' }]}
                >
                    <Input />
                </Form.Item>
               
                            </div>
                {/* Submit Button */}
                <Form.Item>
                    <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
                        Add Product
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}

CloudKitchen.propTypes = {
    onFinish: PropTypes.func.isRequired,
};

export default CloudKitchen;
