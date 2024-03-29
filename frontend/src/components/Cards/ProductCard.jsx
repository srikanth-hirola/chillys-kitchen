/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Rating from './Rating';
import { Link } from 'react-router-dom';
import { EyeOutlined, ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons';
import useData from '../../customHooks/getName/useData';
import useUrlHandler from '../../customHooks/URLs/useUrlHandler';
import useDetailsPageHandler from '../../customHooks/ProductDetails/useDetailsPageHandler';
import FillHeart from './FillHeart';

const ProductCard = ({ product, key }) => {
    const { getSubCategory } = useData();
    const { useAppendParam } = useUrlHandler();


    const [selectedColor, setSelectedColor] = useState(product?.showInputs ? product?.colorInputs[0] : product);
    const [count, setCount] = useState(1);
    const [soldOut, setSoldOut] = useState(false);
    const [mainImg, setMainImg] = useState([]);
    const [click, setClick] = useState(false);
    const [limited, setLimited] = useState();

    const { incrementCount, decrementCount, addToCartHandler, getOriginalPrice, getDiscountPrice, buyNowProduct } = useDetailsPageHandler({ data: product, click, count, selectedColor, setClick, setCount, setLimited, setMainImg, setSoldOut })

    return (
        <div className="col-md-6 col-lg-3 col-xl-3 col-xxl-3" key={key}>
            <div className="menu-product-card">
                <Link to={`${useAppendParam({ data: [{ param: 'subcat', value: getSubCategory({ data: product?.subCategory, name: "_id" })?.subCategory }, { param: 'product', value: product?.slug }] })}`}>
                    <div className="menu-product-card-img">
                        <img src={product?.mainImage?.url} alt="product" />
                    </div>
                </Link>
                <div className="menu-product-card-text">
                    <div className="title">
                        <h3>{product?.name}</h3>
                    </div>
                    <div className="price">
                        <h3>{product?.discountPrice}<span>{product?.originalPrice}</span></h3>
                    </div>
                    <div className="menu-product-sec">
                        <Rating rating={0} />
                        <div className="product-card-actions">
                            <Link to={`${useAppendParam({ data: [{ param: 'subcat', value: getSubCategory({ data: product?.subCategory, name: "_id" })?.subCategory }, { param: 'product', value: product?.slug }] })}`}> <EyeOutlined style={{ fontSize: '24px', marginRight: '10px' }} /></Link>
                            <ShoppingCartOutlined style={{ fontSize: '24px', marginRight: '10px' }} onClick={(e) => addToCartHandler({ e, id: product?._id })} />
                            {/* <HeartOutlined style={{ fontSize: '24px' }} /> */}
                            <FillHeart click={click} data={product} setClick={setClick} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

ProductCard.propTypes = {
    key: PropTypes.string.isRequired,
    product: PropTypes.object.isRequired
}

export default ProductCard