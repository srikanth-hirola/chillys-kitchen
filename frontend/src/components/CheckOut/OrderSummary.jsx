/* eslint-disable no-unused-vars */
import { Form, Input, Button, message } from "antd";
const { Item } = Form;
import PropTypes from 'prop-types'
import CheckoutProductCard from "../Cards/CheckoutProductCard";
import { useDispatch, useSelector } from "react-redux";
import { addTocart, removeFromCart } from "../../redux/actions/cart";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../server";
import { useNavigate } from "react-router";

const OrderSummary = () => {
    const { cart } = useSelector((state) => state.cart);
    const [cartData, setCartData] = useState(cart);
    console.log(cartData, "cartData")
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [couponCode, setCouponCode] = useState('');
    const [couponCodeData, setCouponCodeData] = useState(null);
    const [discountPrice, setDiscountPrice] = useState(null);
    const [showCoupan, setCoupan] = useState(true);
    const [couponRefTotal, setCoupanRefTotal] = useState(0);
    const [totalPriceFinal, setTotalPriceFinal] = useState(0);

    const removeFromCartHandler = (data) => {
        dispatch(removeFromCart(data));
        const newData = cart.filter((i) => i.attrId !== data.attrId);
        setCartData(newData)
    };

    useEffect(() => {
        const totalPrice = cart?.reduce((acc, item) => {
            return acc + item.qty * item?.selectedColor?.discountPrice;
        }, 0);
        setTotalPriceFinal(totalPrice)
    }, [cart])



    const quantityChangeHandler = (data) => {

        let curPrice = Number(data?.selectedColor?.discountPrice) * data?.qty;
        const updatedData = {
            ...data,
            finalPrice: curPrice
        }
        dispatch(addTocart(updatedData));
    };

    const handleSubmit = async (e, totalPrice) => {
        e.preventDefault();
        const name = couponCode;

        await axios.get(`${server}/coupon/get-coupon-value/${name}`).then((res) => {
            const shopId = res.data.couponCode?.shopId;
            const couponCodeValue = res.data.couponCode?.value;
            if (res.data.couponCode !== null) {
                const isCouponValid =
                    cartData && cartData.filter((item) => item.shopId === shopId);

                if (isCouponValid.length === 0) {
                    message.error('Coupon code is not valid for this shop');
                    setCouponCode('');
                } else {
                    // const eligiblePrice = isCouponValid.reduce(
                    //   (acc, item) => acc + item.qty * item.discountPrice,
                    //   0
                    // );
                    const eligiblePrice = totalPrice;

                    if (eligiblePrice <= res.data.couponCode?.maxAmount && eligiblePrice >= res.data.couponCode?.minAmount) {
                        const discountPrice = (eligiblePrice * couponCodeValue) / 100;

                        setDiscountPrice(discountPrice.toFixed(2));
                        setCouponCodeData(res.data.couponCode);
                        setCouponCode('');
                        setTotalPriceFinal(Number(totalPrice) - Number(discountPrice))
                        setCoupanRefTotal(Number(totalPrice) - Number(discountPrice))
                    } else {
                        message.error('Coupon is not applicable!')
                    }


                }
            }
            if (res.data.couponCode === null) {
                message.error("Coupon code doesn't exists!");
                setCouponCode('');
            }
        });
    };

    const handleCoupanFinal = (total) => {
        const discountPercentenge = couponCodeData ? discountPrice : '';

        const totalPriceCoupan = couponCodeData
            ? (total - discountPercentenge).toFixed(2)
            : (total);

        return totalPriceCoupan
    }


    const discountPercentenge = couponCodeData ? discountPrice : '';

    const paymentSubmit = (e) => {
        e.preventDefault();
        let finalData = {
            ...cartData,
            totalPrice: totalPriceFinal,
            discountPrice: discountPercentenge
        }
        localStorage.setItem('latestOrder', JSON.stringify(finalData));
        navigate('/payment');
    };

    return (
        <div className="col-md-5">
            <div className="order-summary">
                <div className="orders">
                    <div className="title">
                        <h4>Order summary</h4>
                    </div>
                    {cartData?.map((cartItem, i) => (
                        <React.Fragment key={i}>
                            <CheckoutProductCard data1={cartItem}
                                quantityChangeHandler={quantityChangeHandler}
                                removeFromCartHandler={removeFromCartHandler} />
                        </React.Fragment>
                    ))}
                </div>
                {/* Coupon Code Input */}
                <div className="coupon-section">
                    <h4>Apply Coupon</h4>
                    <Form layout="horizontal" onFinish={(e) => handleSubmit(e, couponRefTotal)}>
                        <Item>
                            <Input
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                                placeholder="Enter coupon code"
                            />
                        </Item>
                        <Item>
                            <Button >Apply</Button>
                        </Item>
                    </Form>
                </div>
                {/* Total Bill Section */}
                <div className="total-bill-section">
                    <h4>Total Bill</h4>
                    <div className="bill-details">
                        <div className="name">Total Products</div>
                        <div className="value">{cartData?.length}</div>
                    </div>
                    <div className="bill-details">
                        <div className="name">Product Price</div>
                        {/* <div className="value">₹ {totalPrice}</div> */}
                    </div>
                    <div className="bill-details">
                        <div className="name">Discount Price</div>
                        <div className="value">- {discountPercentenge ? `₹` + discountPercentenge.toString() : null}</div>
                    </div>
                    <div className="bill-details">
                        <div className="name">Total Amount</div>
                        <div className="value">₹ {totalPriceFinal}</div>
                    </div>
                    <Button type="primary" block>Final Checkout</Button>
                </div>
            </div>
        </div>
    )
}

OrderSummary.propTypes = {
    quantity: PropTypes.number.isRequired,
    setQuantity: PropTypes.func.isRequired,
    cartData: PropTypes.object
}

export default OrderSummary