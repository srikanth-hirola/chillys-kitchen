/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import { Link } from 'react-router-dom';
import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { addTocart, removeFromCart } from '../redux/actions/cart';
import CartCard from '../components/Cards/CartCard';

const { Search } = Input;
const Cart = () => {

    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    const { cart } = useSelector((state) => state.cart);
    const [cartData, setCartData] = useState(cart);
    const dispatch = useDispatch();

    const removeFromCartHandler = (data) => {
        dispatch(removeFromCart(data));
        const newData = cart.filter((i) => i.attrId !== data.attrId);
        setCartData(newData)
    };

    const totalPrice = cart?.reduce((acc, item) => {
        return acc + item.qty * item?.selectedColor?.discountPrice;
    }, 0);

    const quantityChangeHandler = (data) => {
        let curPrice = Number(data?.selectedColor?.discountPrice) * data?.qty;
        const updatedData = {
            ...data,
            finalPrice: curPrice
        }
        dispatch(addTocart(updatedData));
    };

    // useEffect(() => {
    //     setCartData(cart)
    // }, [])
    const deliveryCharges = 50; // Example delivery charges
    const couponDiscount = 10; // Example coupon discount
    const grandTotal = totalPrice + deliveryCharges - couponDiscount;

    return (
        <>
            <Navbar />
            <div className="cart-page">
                <div className="cart-page-sec">
                    <div className="container">
                        <div className="cart-title">
                            <h3>Cart</h3>
                        </div>
                        <div className="row mx-auto">
                            <div className="col-md-12">
                                <div className="cart-body">
                                    <div className="cart-items">
                                        <div className="header">
                                            <div className="header-item product">Product</div>
                                            <div className="header-item quantity">Quantity</div>
                                            <div className="header-item price">Price</div>
                                            <div className="header-item subtotal">Subtotal</div>
                                            <div className="header-item subtotal"></div>
                                        </div>
                                        {cartData?.map((cartItem, i) => (
                                            <React.Fragment key={i}>
                                                <CartCard data1={cartItem}
                                                    quantityChangeHandler={quantityChangeHandler}
                                                    removeFromCartHandler={removeFromCartHandler} />
                                            </React.Fragment>
                                        ))}
                                    </div>
                                   <div className="row">
                                    <div className="col-md-8">
                                            <div className="continue-shopping">
                                                <Link to=''>Continue Shopping</Link>
                                            </div>
                                    </div>
                                    <div className="col-md-4">
                                    <div className="payment-summary">
                                        <h4>Bill Details</h4>
                                        <p>Total Items: <span>{cartData.length}</span></p>
                                        <p>Delivery Charges: ₹ <span>{deliveryCharges}</span></p>
                                        <p>Coupon Discount: ₹ <span>{couponDiscount}</span></p>
                                        <strong>Grand Total: ₹ <span>{grandTotal}</span></strong>
                                        <div className="px-5 mb-3 bg-[#fa8232] rounded">
                                    
                                    {/* checkout buttons */}
                                    <Link to="/checkout">
                                        <div
                                            className={`h-[45px] flex items-center justify-center w-[100%] rounded-[5px]`}
                                        >
                                            <h1 className=" text-[18px] mb-0 font-[600] text-white"  >
                                                Checkout Now (₹ {totalPrice})
                                            </h1>
                                        </div>
                                    </Link>
                                </div>
                                    </div>
                                    </div>
                                   </div>
                                   
                                </div>

                            </div>

                            {/* <div className="col-md-6">
                                <div className="cart-checkout">
                                    <h5>Have a coupon?</h5>
                                    <p>Add your code for an instant cart discount</p>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Input
                                            placeholder="Search"
                                            prefix={<SearchOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
                                            style={{ width: '80%' }}
                                        />
                                        <Button type="primary" style={{ marginLeft: '8px' }}>
                                            Search
                                        </Button>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Cart