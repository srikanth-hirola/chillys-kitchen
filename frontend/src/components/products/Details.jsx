/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from 'prop-types';
import Rating from "../Cards/Rating";
import useData from "../../customHooks/getName/useData";
import Sku from "./DetailsComponents/Sku";
import Price from "./DetailsComponents/Price";
import VarientSelect from "./DetailsComponents/VarientSelect";
import Counter from "./DetailsComponents/Counter";
import AddToCart from "./DetailsComponents/AddToCart";
import WishList from "./DetailsComponents/WishList";

const Details = ({ productData, selectedColor, soldOut, limited, getOriginalPrice, getDiscountPrice, setCount, setLimited, setMainImg, setSelectedColor, count, incrementCount, decrementCount, addToCartHandler, click, setClick }) => {
  console.log(productData, "HE")
  const { getSubCategory } = useData();



  return (
    <>
      <div className="product-details-sec">
        <div className="product-details-main">
          <h3>{productData?.name?.toUpperCase()}</h3>
          <ul>
            <li>
              <Sku sku={selectedColor?.SKU} />
            </li>
            <li>
              {/* <StockAvailability soldOut={soldOut} limited={limited} /> */}
              Category<span>{getSubCategory({ data: productData?.subCategory, name: "_id" })?.subCategory}</span>
            </li>
          </ul>
          <Rating rating={0} />
          <div className="price">
            <Price originalPrice={getOriginalPrice({ data: productData })} discountPrice={getDiscountPrice({ data: productData })} />
            <p>{productData?.description}</p>
          </div>
          <VarientSelect data={productData} setCount={setCount} setLimited={setLimited} setMainImage={setMainImg} setSelectedColor={setSelectedColor} key={3} />
          <div className="pr-dls">
          <Counter count={count} incrementCount={incrementCount} decrementCount={decrementCount} />
          <AddToCart addToCart={addToCartHandler} id={productData?._id} />
          <WishList data={productData} click={click} setClick={setClick} />
          </div>
        </div>
      </div>
    </>
  );
};

Details.propTypes = {
  productData: PropTypes.object.isRequired,
  selectedColor: PropTypes.object.isRequired,
  soldOut: PropTypes.bool,
  limited: PropTypes.string,
  getOriginalPrice: PropTypes.func.isRequired,
  getDiscountPrice: PropTypes.func.isRequired,
  setCount: PropTypes.func.isRequired,
  setLimited: PropTypes.func.isRequired,
  setMainImg: PropTypes.func.isRequired,
  setSelectedColor: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  incrementCount: PropTypes.func.isRequired,
  decrementCount: PropTypes.func.isRequired,
  addToCartHandler: PropTypes.func.isRequired,
  click: PropTypes.bool.isRequired,
  setClick: PropTypes.func.isRequired,
}

export default Details;
