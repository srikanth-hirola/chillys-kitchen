// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Form, Input, Button, Switch, Upload, message } from 'antd';
import { UploadOutlined,PlusOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

function CorporateMealForm({ onFinish }) {
    const [variationsEnabled, setVariationsEnabled] = useState(false);
    const [multipleImagesEnabled, setMultipleImagesEnabled] = useState(false);

const handleSubmit = (values) => {
    onFinish(values);
};
const handleVariationsToggle = (checked) => {
        setVariationsEnabled(checked);
    };
    const handleMultipleImagesToggle = (checked) => {
        setMultipleImagesEnabled(checked);
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
        <h3>Add Product (Corporate Meal)</h3>
        <Form
        name="addProductForm"
        onFinish={handleSubmit}
        layout="vertical"
    >
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
                    label="Main Image"
                    name="mainImage"
                >
                    <Upload {...uploadProps}>
                        <Button icon={<UploadOutlined />}>Upload Main Image</Button>
                    </Upload>
                </Form.Item>
                <Form.Item>
                    <Switch checked={multipleImagesEnabled} onChange={handleMultipleImagesToggle} />
                    <span style={{ marginLeft: '8px' }}>Multiple Images</span>
                </Form.Item>
                {multipleImagesEnabled && (
                    <Form.Item
                        label="Additional Images"
                        name="additionalImages"
                    >
                        <Upload {...uploadProps} multiple>
                            <Button icon={<UploadOutlined />}>Upload Additional Images</Button>
                        </Upload>
                    </Form.Item>
                )}
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
     
            <Form.Item>
                <Switch checked={variationsEnabled} onChange={handleVariationsToggle} />
                <span style={{ marginLeft: '8px' }}>Variations</span>
            </Form.Item>
            {variationsEnabled && (
                <>
                    <Form.Item
                        label="Variation Name"
                        name="variationName"
                        rules={[{ required: true, message: 'Please input the product name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Variation Price"
                        name="variationPrice"
                        rules={[{ required: true, message: 'Please input the price!' }]}
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item
                        label="Variation Description"
                        name="variationeDscription"
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item
                        label="Discount Price"
                        name="discountPrice"
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item
                        label="Variation Image"
                        name="variationImage"
                    >
                        <Upload {...uploadProps}>
                            <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                    </Form.Item>
                </>
            )}
        <Form.Item
            label="Sku Code"
            name="skuCode"
        >
            <Input />
        </Form.Item>
        <Form.Item>
            <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
                Add Product
            </Button>
        </Form.Item>
    </Form>
      </>
    );
}

CorporateMealForm.propTypes = {
    onFinish: PropTypes.func.isRequired,
};

export default CorporateMealForm;
