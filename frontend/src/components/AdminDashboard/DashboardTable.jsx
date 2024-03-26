import React from 'react';
import { Table,Space } from 'antd';

const columns = [
  {
    title: 'Order Id',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Product',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Order Date',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Price',
    dataIndex: 'Price',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Payment',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Status',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

const App = () => <Table columns={columns} dataSource={data} />;

const DashboardTable = () => {
  return (
    <>
   <div className='Dashboard-table-component-parent'>
   <div className='Dashboard-table-Header'>
        <div className='Dashboard-table-Header-left'>
            <h5>Latest Orders</h5>
        </div>
        <div className='Dashboard-table-Header-right'>
        <p>Customize</p>
        <p>Filter</p>
        <p>Export</p>
        </div>
    </div>
      <App />
   </div>
    </>
  );
};

export default DashboardTable;
