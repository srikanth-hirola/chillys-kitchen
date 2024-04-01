import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { server } from '../../server';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

const UserSingleOrderDetails = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);

    const fetchOrderById = async (id) => {
        try {
            const response = await axios.get(`${server}/order/get-orderById/${id}`);
            setOrder(response.data.order)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchOrderById(id);
    }, [id]);

    if (!order) {
        return <div>Loading...</div>; // Display a loading message while waiting for data
      }
console.log("order",order)
  return (
    <div className='orders-main' >
    <Navbar/>
     <div className="container">
     <h1>Order Details</h1>
     <div className="order-details">
     <p><pre>Order ID: </pre><span>{order._id}</span></p>
      <p><pre>Status:</pre> <span>{order.status}</span></p>
      <p><pre>Payment Status:</pre> <span>{order.paymentInfo.status}</span></p>
      <p><pre>Total Price:</pre> <span>₹{order.totalPrice}</span></p>
     </div>
      {/* Render other order details as needed */}
      <h2>Items:</h2>
      <ul className='orders-main-lis'>
        {order.cart.map((item) => (
          <li key={item._id}>
            <img src={item.mainImage.url} alt="" />
           <div className="order-content">
           <h3>{item.name}</h3>
           <p>{item.qty}</p>
           <p>{item.finalPrice}</p>
           </div>
        
            {/* Render other item details as needed */}
          </li>
        ))}
      </ul>
      <h2>Shipping Address:</h2>
      <div className="ship-add">
      <p><pre>Name:</pre> <span>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</span></p>
      <p><pre>Email:</pre> <span>{order.shippingAddress.email}</span></p>
      <p><pre>Mobile:</pre><span> {order.shippingAddress.mobile}</span></p>
      <p><pre>Area:</pre><span> {order.shippingAddress.areaName}</span></p>
      <p><pre>Pincode:</pre><span> {order.shippingAddress.pincode}</span></p>
      {/* Render other shipping address details as needed */}
      </div>
      
     </div>
    <Footer/>
    </div>
  )
}

export default UserSingleOrderDetails