/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Switch, Upload, message, InputNumber } from 'antd';
import { UploadOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import useProductHandler from '../../../../../customHooks/Products/useProductHandlers';
import { useParams } from 'react-router';
import useAPI from '../../../../../customHooks/API/useAPI';

const EditCloudKitchen = ({ onFinish, productData, setProductData }) => {
    const { edit } = useParams();
    const { putApi, deleteApi } = useAPI();
    const [inputs, setInputs] = useState([{ key: '', value: '' }]);
    const [variations, setVariations] = useState(productData?.colorInputs || [{ SKU: "", imageColor: '', originalPrice: null, stock: null, discountPrice: null, image: { public_id: '', url: '' } }]);
    const [variationsEnabled, setVariationsEnabled] = useState(productData?.showInputs || false);
    const [mainImage, setMainImage] = useState(productData?.mainImage?.url || '');
    const [images, setImages] = useState([]);

    console.log(productData, "produEdit")

    const { handleInputChange, handleAddInput, handleRemoveInput, handleVariationsToggle, handleAddVariation, handleRemoveVariation, handleProductChange, handleProductNumberChange, handleSubmitProductData, handleMainImageChange, handleImageChange, handleVarientImageChange, handleVarientInputChange, handleVarientNumberInputChange, handleSubmitEditProductData } = useProductHandler({ productData, setProductData, variations, setVariations, setMainImage, setImages });

    const handleRemove = (e, index) => {
        e.preventDefault();
        const updatedItems = [...images];
        updatedItems.splice(index, 1);
        setImages(updatedItems);
    };

    const handleMianDelete = async (e, image) => {
        e.preventDefault();
        try {
            const { error } = await putApi({ endpoint: `/api/v2/product/delete-main-image`, postData: { id: image, _id: edit } });
            if (error) {
                alert(error?.response?.data?.message)
            } else {
                alert("Deleted Image Successfully");
                window.location.reload();
            }
        } catch (error) {
            console.log(error)
        }
        // axios
        //     .put(
        //         `${server}/product/delete-main-image`,
        //         { id: image, _id: id },
        //         {
        //             withCredentials: true,
        //         }
        //     )
        //     .then((res) => {
        //         toast.success('Image Deleted successfully!');
        //         window.location.reload();
        //     })
        //     .catch((error) => {
        //         toast.error(error.response.data.message);
        //     });
    };

    const handleDeleteCloudinaryImage = async (e, id, proId) => {
        e.preventDefault();
        try {
            const { error } = await putApi({ endpoint: `/api/v2/product/delete-product-image`, postData: { id, _id: proId } });
            if (error) {
                alert(error?.response?.data?.message)
            } else {
                alert("Image Deleted successfully!");
                window.location.reload();
            }
        } catch (error) {
            console.log(error)
        }
        // axios
        //     .put(
        //         `${server}/product/delete-product-image`,
        //         { id: id, _id: formData._id },
        //         {
        //             withCredentials: true,
        //         }
        //     )
        //     .then((res) => {
        //         dispatch(getAllProductsShop(formData._id));
        //         toast.success('Image Deleted successfully!');
        //         window.location.reload();
        //     })
        //     .catch((error) => {
        //         toast.error(error.response.data.message);
        //     });
    };

    const handleDeleteCloudinaryVarieationsImage = async (e, id, index, proId) => {
        e.preventDefault();
        try {
            const { error } = await putApi({ endpoint: `/api/v2/product/delete-showInput-image`, postData: { id: id, _id: proId, index } });
            if (error) {
                alert(error?.response?.data?.message)
            } else {
                alert("Image Deleted successfully!");
                window.location.reload();
            }
        } catch (error) {
            console.log(error)
        }
        // axios
        //     .put(
        //         `${server}/product/delete-product-image`,
        //         { id: id, _id: formData._id },
        //         {
        //             withCredentials: true,
        //         }
        //     )
        //     .then((res) => {
        //         dispatch(getAllProductsShop(formData._id));
        //         toast.success('Image Deleted successfully!');
        //         window.location.reload();
        //     })
        //     .catch((error) => {
        //         toast.error(error.response.data.message);
        //     });
    };

    const [colorInputsIndexUpdateImage, setColorInputsIndexUpdateImage] = useState([])

    const handleEditImageChange = (index, event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Image = reader.result;
                const updatedColorInputs = [...variations];
                const updatedColorInput = { ...updatedColorInputs[index] };
                updatedColorInput.image.url = base64Image;
                updatedColorInputs[index] = updatedColorInput;
                setVariations(updatedColorInputs);

                const updatedIndex = [...colorInputsIndexUpdateImage];
                updatedIndex.push(index);
                setColorInputsIndexUpdateImage(updatedIndex);
            };
            reader.readAsDataURL(file);
        }
    };


    return (
        <>
            <h3>Edit Product (Cloud Kitchen)</h3>
            <Form
                name="addProductForm"
                onFinish={(e) => handleSubmitEditProductData({ dataParam: productData, inputs, mainImage, images, proId: edit, colorInputsIndexUpdateImage })}
                layout="vertical"
            >
                {/* Main Product Information */}
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input the product name!' }]}
                >
                    <Input value={productData?.name} defaultValue={productData?.name} onChange={handleProductChange} name='name' />
                </Form.Item>
                <Form.Item
                    label="Image"
                    name="image"
                >
                    {productData?.mainImage?.url ? (
                        <div className="image-div">
                            <img
                                src={productData.mainImage.url}
                                alt="main"
                                className="h-[130px] w-[130px] object-cover"
                            />
                            <button
                                onClick={(e) => {
                                    handleMianDelete(e, productData.mainImage.public_id);
                                }}
                                className="images-delete-btn"
                            >
                                {/* <FontAwesomeIcon icon={faTrash} style={{ color: 'red' }} /> */}
                            </button>
                        </div>
                    ) : (
                        <>
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
                        </>
                    )}

                </Form.Item>
                <Form.Item
                    label="Multiple Images"
                    name="image"
                >
                    <>
                        {productData?.images?.length > 0 &&
                            productData?.images?.map((i, index) => (
                                <div className="image-div" key={index}>
                                    <img
                                        src={i.url}

                                        alt=""
                                        className="h-[130px] w-[130px] object-cover"
                                    />
                                    <button
                                        onClick={(e) => {
                                            handleDeleteCloudinaryImage(e, i.public_id, edit);
                                        }}
                                        className="images-delete-btn"
                                    >
                                        {/* <FontAwesomeIcon icon={faTrash} style={{ color: 'red' }} /> */}
                                    </button>
                                </div>
                            ))}
                        <input
                            type="file"
                            name=""
                            id="upload"
                            className="hidden"
                            multiple
                            onChange={handleImageChange}
                        />
                        {images &&
                            images.map((i, index) => (
                                <div className="image-div" key={index}>
                                    <img
                                        src={i}

                                        alt=""
                                        className="h-[130px] w-[130px] object-cover"
                                    />
                                    <button
                                        onClick={(e) => {
                                            handleRemove(e, index);
                                        }}
                                        className="images-delete-btn"
                                    >
                                        {/* <FontAwesomeIcon icon={faTrash} style={{ color: 'red' }} /> */}
                                    </button>
                                </div>
                            ))}
                    </>
                </Form.Item>
                <Form.Item
                    label="Original Price"
                    name="originalPrice"
                    rules={[{ required: true, message: 'Please input the Original price!' }]}
                >
                    <InputNumber type="number" value={productData?.originalPrice} defaultValue={productData?.originalPrice} onChange={(e) => handleProductNumberChange(e, "originalPrice")} name="originalPrice" />
                </Form.Item>
                <Form.Item
                    label="Discount Price"
                    name="discountPrice"
                    rules={[{ required: true, message: 'Please input the price!' }]}
                >
                    <InputNumber type="number" value={productData?.discountPrice} defaultValue={productData?.discountPrice} onChange={(e) => handleProductNumberChange(e, "discountPrice")} name="discountPrice" />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                >
                    <Input.TextArea value={productData?.description} defaultValue={productData?.description} onChange={handleProductChange} name="description" />
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
                                value={input.key} defaultValue={input.key}
                                onChange={(event) => handleInputChange({ index, event, inputs, setInputs })}
                                style={{ marginRight: '8px', width: '50%' }}
                            />
                            <Input
                                placeholder="Value"
                                name="value"
                                value={input.value} defaultValue={input.value}
                                onChange={(event) => handleInputChange({ index, event, inputs, setInputs })}
                                style={{ marginRight: '8px', width: '50%' }}
                            />
                            {inputs.length > 1 && (
                                <Button type="danger" onClick={() => handleRemoveInput({ index, inputs, setInputs })} style={{ marginBottom: '8px' }}>
                                    Remove
                                </Button>
                            )}
                        </div>
                    ))}
                    <Button type="dashed" onClick={() => handleAddInput({ inputs, setInputs })} style={{ marginBottom: '8px' }}>
                        Add Input
                    </Button>
                </Form.Item>

                {/* Variations */}
                <Form.Item>
                    <Switch checked={variationsEnabled} defaultChecked={variationsEnabled} onChange={(checked) => handleVariationsToggle({ checked, setVariationsEnabled })} />
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
                                    <Input value={variation?.imageColor} defaultValue={variation?.imageColor} onChange={(e) =>
                                        handleVarientInputChange(index, 'imageColor', e.target.value)
                                    } />
                                </Form.Item>
                                <Form.Item
                                    label="Original Price"
                                    name={`variations[${index}].originalPrice`}
                                    rules={[{ required: true, message: 'Please input the variation original price!' }]}
                                >
                                    <InputNumber type="number" value={variation?.originalPrice} defaultValue={variation?.originalPrice} onChange={(e) =>
                                        handleVarientNumberInputChange(e, index, 'originalPrice',)
                                    } />
                                </Form.Item>
                                <Form.Item
                                    label="Discount Price"
                                    name={`variations[${index}].discountPrice`}
                                    rules={[{ required: true, message: 'Please input the variation discount price!' }]}
                                >
                                    <InputNumber type="number" value={variation?.discountPrice} defaultValue={variation?.discountPrice} onChange={(e) =>
                                        handleVarientNumberInputChange(e, index, 'discountPrice')
                                    } />
                                </Form.Item>
                                <Form.Item
                                    label="Stock"
                                    name={`variations[${index}].stock`}
                                    rules={[{ required: true, message: 'Please input the variation stock!' }]}
                                >
                                    <InputNumber value={variation?.stock} defaultValue={variation?.stock} onChange={(e) =>
                                        handleVarientNumberInputChange(e, index, 'stock')
                                    } />
                                </Form.Item>
                                <Form.Item
                                    label="Variation Sku Code"
                                    name="variationskuCode"
                                    rules={[{ required: true, message: 'Please enter sku code' }]}
                                >
                                    <Input value={variation?.SKU} defaultValue={variation?.SKU} onChange={(e) =>
                                        handleVarientInputChange(index, 'SKU', e.target.value)
                                    } />
                                </Form.Item>
                                <Form.Item
                                    label="Image"
                                    name={`variations[${index}].image`}
                                >
                                    {productData?.colorInputs[index]?.image.public_id ? (
                                        <div className="image-div">
                                            <img
                                                className="h-[130px] w-[130px] object-cover"
                                                src={variation.image.url}
                                                alt={`Color ${index + 1}`}
                                            // style={{ width: '100px', height: '100px' }}
                                            />
                                            <button
                                                onClick={(e) => {
                                                    handleDeleteCloudinaryVarieationsImage(
                                                        e,
                                                        variation.image.public_id,
                                                        index,
                                                        edit
                                                    );
                                                }}
                                                className="images-delete-btn"
                                            >
                                                {/* <FontAwesomeIcon icon={faTrash} style={{ color: 'red' }} /> */}
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="mt-2">
                                                <label>
                                                    Varient Image <span className="text-red-500">*</span>
                                                </label>&nbsp;&nbsp;
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleEditImageChange(index, e)}
                                                />
                                            </div>
                                            {variation.image.url && (
                                                <>
                                                    <img
                                                        className="mt-4 mb-3"
                                                        src={variation.image.url}
                                                        alt={`Color ${index + 1}`}
                                                        style={{ width: '100px', height: '100px' }}
                                                    />
                                                </>
                                            )}
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
                        <InputNumber type="number" defaultValue={productData?.noItem} value={productData?.noItem} onChange={(e) => handleProductNumberChange(e, "noItem")} name="noItem" />
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
                        <Input value={productData?.SKU} defaultValue={productData?.SKU} onChange={handleProductChange} name="SKU" />
                    </Form.Item>
                    <Form.Item
                        label="Stock"
                        name="stock"
                        rules={[{ required: true, message: 'Please enter stock' }]}
                    >
                        <InputNumber type="number" value={productData?.stock} defaultValue={productData?.stock} onChange={(e) => handleProductNumberChange(e, "stock")} name="stock" />
                    </Form.Item>
                </div>
                <div className="">
                    <h4>Meta Information</h4>
                    <Form.Item
                        label="Slug"
                        name="slug"
                        rules={[{ required: true, message: 'Please Enter slug' }]}
                    >
                        <Input value={productData?.slug} defaultValue={productData?.slug} onChange={handleProductChange} name="slug" />
                    </Form.Item>
                    <Form.Item
                        label="Meta Title"
                        name="metaTitle"
                        rules={[{ required: true, message: 'Please Enter Meta Title' }]}
                    >
                        <Input value={productData?.metaTitle} defaultValue={productData?.metaTitle} onChange={handleProductChange} name="metaTitle" />
                    </Form.Item>
                    <Form.Item
                        label="Meta Description"
                        name="metaDescription"
                        rules={[{ required: true, message: 'Please enter meta description' }]}
                    >
                        <Input.TextArea value={productData?.metaDescription} defaultValue={productData?.metaDescription} onChange={handleProductChange} name="metaDescription" />
                    </Form.Item>
                </div>
                {/* Submit Button */}
                <Form.Item>
                    <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
                        Update Product
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}

EditCloudKitchen.propTypes = {
    onFinish: PropTypes.func.isRequired,
    productData: PropTypes.object,
    setProductData: PropTypes.func.isRequired
};

export default EditCloudKitchen