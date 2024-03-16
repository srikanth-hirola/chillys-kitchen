/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import { Link } from 'react-router-dom';
import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Search } = Input;
const Wishlist = () => {
    const [cartItems, setCartItems] = useState([
        { id: 1, title: 'Product 1', price: 10, quantity: 2, image: '/images/products/cart-img.png' },
        { id: 2, title: 'Product 2', price: 20, quantity: 1, image: '/images/products/cart-img.png' },
        { id: 3, title: 'Product 3', price: 15, quantity: 3, image: '/images/products/cart-img.png' }
    ]);

    const incrementQuantity = (id) => {
        setCartItems(cartItems.map(item => {
            if (item.id === id) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        }));
    };

    const decrementQuantity = (id) => {
        setCartItems(cartItems.map(item => {
            if (item.id === id && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        }));
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

  return (
    <>
    <Navbar/>
        <div className="cart-page">
            <div className="cart-page-sec">
                <div className="container">
                    <div className="cart-title">
                        <h3>Wishlist</h3>
                    </div>
                   <div className="row ">
                    <div className="col-md-11 m-auto">
                    <div className="cart-body">
                    <div className="cart-items">
                <div className="header">
                    <div className="header-item product">Product</div>
                    <div className="header-item quantity">Quantity</div>
                    <div className="header-item price">Price</div>
                    <div className="header-item subtotal">Subtotal</div>
                </div>
                {cartItems.map(item => (
                    <div className="cart-item" key={item.id}>
                        <div className="product">
                            <img src={item.image} alt={item.title} />
                            <div className="product-details">
                                <div className="title">{item.title}</div>
                                <div className="price">
                                    <Link to=''>Remove</Link>
                                </div>
                            </div>
                        </div>
                        <div className="quantity">
                            <button onClick={() => decrementQuantity(item.id)}>-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => incrementQuantity(item.id)}>+</button>
                        </div>
                        <div className="subtotal">{item.price * item.quantity}</div>
                        <div className="total">{calculateSubtotal()}</div>
                    </div>
                ))}
            </div>
           
                    </div>
                    </div>
                    
                   </div>
                </div>
            </div>
        </div>
    <Footer/>
    </>
  )
}

export default Wishlist