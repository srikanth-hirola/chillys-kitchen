/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import SideBar from '../../../components/Sidebar'
import sidebar_menu from '../../../constants/sidebar-menu'
import DashboardHeader from '../../../components/DashboardHeader'
import { Form } from 'react-router-dom'
import { Button, Modal, Table, message } from 'antd'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { server } from '../../../server'
import toast from 'react-hot-toast'

const CouponsList = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [editingCoupon, setEditingCoupon] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [coupouns, setCoupouns] = useState([]);
  const [name, setName] = useState("");
  const [minAmount, setMinAmout] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);
  const [value, setValue] = useState(null);
  const { seller } = useSelector((state) => state.seller);

  useEffect(() => {
    console.log(seller, "Seller")
    if (seller?._id) {
      setIsLoading(true);
      axios
        .get(`${server}/coupon/get-coupon/${seller?._id}`, {
          withCredentials: true,
        })
        .then((res) => {
          setIsLoading(false);
          console.log(res.data.couponCodes, "coupans")
          setCoupouns(res.data.couponCodes);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }

  }, [seller, seller?._id]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${server}/coupon/delete-coupon/${id}`, { withCredentials: true }).then((res) => {
        toast.success("Coupon code deleted succesfully!",{position:'top-right'})
      })
      setTimeout(() => {
        window.location.reload();
      }, [2000])
    } catch (error) {
      toast.error(error?.response?.data?.message,{position:'top-right'})
    }
  };

  const showModal = (coupon) => {
    setMinAmout(coupon?.minAmount);
    setMaxAmount(coupon?.maxAmount)
    setValue(coupon?.value);
    setName(coupon?.name)
    setEditingCoupon(coupon);
    setModalVisible(true);
  };

  const handleOk = async () => {

    await axios
      .post(
        `${server}/coupon/create-coupon-code`,
        {
          name,
          minAmount,
          maxAmount,
          value,
          shopId: seller._id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setModalVisible(false);
        setEditingCoupon(null);
        toast.success("Coupon code created successfully!",{position:'top-right'});
        setTimeout(() => {
          window.location.reload();
        }, [2000])
      })
      .catch((error) => {
        toast.error(error.response.data.message,{position:'top-right'});
      });

  };


  const handleUpdate = async () => {
    const id = editingCoupon?._id;
    if (id) {
      await axios
        .put(
          `${server}/coupon/update-coupon/${id}`,
          {
            name,
            minAmount,
            maxAmount,
            value,
            shopId: seller._id,
          },
          { withCredentials: true }
        )
        .then((res) => {
          toast.success("Coupon code updated successfully!",{position:'top-right'});
          setModalVisible(false);
          setEditingCoupon(null);
          setTimeout(() => {
            window.location.reload();
          }, [2000])
        })
        .catch((error) => {
          toast.error(error.response.data.message,{position:'top-right'});
        });
    } else {
      toast.error("Coupan is not selected!",{position:'top-right'})
    }


  };

  const handleCancel = () => {
    if (editingCoupon) {
      console.log("Editing")
      setMinAmout(null);
      setMaxAmount(null)
      setValue(null);
      setName("")
    }
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
      dataIndex: 'price',
      key: 'price',
      render: (text, record) => (
        <span>
          {record?.value} %
        </span>
      ),
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
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <>
          <div className='d-flex'>
          <Button className='mr-1' onClick={() => showModal(record)}>Edit</Button>
          <Button onClick={() => handleDelete(record?._id)}>Delete</Button>
          </div>
        </>
      ),
    },
  ];
  return (
    <>
      <div className='dashboard-container'>
        <SideBar menu={sidebar_menu} />
        <div className='dashboard-content'>
          <div className="dashboard-header">
            <h3>Category List</h3>
            <div className="add-btn">
              <DashboardHeader />
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
              <Table dataSource={coupouns} columns={columns} />
              <Modal
                title={editingCoupon ? 'Edit Coupon' : 'Add Coupon'}
                visible={modalVisible}
                onOk={editingCoupon ? handleUpdate : handleOk}
                onCancel={handleCancel}
              >
                <form>
                  <div className="formfiels">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={name} required onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="formfiels">
                    <label htmlFor="discountPercentage">Discount Percentage:</label>
                    <input
                      type="number"
                      id="discountPercentage"
                      name="value"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      required
                    />
                  </div>

                  <div className="formfiels">
                    <label htmlFor="minAmount">Min Amount:</label>
                    <input
                      type="number"
                      id="minAmount"
                      name="minAmount"
                      value={minAmount}
                      onChange={(e) => setMinAmout(e.target.value)}
                    />
                  </div>
                  <div className="formfiels">
                    <label htmlFor="maxAmount">Max Amount:</label>
                    <input
                      type="number"
                      id="maxAmount"
                      name="maxAmount"
                      value={maxAmount}
                      onChange={(e) => setMaxAmount(e.target.value)}
                    />
                  </div>
                  {/* <div className="formfiels">
                    <label htmlFor="selectedProducts">Selected Products:</label>
                    <input
                      type="text"
                      id="selectedProducts"
                      name="selectedProducts"
                      defaultValue={editingCoupon?.selectedProducts}
                    />
                  </div> */}
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