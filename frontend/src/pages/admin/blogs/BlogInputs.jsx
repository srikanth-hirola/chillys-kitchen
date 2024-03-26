/* eslint-disable no-unused-vars */
import { Button, Select, Modal } from 'antd';
import Form from 'react-bootstrap/Form';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import useAPI from '../../../customHooks/API/useAPI';
import PropTypes from 'prop-types';
import slugify from 'react-slugify';
import JoditEditor from 'jodit-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const { Option } = Select;
const BlogInputs = ({ blogData, setBlogData, onFinish, _id }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const showModal = () => {
        setModalVisible(true);
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    const { getApi, deleteApi, putApi, postApi } = useAPI();
    const [category, setCategory] = useState('');

    const [categoryDropDown, setCategoryDropDown] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { error, data } = await getApi({ endpoint: `/api/v2/blogs/category` })

                if (error) {
                    toast.error(error?.response?.data?.message,{position:'top-right'})
                }
                if (data) {
                    setCategoryDropDown(data?.categories)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchCategories()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const editor = useRef(null);

    const config = useMemo(
        () => (
            {
                readonly: false,
                enableDragAndDropFileToEditor: true,
                uploader: {
                    insertImageAsBase64URI: true,
                },
                controls: {
                    font: {
                        list: {
                            'Roboto Medium,Arial,sans-serif': 'Roboto',
                        },
                    },
                },
            }
        ),
        []
    );

    const handleMultipleImages = (e) => {
        const files = e.target.files;
        const updatedState = [];
        const maxSizeInBytes = 5000 * 1024;

        const processImage = (file, index) => {
            if (file.size <= maxSizeInBytes) {
                const reader = new FileReader();
                reader.onload = () => {
                    const base64Image = reader.result;
                    updatedState[index] = base64Image;

                    if (updatedState.filter(Boolean).length === files.length) {
                        // eslint-disable-next-line no-unsafe-optional-chaining
                        let Images = [...blogData?.large_thumb];
                        let concat = Images.concat(updatedState)
                        setBlogData({ ...blogData, large_thumb: concat });
                    }
                };
                reader.readAsDataURL(file);
            } else {
                toast.message(`File "${file.name}" exceeds the size limit of 200 KB.`,{position:'top-right'});
            }
        };

        for (let i = 0; i < files.length; i++) {
            processImage(files[i], i);
        }
    };

    const handleBlogDataChange = (e) => {
        let updatedState = JSON.parse(JSON.stringify(blogData));

        if (
            typeof e === 'object' &&
            !Array.isArray(e) &&
            e !== null
        ) {
            const { value, name } = e.target;
            updatedState[name] = value;
        } else {
            updatedState.category = e;
        }
        setBlogData(updatedState)
    }

    const handleSlugify = (e) => {
        e.preventDefault();
        if (!blogData?.title) {
            toast.error("Title is required!")
            return;
        }
        const slug = slugify(blogData?.title);
        setBlogData({ ...blogData, slug })
    }

    const handleAddCategory = async (e) => {
        e.preventDefault();
        try {
            const { error, data } = await postApi({ endpoint: '/api/v2/blogs/category', postData: { category } });
            if (error) {
                toast.error(error?.response?.data?.message,{position:'top-right'})
            }
            if (data) {
                let updatedState = [...categoryDropDown];
                updatedState.push({ category });
                setCategoryDropDown(updatedState);
                toast.success("Added Category successfully",{position:'top-right'});
                setModalVisible(false);
                setCategoryName('');
            }
        } catch (e) {
            toast.error(e?.response?.data?.message,{position:'top-right'});
        }
    }

    const handleImageDeleteCloude = (e, id) => {
        e.preventDefault();
        if (window.confirm("uploaded Image will be deleted Permanently!")) {
            handleCloudinaryImageDelete(id, _id)
        }
    }

    const handleCloudinaryImageDelete = async (public_id, _id) => {
        try {
            const { error, data } = await deleteApi({ endpoint: `/api/v2/blogs/delete-Img/${_id}`, postData: { data: { public_id } } })
            if (error) {
                toast.error(error?.response?.data?.message,{position:'top-right'})
            }
            if (data) {
                let updatedState = { ...blogData };
                let images = [...updatedState.large_thumb];
                images = images?.filter((image) => image?.public_id !== public_id)
                updatedState.large_thumb = images;
                setBlogData(updatedState);
                toast.success('Image delete successfully!',{position:'top-right'})
            }
        } catch (error) {
            toast.error(error?.response?.data?.message,{position:'top-right'})
        }
    }

    const handleImageDeleteArray = (e, index) => {
        e.preventDefault();
        let updatedState = { ...blogData };
        let images = [...updatedState.large_thumb];
        images.splice(index, 1);
        updatedState.large_thumb = images;
        setBlogData(updatedState);
    };
    console.log(blogData, "d")
    return (
        <Form name="blogForm" layout="vertical">
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Blog Title</Form.Label>
                <Form.Control
                    name="title"
                    value={blogData.title}
                    onChange={handleBlogDataChange}
                    type="text"
                    placeholder="Blog Title"
                    required
                />
            </Form.Group>
            <br />
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>URL slug</Form.Label>
                <Form.Control
                    name="slug"
                    value={blogData.slug}
                    onChange={handleBlogDataChange}
                    type="text"
                    placeholder="URL slug"
                    required
                />
                <Button
                    variant="outline-primary"
                    className="update_button mt-3"
                    type="submit"
                    name="sub"
                    onClick={handleSlugify}
                >Generate</Button>
            </Form.Group>
            <br />
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Meta Title</Form.Label>
                <Form.Control
                    name="metaTitle"
                    value={blogData.metaTitle}
                    onChange={handleBlogDataChange}
                    type="text"
                    placeholder="Meta Title"
                    required
                />
            </Form.Group>
            <br />
            <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
            >
                <Form.Label>Meta Description</Form.Label>
                <Form.Control
                    placeholder="Meta Description"
                    as="textarea"
                    rows={5}
                    name="metaDescription"
                    value={blogData.metaDescription}
                    onChange={handleBlogDataChange}
                    required
                />
            </Form.Group>
            <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
            >
                <Form.Label>Post Description</Form.Label>
                <Form.Control
                    placeholder="Post Description"
                    as="textarea"
                    rows={5}
                    name="blogDescription"
                    value={blogData.blogDescription}
                    onChange={handleBlogDataChange}
                    required
                />
            </Form.Group>
            <br />
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Read Time</Form.Label>
                <Form.Control
                    name="read_time"
                    value={blogData.read_time}
                    onChange={handleBlogDataChange}
                    type="text"
                    placeholder="Read Time"
                    required
                />
            </Form.Group>
            <br />
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Category</Form.Label>
                <div className='row'>
                    <div className='col-6'>
                            {/* <select value={blogData?.category} className='category-select-dropDown' name="category" onChange={handleBlogDataChange}>
                                <option value='' disabled>Select a Category</option>
                                {categoryDropDown?.map((category, index) => (
                                    <option key={index} value={category?.category}>{category?.category}</option>
                                ))}
                            </select> */}
                            <Select  value={blogData?.category} className='category-select-dropDown' name="category" onChange={handleBlogDataChange} width={200} >
    <Option value='' disabled>Select a Category</Option>
    {categoryDropDown?.map((category, index) => (
        <Option key={index} value={category?.category}>{category?.category}</Option>
    ))}
</Select>

                    </div>
                    <div className='col-6 d-flex justify-between gap-2'>
                        <Form.Control
                            name="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            type="text"
                            placeholder="Add new Category"

                        />
                        <button
                            className="update_button btn btn-sm btn-primary"
                            onClick={handleAddCategory}
                        >ADD</button>
                    </div>
                </div>

            </Form.Group>
            <br />
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Excerpt</Form.Label>
                <Form.Control
                    name="excerpt"
                    value={blogData.excerpt}
                    onChange={handleBlogDataChange}
                    type="text"
                    placeholder="Excerpt"
                    required
                />
            </Form.Group>
            <br />
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Upload Image</Form.Label>
                <Form.Control
                    type="file"
                    size="lg"
                    name="image"
                    accept=".png, .jpg, .jpeg"
                    onChange={handleMultipleImages}
                    multiple
                />
                <div className='blog-post-image-formInput-parent flex flex-wrap gap-3 my-3'>
                    {blogData?.large_thumb?.length > 0 && blogData?.large_thumb?.map((image, index) => (
                        <div className='blog-img-flex relative' key={index}>
                            <div className='blog-post-image-formInput w-[100px] h-[60px] border-1 rounded'>
                                <img src={image?.public_id ? image?.url : image} alt='blog-post' className='w-full h-full object-cover' />
                            </div>
                            <button className='delete-btn absolute top-0 bg-red-200 rounded-br p-1' onClick={(e) => { image?.public_id ? handleImageDeleteCloude(e, image?.public_id) : handleImageDeleteArray(e, index) }}>
                                {/* <FontAwesomeIcon icon={faTrash} style={{ color: "#e10909", fontSize: "15px" }} /> */}
                            </button>
                        </div>
                    ))}
                </div>
            </Form.Group>
            <br />
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Page Content</Form.Label>
                <JoditEditor
                    ref={editor}
                    value={blogData.body}
                    config={config}
                    onBlur={(newContent) => {
                        setBlogData({ ...blogData, body: newContent });
                    }}
                />
            </Form.Group>
            {/* <button onClick={(e) => onFinish(e)}>Submit</button> */}
            <Button type="primary"  onClick={(e) => onFinish(e)}>
                               <Link className='text-decoration-none' to='/add-blogs'> Submit</Link>
                            </Button>
        </Form>
    )
}

BlogInputs.propTypes = {
    onFinish: PropTypes.func.isRequired,
    blogData: PropTypes.object,
    setBlogData: PropTypes.func.isRequired,
    _id: PropTypes.string
};

export default BlogInputs