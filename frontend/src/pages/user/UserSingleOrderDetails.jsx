import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { server } from '../../server';

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

  return (
    <div>
      <h1>Order Details</h1>
      <p>Order ID: {order._id}</p>
      <p>Status: {order.status}</p>
      <p>Payment Status: {order.paymentInfo.status}</p>
      <p>Total Price: ₹{order.totalPrice}</p>
      {/* Render other order details as needed */}
      <h2>Items:</h2>
      <ul>
        {order.cart.map((item) => (
          <li key={item._id}>
            <p>Name: {item.name}</p>
            <p>Quantity: {item.qty}</p>
            <p>Price: ${item.finalPrice}</p>
            {/* Render other item details as needed */}
          </li>
        ))}
      </ul>
      <h2>Shipping Address:</h2>
      <p>Name: {order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
      <p>Email: {order.shippingAddress.email}</p>
      <p>Mobile: {order.shippingAddress.mobile}</p>
      {/* Render other shipping address details as needed */}
      <h2>User Details:</h2>
      <p>Name: {order.user.name}</p>
      <p>Email: {order.user.email}</p>
      {/* Render other user details as needed */}
    </div>
  )
}

export default UserSingleOrderDetails