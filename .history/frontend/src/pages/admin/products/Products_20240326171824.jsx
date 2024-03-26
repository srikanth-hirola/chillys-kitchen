/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Table, Tag, Button } from 'antd';
import { EditOutlined, DeleteOutlined,PlusOutlined } from '@ant-design/icons';
import SideBar from '../../../components/Sidebar';
import sidebar_menu from '../../../constants/sidebar-menu';
import useAPI from '../../../customHooks/API/useAPI';
import { Link } from 'react-router-dom';
import DashboardHeader from '../../../components/DashboardHeader';
function ProductList() {

  const { getApi, deleteApi } = useAPI();
  const [products, setAllProducts] = useState([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        let { data } = await getApi({ endpoint: '/api/v2/product/get-published-products' })
        setAllProducts(data.products)
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
console.log(first)
  const handleDeleteProduct = async ({ e, id }) => {
    e.preventDefault();
    console.log(id)
    const { error } = deleteApi({ endpoint: `/api/v2/product/delete-shop-product/${id}`, });
    if (error) {
      alert(error?.response?.data?.message)
    } else {
      alert("Deleted Product Successfully");
      setAllProducts((prev) => prev.filter((item) => item?._id !== id))
    }
  }


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
      title: 'SKU',
      dataIndex: 'SKU',
      key: 'SKU',
      render: text => <a>{text}</a>,
    },

    {
      title: 'Edit',
      key: 'action',
      render: (data) => (
        <>
          <Link to={`/products/${data?._id}`}><EditOutlined /></Link>
        </>
      ),
    },
    {
      title: 'Delete',
      key: 'action',
      render: (data) => (
        <Button type="button" onClick={(e) => handleDeleteProduct({ e, id: data?._id })} icon={<DeleteOutlined />} />
      ),
    },
  ];
  return (
    <div className='dashboard-container'>
      <SideBar menu={sidebar_menu} />
      <div className='dashboard-content'>
      <div className="dashboard-header">
                    <h3>Products List</h3>
                    <div className="add-btn">
                        <DashboardHeader />
                        <div >
                            <Button type="primary" icon={<PlusOutlined />}>
                               <Link className='text-decoration-none' to='/add-product'> Add Product</Link>
                            </Button>
                        </div>
                    </div>
                </div>
        <Table
          dataSource={products}
          columns={columns}
          bordered={false}
          pagination={false}
        />
      </div>
    </div>
  );
}

export default ProductList;
