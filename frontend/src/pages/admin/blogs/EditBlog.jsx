/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import sidebar_menu from '../../../constants/sidebar-menu';
import SideBar from '../../../components/Sidebar';

import { useState } from 'react';
import { Form, Input, Button, DatePicker, Select, Upload, message, Modal } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import DashboardHeader from '../../../components/DashboardHeader';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import BlogInputs from './BlogInputs';
import { useParams } from 'react-router';
import useAPI from '../../../customHooks/API/useAPI';
const { Option } = Select;
function EditBlog() {
    const { edit } = useParams();
    const { putApi, getApi } = useAPI();
    const [blogEdit, setBlogEdit] = useState({});
    const [pagefound, setPageFound] = useState('');
    const [isLoading, setLoading] = useState(false);

    let API = `/api/v2/blogs/blog/edit/${edit}`;

    const fetchBlog = async (url) => {
        try {
            setLoading(false);
            const { data } = await getApi({ endpoint: url })
            if (data) {
                if (data === '') {
                    setPageFound('Notfound');
                } else {
                    setBlogEdit({ ...data });
                }
            }
        } catch (e) {
            alert(e?.response?.data?.message);
        } finally {
            setLoading(true)
        }
    };

    useEffect(() => {
        fetchBlog(API);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const submit = async () => {

        try {
            setLoading(true)
            const { error, data } = await putApi({ endpoint: `/api/v2/blogs/update/${edit}`, postData: { blogEdit } })
            if (data) {
                alert("Updated Blog Successfully!")
            }
            if (error) {
                alert(error?.response?.data?.message)
            }
        } catch (e) {
            alert(e?.response?.data?.message)
        } finally {
            setLoading(false)
        }
    };
    return (

        <div className='dashboard-container'>
            <SideBar menu={sidebar_menu} />
            <div className='dashboard-content'>
                <div className="dashboard-header">
                    <h3>Edit Blog</h3>
                    <div className="add-btn">
                        <DashboardHeader />
                    </div>
                </div>
                <BlogInputs blogData={blogEdit} onFinish={submit} setBlogData={setBlogEdit} _id={edit} />
            </div>
        </div>
    );
}
EditBlog.propTypes = {
    onFinish: PropTypes.func.isRequired,
};
export default EditBlog;
