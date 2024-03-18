/* eslint-disable no-unused-vars */
import React from 'react';
import sidebar_menu from '../../../constants/sidebar-menu';
import SideBar from '../../../components/Sidebar';

import { useState } from 'react';
import { Form, Input, Button, DatePicker, Select, Upload, message, Modal } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';

import DashboardHeader from '../../../components/DashboardHeader';

import BlogModal from '../../../utils/useStateModals/BlogModal';
import BlogInputs from './BlogInputs';
import useAPI from '../../../customHooks/API/useAPI';


function AddBlog() {
    const { postApi } = useAPI();
    //blog states
    const [isLoading, setLoading] = useState(false);
    const [blogData, setBlogData] = useState(BlogModal)
    //blog states

    const submit = async () => {

        try {
            setLoading(true)
            const { error, data } = await postApi({ endpoint: "/api/v2/blogs/compose", postData: { blogData } })
            if (data) {
                alert("Published Blog Successfully!")
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
                    <h3>Add Blog</h3>
                    <div className="add-btn">
                        <DashboardHeader />
                    </div>
                </div>
                <BlogInputs blogData={blogData} onFinish={submit} setBlogData={setBlogData} />
            </div>
        </div>
    );
}
// AddBlog.propTypes = {
//     onFinish: PropTypes.func.isRequired,
// };
export default AddBlog;
