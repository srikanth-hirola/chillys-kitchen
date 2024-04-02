/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const ProductDescriptionTab = ({description}) => {
  return (
    <>
      <div className="product-description">
      <div className="product-description-sec">
      <h4>Lorem Ipsum is simply dummy text</h4>
        <p>{description}</p>

      </div>
      </div>
    </>
  );
};

export default ProductDescriptionTab;
