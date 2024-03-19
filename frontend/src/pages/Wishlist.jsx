/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import { Link } from 'react-router-dom';
import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import WishListCard from '../components/Cards/WishListCard';
import { removeFromWishlist } from '../redux/actions/wishlist';

const { Search } = Input;
const Wishlist = () => {
    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    const { wishlist } = useSelector((state) => state.wishlist)
    const [cartData, setCartData] = useState(wishlist);
    const dispatch = useDispatch();

    const removeFromWishlistHandler = (data) => {
        dispatch(removeFromWishlist(data));
    };
    useEffect(() => {
        setCartData(wishlist)
    }, [wishlist])



    return (
        <>
            <Navbar />
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
                                        </div>
                                        {cartData?.map((cartItem, i) => (
                                            <React.Fragment key={i}>
                                                <WishListCard data1={cartItem}
                                                    removeFromCartHandler={removeFromWishlistHandler}
                                                />
                                            </React.Fragment>
                                        ))}
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Wishlist