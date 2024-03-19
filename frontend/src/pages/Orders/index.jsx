/* eslint-disable no-unused-vars */
import React from 'react';
import SideBar from '../../components/Sidebar';
import sidebar_menu from '../../constants/sidebar-menu';
import { Table, Tag, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import DashboardHeader from '../../components/DashboardHeader';
function Orders() {
    const dataSource = [
  {
    key: '1',
    name: 'John Doe',
    age: 32,
    address: 'New York',
    tags: ['developer', 'react'],
  },
  {
    key: '2',
    name: 'Jane Smith',
    age: 28,
    address: 'Los Angeles',
    tags: ['designer', 'ui/ux'],
  },
];
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <>
        {tags.map(tag => (
          <Tag color="blue" key={tag}>
            {tag}
          </Tag>
        ))}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: () => (
      <Button type="link" icon={<PlusOutlined />} />
    ),
  },
];
    return (
        <div className='dashboard-container'>
            <SideBar menu={sidebar_menu} />
            
            <div className='dashboard-content'>
            <div className="dashboard-header">
                    <h3>All Orders</h3>
                    <div className="add-btn">
                        <DashboardHeader />
                    </div>
                </div>
                <h3>orders</h3>
                <Table
      dataSource={dataSource}
      columns={columns}
      bordered={false}
      pagination={false}
    />
            </div>
        </div>
    );
}

export default Orders;
