/* eslint-disable no-unused-vars */
// // eslint-disable-next-line no-unused-vars
// import React, { useState } from 'react';
// import { Form, Input, Button, Switch, Upload, message } from 'antd';
// import { UploadOutlined,PlusOutlined } from '@ant-design/icons';
// import PropTypes from 'prop-types';

// function CloudKitchen({ onFinish }) {
//     const [inputs, setInputs] = useState([{ key: '', value: '' }]);
//     const [variationsEnabled, setVariationsEnabled] = useState(false);
//     const [variations, setVariations] = useState([{ name: '', price: '', description: '', discountPrice: '', image: null }]);
//     const handleInputChange = (index, event, type) => {
//         if (type === 'input') {
//             const values = [...inputs];
//             values[index][event.target.name] = event.target.value;
//             setInputs(values);
//         } else {
//             const values = [...variations];
//             values[index][event.target.name] = event.target.value;
//             setVariations(values);
//         }
//     };

//     const handleAddInput = (type) => {
//         if (type === 'input') {
//             setInputs([...inputs, { key: '', value: '' }]);
//         } else {
//             setVariations([...variations, { name: '', price: '', description: '', discountPrice: '', image: null }]);
//         }
//     };

//     const handleRemoveInput = (index, type) => {
//         if (type === 'input') {
//             const values = [...inputs];
//             values.splice(index, 1);
//             setInputs(values);
//         } else {
//             const values = [...variations];
//             values.splice(index, 1);
//             setVariations(values);
//         }
//     };


//     const handleSubmit = () => {
//         onFinish(inputs, variations);
//     };

//     const handleVariationsToggle = (checked) => {
//         setVariationsEnabled(checked);
//     };

//     const uploadProps = {
//         name: 'file',
//         action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
//         onChange(info) {
//             if (info.file.status !== 'uploading') {
//                 console.log(info.file, info.fileList);
//             }
//             if (info.file.status === 'done') {
//                 message.success(`${info.file.name} file uploaded successfully`);
//             } else if (info.file.status === 'error') {
//                 message.error(`${info.file.name} file upload failed.`);
//             }
//         },
//     };
//     return (
//       <>
//         <h3>Add Product (Cloud Kitchen)</h3>
//         <Form
//         name="addProductForm"
//         onFinish={handleSubmit}
//         layout="vertical"
//     >
//         <Form.Item
//             label="Name"
//             name="name"
//             rules={[{ required: true, message: 'Please input the product name!' }]}
//         >
//             <Input />
//         </Form.Item>
//         <Form.Item
//             label="Quantity"
//             name="quantity"
//             rules={[{ required: true, message: 'Please input the quantity!' }]}
//         >
//             <Input type="number" />
//         </Form.Item>
//         <Form.Item
//                         label="Image"
//                         name="image"
//                     >
//                         <Upload {...uploadProps}>
//                             <Button icon={<UploadOutlined />}>Upload</Button>
//                         </Upload>
//         </Form.Item>
//         <Form.Item
//             label="Price"
//             name="price"
//             rules={[{ required: true, message: 'Please input the price!' }]}
//         >
//             <Input type="number" />
//         </Form.Item>
//         <Form.Item
//             label="Discount Price"
//             name="discountPrice"
//             rules={[{ required: true, message: 'Please input the price!' }]}
//         >
//             <Input type="number" />
//         </Form.Item>
//         <Form.Item
//             label="Description"
//             name="description"
//         >
//             <Input.TextArea />
//         </Form.Item>
//         <Form.Item
//         label="Product Information"
//         name="productinfo"
//         >
//    {inputs.map((input, index) => (
//                 <div key={index} style={{ display: 'flex', marginBottom: '8px' }}>
//                     <Input
//                         placeholder="Key"
//                         name="key"
//                         value={input.key}
//                         onChange={(event) => handleInputChange(index, event)}
//                         style={{ marginRight: '8px', width: '50%' }}
//                     />
//                     <Input
//                         placeholder="Value"
//                         name="value"
//                         value={input.value}
//                         onChange={(event) => handleInputChange(index, event)}
//                         style={{ marginRight: '8px', width: '50%' }}
//                     />
//                     {inputs.length > 1 && (
//                         <Button type="danger" onClick={() => handleRemoveInput(index)} style={{ marginBottom: '8px' }}>
//                             Remove
//                         </Button>
//                     )}
//                 </div>
//             ))}
//             <Button type="dashed" onClick={handleAddInput} style={{ marginBottom: '8px' }}>
//                 Add Input
//             </Button>
//         </Form.Item>
//         <Form.Item>
//                     <Switch checked={variationsEnabled} onChange={handleVariationsToggle} />
//                     <span style={{ marginLeft: '8px' }}>Variations</span>
//                 </Form.Item>

//                 {variationsEnabled && variations.map((variant, index) => (
//                     <div key={index}>
//                         <Form.Item label={`Variant ${index + 1}`}>
//                             <Input placeholder="Name" name="name" value={variant.name} onChange={(event) => handleInputChange(index, event, 'variant')} />
//                         </Form.Item>
//                         <Form.Item>
//                             <Input placeholder="Price" name="price" value={variant.price} onChange={(event) => handleInputChange(index, event, 'variant')} />
//                         </Form.Item>
//                         <Form.Item>
//                             <Input placeholder="Description" name="description" value={variant.description} onChange={(event) => handleInputChange(index, event, 'variant')} />
//                         </Form.Item>
//                         <Form.Item>
//                             <Input placeholder="Discount Price" name="discountPrice" value={variant.discountPrice} onChange={(event) => handleInputChange(index, event, 'variant')} />
//                         </Form.Item>
//                         <Form.Item>
//                             <Upload {...uploadProps}>
//                                 <Button icon={<UploadOutlined />}>Upload Image</Button>
//                             </Upload>
//                         </Form.Item>
//                         <Button type="danger" onClick={() => handleRemoveInput(index, 'variant')}>Remove</Button>
//                     </div>
//                 ))}
//                 <Button type="dashed" onClick={() => handleAddInput('variant')}>Add Variant</Button>

//         <Form.Item
//             label="Sku Code"
//             name="skuCode"
//         >
//             <Input />
//         </Form.Item>
//         <Form.Item>
//             <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
//                 Add Product
//             </Button>
//         </Form.Item>
//     </Form>
//       </>
//     );
// }

// CloudKitchen.propTypes = {
//     onFinish: PropTypes.func.isRequired,
// };

// export default CloudKitchen;


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

    const handleAddInput = () => {
        setInputs([...inputs, { key: '', value: '' }]);
    };

    const handleRemoveInput = (index) => {
        const values = [...inputs];
        values.splice(index, 1);
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
                                    label="Discount Price"
                                    name={`variations[${index}].discountPrice`}
                                >
                                    <Input type="number" />
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
                <Form.Item
                    label="Slug"
                    name="slug"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Title"
                    name="title"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="metaDescription"
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    label="Stock"
                    name="stock"
                >
                    <Input type="number" />
                </Form.Item>
                <Form.Item
                    label="Number of Items"
                    name="numberOfItems"
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
                >
                    <Input />
                </Form.Item>

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
