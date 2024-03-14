/* eslint-disable no-unused-vars */
import React from 'react';
import sidebar_menu from '../../../constants/sidebar-menu';
import SideBar from '../../../components/Sidebar';

import  { useState } from 'react';
import { Form, Input, Button, DatePicker, Select, Upload, message, Modal } from 'antd';
import { UploadOutlined ,PlusOutlined} from '@ant-design/icons';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import PropTypes from 'prop-types';
import DashboardHeader from '../../../components/DashboardHeader';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const { Option } = Select;
function EditBlog() {
    const [modalVisible, setModalVisible] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const showModal = () => {
        setModalVisible(true);
    };

    const handleOk = () => {
        // Add logic to handle category addition (e.g., API call to add category)
        setModalVisible(false);
        setCategoryName('');
    };

    const handleCancel = () => {
        setModalVisible(false);
    };
    return (
        
        <div className='dashboard-container'>
            <SideBar menu={sidebar_menu} />
            <div className='dashboard-content'>
            <div className="dashboard-header">
              
              <h3>Edit Blog</h3>
              <div className="add-btn">
              <DashboardHeader/>
              
              </div>
          </div>
            <Form name="blogForm" layout="vertical">
            <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please input the title!' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Slug" name="slug" rules={[{ required: true, message: 'Please input the slug!' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Description" name="description">
                <Input.TextArea />
            </Form.Item>
            <Form.Item label="Date Posted" name="datePosted">
                <DatePicker />
            </Form.Item>
            <Form.Item label="Posted By" name="postedBy">
                <Input />
            </Form.Item>
            <Form.Item label="Read Time" name="readTime">
                <Input />
            </Form.Item>
            <Form.Item label="Category" name="category">
                <Select>
                    <Option value="technology">Technology</Option>
                    <Option value="lifestyle">Lifestyle</Option>
                    <Option value="travel">Travel</Option>
                    {/* Add more categories as needed */}
                </Select>
                <Button icon={<PlusOutlined />} onClick={showModal} />
                <Modal
                    title="Add Category"
                    visible={modalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <Form.Item label="Category Name">
                        <Input value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
                    </Form.Item>
                </Modal>
            </Form.Item>
            <Form.Item label="Excerpt" name="excerpt">
                <Input.TextArea />
            </Form.Item>
            
           <Form.Item>
           <CKEditor
            editor={ClassicEditor}
            
        />
           </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
        </Form>
            </div>
        </div>
    );
}
EditBlog.propTypes = {
    onFinish: PropTypes.func.isRequired,
};
export default EditBlog;
