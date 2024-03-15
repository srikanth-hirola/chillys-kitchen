/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Form, Input, Button, Switch, Upload, message, InputNumber } from 'antd';
import { UploadOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import useAPI from '../../../../../customHooks/API/useAPI';
import useProductHandler from '../../../../../customHooks/Products/useProductHandlers';

function CloudKitchen({ onFinish, productData, setProductData }) {
    const { postApi } = useAPI();
    const [inputs, setInputs] = useState([{ key: '', value: '' }]);
    const [variations, setVariations] = useState([{ SKU: "", imageColor: '', originalPrice: null, stock: null, discountPrice: null, image: { public_id: '', url: '' } }]);
    const [variationsEnabled, setVariationsEnabled] = useState(false);
    const [multipleImagesEnabled, setMultipleImagesEnabled] = useState(false);
    const handleMultipleImagesToggle = (checked) => {
        setMultipleImagesEnabled(checked);
    };
    const [mainImage, setMainImage] = useState('');
    const [images, setImages] = useState([]);

    const { handleVariationsToggle, handleAddVariation, handleRemoveVariation, handleProductChange, handleProductNumberChange, handleSubmitProductData, handleMainImageChange, handleImageChange, handleVarientImageChange, handleVarientInputChange, handleVarientNumberInputChange } = useProductHandler({ productData, setProductData, variations, setVariations, setMainImage, setImages });

    return (
        <>
            <h3>Add Product (Corporate Meal)</h3>
            <Form
                name="addProductForm"
                onFinish={(e) => handleSubmitProductData({ dataParam: productData, mainImage, images })}
                layout="vertical"
            >
                {/* Main Product Information */}
                <Form.Item
                    label="Product Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input the product name!' }]}
                >
                    <Input value={productData?.name} onChange={handleProductChange} name='name' />
                </Form.Item>

                <Form.Item
                    label="Image"
                    name="image"
                >
                    <input
                        type="file"
                        name=""
                        id="MainImage"
                        className="hidden"
                        onChange={handleMainImageChange}
                    />
                    <div className="w-full flex items-center flex-wrap">

                        {mainImage !== '' && (
                            <div className="image-div">
                                <img
                                    src={mainImage}
                                    alt="main"
                                    className="h-[130px] w-[130px] object-cover"
                                />
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setMainImage('');
                                    }}
                                    className="images-delete-btn"
                                >
                                    {/* <FontAwesomeIcon icon={faTrash} style={{ color: 'red' }} /> */}
                                </button>
                            </div>
                        )}

                    </div>
                </Form.Item>
                <Form.Item>
                    <Switch checked={multipleImagesEnabled} onChange={handleMultipleImagesToggle} />
                    <span style={{ marginLeft: '8px' }}>Multiple Images</span>
                </Form.Item>
                {multipleImagesEnabled && (
                    <Form.Item
                        label="Multiple Images"
                        name="image"
                    >
                        <input
                            type="file"
                            name=""
                            id="upload"
                            className="hidden"
                            multiple
                            onChange={handleImageChange}
                        />
                    </Form.Item>
                )}
                <Form.Item
                    label="Original Price"
                    name="originalPrice"
                    rules={[{ required: true, message: 'Please input the Original price!' }]}
                >
                    <InputNumber type="number" value={productData?.originalPrice} onChange={(e) => handleProductNumberChange(e, "originalPrice")} name="originalPrice" />
                </Form.Item>
                <Form.Item
                    label="Discount Price"
                    name="discountPrice"
                    rules={[{ required: true, message: 'Please input the price!' }]}
                >
                    <InputNumber type="number" value={productData?.discountPrice} onChange={(e) => handleProductNumberChange(e, "discountPrice")} name="discountPrice" />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                >
                    <Input.TextArea value={productData?.description} onChange={handleProductChange} name="description" />
                </Form.Item>


                {/* Variations */}
                <Form.Item>
                    <Switch checked={variationsEnabled} onChange={(checked) => handleVariationsToggle({ checked, setVariationsEnabled })} />
                    <span style={{ marginLeft: '8px' }}>Variations</span>
                </Form.Item>
                {variationsEnabled && (
                    <>
                        {variations.map((variation, index) => (
                            <div key={index}>
                                <h4>Variation {index + 1}</h4>
                                <Form.Item
                                    label="Name"
                                    name={`variations[${index}].imageColor`}
                                    rules={[{ required: true, message: 'Please input the variation name!' }]}
                                >
                                    <Input value={variation?.imageColor} onChange={(e) =>
                                        handleVarientInputChange(index, 'imageColor', e.target.value)
                                    } />
                                </Form.Item>
                                <Form.Item
                                    label="Original Price"
                                    name={`variations[${index}].originalPrice`}
                                    rules={[{ required: true, message: 'Please input the variation original price!' }]}
                                >
                                    <InputNumber type="number" value={variation?.originalPrice} onChange={(e) =>
                                        handleVarientNumberInputChange(e, index, 'originalPrice',)
                                    } />
                                </Form.Item>
                                <Form.Item
                                    label="Discount Price"
                                    name={`variations[${index}].discountPrice`}
                                    rules={[{ required: true, message: 'Please input the variation discount price!' }]}
                                >
                                    <InputNumber type="number" value={variation?.discountPrice} onChange={(e) =>
                                        handleVarientNumberInputChange(e, index, 'discountPrice')
                                    } />
                                </Form.Item>
                                <Form.Item
                                    label="Stock"
                                    name={`variations[${index}].stock`}
                                    rules={[{ required: true, message: 'Please input the variation stock!' }]}
                                >
                                    <InputNumber value={variation?.stock} onChange={(e) =>
                                        handleVarientNumberInputChange(e, index, 'stock')
                                    } />
                                </Form.Item>
                                <Form.Item
                                    label="Variation Sku Code"
                                    name="variationskuCode"
                                    rules={[{ required: true, message: 'Please enter sku code' }]}
                                >
                                    <Input value={variation?.SKU} onChange={(e) =>
                                        handleVarientInputChange(index, 'SKU', e.target.value)
                                    } />
                                </Form.Item>
                                <Form.Item
                                    label="Image"
                                    name={`variations[${index}].image`}
                                >
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className='mt-1'
                                        onChange={(e) => handleVarientImageChange(index, e)}
                                    />
                                    {variation?.image?.url && (
                                        <>
                                            <img
                                                className="mt-4 mb-3"
                                                src={variation?.image?.url}
                                                alt={`Color ${index + 1}`}
                                                style={{ width: '100px', height: '100px' }}
                                            />
                                        </>
                                    )}
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
                    <Form.Item
                        label="Number of Items"
                        name="noItem"
                        rules={[{ required: true, message: 'Please enter numbe of items' }]}
                    >
                        <InputNumber type="number" value={productData?.noItem} onChange={(e) => handleProductNumberChange(e, "noItem")} name="noItem" />
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
                        name="SKU"
                        rules={[{ required: true, message: 'Please enter sku code' }]}
                    >
                        <Input value={productData?.SKU} onChange={handleProductChange} name="SKU" />
                    </Form.Item>
                    <Form.Item
                        label="Stock"
                        name="stock"
                        rules={[{ required: true, message: 'Please enter stock' }]}
                    >
                        <InputNumber type="number" value={productData?.stock} onChange={(e) => handleProductNumberChange(e, "stock")} name="stock" />
                    </Form.Item>
                </div>
                <div className="">
                    <h4>Meta Information</h4>
                    <Form.Item
                        label="Slug"
                        name="slug"
                        rules={[{ required: true, message: 'Please Enter slug' }]}
                    >
                        <Input value={productData?.slug} onChange={handleProductChange} name="slug" />
                    </Form.Item>
                    <Form.Item
                        label="Meta Title"
                        name="metaTitle"
                        rules={[{ required: true, message: 'Please Enter Meta Title' }]}
                    >
                        <Input value={productData?.metaTitle} onChange={handleProductChange} name="metaTitle" />
                    </Form.Item>
                    <Form.Item
                        label="Meta Description"
                        name="metaDescription"
                        rules={[{ required: true, message: 'Please enter meta description' }]}
                    >
                        <Input.TextArea value={productData?.metaDescription} onChange={handleProductChange} name="metaDescription" />
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
    productData: PropTypes.object,
    setProductData: PropTypes.func.isRequired
};

export default CloudKitchen;
