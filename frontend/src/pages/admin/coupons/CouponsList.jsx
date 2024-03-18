/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import SideBar from '../../../components/Sidebar'
import sidebar_menu from '../../../constants/sidebar-menu'
import DashboardHeader from '../../../components/DashboardHeader'
import { Form } from 'react-router-dom'
import { Button, Modal, Table } from 'antd'

const CouponsList = () => {
    const [modalVisible, setModalVisible] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [editingCoupon, setEditingCoupon] = useState(null);
    const showModal = (coupon) => {
        setEditingCoupon(coupon);
        setModalVisible(true);
      };
    
      const handleOk = () => {
        setModalVisible(false);
        setEditingCoupon(null);
      };
    
      const handleCancel = () => {
        setModalVisible(false);
        setEditingCoupon(null);
      };
    
      const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Discount Percentage',
          dataIndex: 'discountPercentage',
          key: 'discountPercentage',
        },
        {
          title: 'Min Amount',
          dataIndex: 'minAmount',
          key: 'minAmount',
        },
        {
          title: 'Max Amount',
          dataIndex: 'maxAmount',
          key: 'maxAmount',
        },
        {
          title: 'Selected Products',
          dataIndex: 'selectedProducts',
          key: 'selectedProducts',
        },
        {
          title: 'Actions',
          key: 'actions',
          render: (text, record) => (
            <Button onClick={() => showModal(record)}>Edit</Button>
          ),
        },
      ];
  return (
    <>
 <div className='dashboard-container'>
        <SideBar menu={sidebar_menu}/>
         <div className='dashboard-content'>
            <div className="dashboard-header">
              
              <h3>Category List</h3>
              <div className="add-btn">
              <DashboardHeader/>
              <Button
        type="primary"
        onClick={() => {
          setEditingCoupon(null);
          setModalVisible(true);
        }}
      >
        Add Coupon
      </Button>
              </div>
          </div>
        <div className="coupon-code">
          <div className="coupons-list-container">
        <Table dataSource={coupons} columns={columns} />
      <Modal
        title={editingCoupon ? 'Edit Coupon' : 'Add Coupon'}
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form>
         <div className="formfiels">
         <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" defaultValue={editingCoupon?.name} />
         </div>
      <div className="formfiels">
      <label htmlFor="discountPercentage">Discount Percentage:</label>
          <input
            type="number"
            id="discountPercentage"
            name="discountPercentage"
            defaultValue={editingCoupon?.discountPercentage}
          />
      </div>
          
        <div className="formfiels">
        <label htmlFor="minAmount">Min Amount:</label>
          <input
            type="number"
            id="minAmount"
            name="minAmount"
            defaultValue={editingCoupon?.minAmount}
          />
        </div>
        <div className="formfiels">
        <label htmlFor="maxAmount">Max Amount:</label>
          <input
            type="number"
            id="maxAmount"
            name="maxAmount"
            defaultValue={editingCoupon?.maxAmount}
          />
        </div>
          <div className="formfiels">
          <label htmlFor="selectedProducts">Selected Products:</label>
          <input
            type="text"
            id="selectedProducts"
            name="selectedProducts"
            defaultValue={editingCoupon?.selectedProducts}
          />
          </div>
        </form>
      </Modal>
        </div>
        </div>
          </div>
          </div>
    </>
  )
}

export default CouponsList