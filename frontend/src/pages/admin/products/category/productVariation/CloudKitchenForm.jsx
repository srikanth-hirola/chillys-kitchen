// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Form, Input, Button, Switch, Upload, message } from 'antd';
import { UploadOutlined,PlusOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

function CloudKitchen({ onFinish }) {
    const [inputs, setInputs] = useState([{ key: '', value: '' }]);
    const [variationsEnabled, setVariationsEnabled] = useState(false);
const handleInputChange = (index, event) => {
    const values = [...inputs];
    values[index][event.target.name] = event.target.value;
    setInputs(values);
};

const handleAddInput = () => {
    setInputs([...inputs, { key: '', value: '' }]);
};

const handleRemoveInput = (index) => {
    const values = [...inputs];
    values.splice(index, 1);
    setInputs(values);
};

const handleSubmit = () => {
    onFinish(inputs);
};
const handleVariationsToggle = (checked) => {
        setVariationsEnabled(checked);
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
        <Form.Item
        label="Product Information"
        name="productinfo"
        >
   {inputs.map((input, index) => (
                <div key={index} style={{ display: 'flex', marginBottom: '8px' }}>
                    <Input
                        placeholder="Key"
                        name="key"
                        value={input.key}
                        onChange={(event) => handleInputChange(index, event)}
                        style={{ marginRight: '8px', width: '50%' }}
                    />
                    <Input
                        placeholder="Value"
                        name="value"
                        value={input.value}
                        onChange={(event) => handleInputChange(index, event)}
                        style={{ marginRight: '8px', width: '50%' }}
                    />
                    {inputs.length > 1 && (
                        <Button type="danger" onClick={() => handleRemoveInput(index)} style={{ marginBottom: '8px' }}>
                            Remove
                        </Button>
                    )}
                </div>
            ))}
            <Button type="dashed" onClick={handleAddInput} style={{ marginBottom: '8px' }}>
                Add Input
            </Button>
        </Form.Item>
            <Form.Item>
                <Switch checked={variationsEnabled} onChange={handleVariationsToggle} />
                <span style={{ marginLeft: '8px' }}>Variations</span>
            </Form.Item>
            {variationsEnabled && (
                <>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input the product name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Price"
                        name="price"
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
                    <Form.Item
                        label="Discount Price"
                        name="discountPrice"
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

CloudKitchen.propTypes = {
    onFinish: PropTypes.func.isRequired,
};

export default CloudKitchen;
