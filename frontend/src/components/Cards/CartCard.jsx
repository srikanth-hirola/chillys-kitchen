import PropTypes from 'prop-types';
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getPublishedProducts } from "../../redux/actions/product";
import { Link } from 'react-router-dom';

const CartCard = ({ data1, quantityChangeHandler,
    removeFromCartHandler }) => {


    const dispatch = useDispatch();
    const { allPublishedProducts } = useSelector((state) => state.products);


    useEffect(() => {
        dispatch(getPublishedProducts())
    }, [dispatch])

    useEffect(() => {
        console.log(data1, "hi")
    }, [data1])


    useEffect(() => {
        if (allPublishedProducts?.length > 0 && data1) {
            finalCheck(data1)
            // setValue(data1.qty);
        }
        console.log("hy")
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data1, allPublishedProducts]);
    // data1, allPublishedProducts
    const [dataFound, setDataFound] = useState();
    const [value, setValue] = useState();

    const finalCheck = async (data) => {
        const NotEventFound = allPublishedProducts?.find((item) => item._id === data._id);
        if (NotEventFound) {
            NotEventProduct(NotEventFound, data)
        } else {
            removeFromCartHandler(data)
        }
    }

    const NotEventProduct = async (foundProduct, passedProduct) => {
        if (passedProduct?.showInputs) {
            varientCheck(foundProduct, passedProduct)
        } else {
            noVarientCheck(foundProduct, passedProduct)
        }
    }


    const noVarientCheck = (foundProduct, passedProduct) => {
        const currentDisPrice = foundProduct?.discountPrice;
        const currentStock = foundProduct?.stock > passedProduct?.qty ? passedProduct?.qty : foundProduct?.stock;
        let temp = {
            ...passedProduct,
            selectedColor: foundProduct,
            finalPrice: currentDisPrice * currentStock,
            maxOrderQuantity: foundProduct?.maxOrderQuantity,
            qty: currentStock
        };
        setDataFound(temp)
        setValue(currentStock)
        quantityChangeHandler(temp);
    }

    const varientCheck = (foundProduct, passedProduct) => {
        const selectedColor = passedProduct?.selectedColor;
        const foundVarient = foundProduct?.colorInputs.find((val) => val._id === selectedColor._id)
        if (foundVarient) {
            const currentDisPrice = foundVarient?.discountPrice;
            const currentStock = foundVarient?.stock > passedProduct?.qty ? passedProduct?.qty : foundVarient?.stock;
            let temp = {
                ...passedProduct,
                selectedColor: foundVarient,
                finalPrice: currentDisPrice * currentStock,
                maxOrderQuantity: foundProduct?.maxOrderQuantity,
                qty: currentStock
            };
            setDataFound(temp)
            setValue(currentStock)
            quantityChangeHandler(temp);
        } else {
            removeFromCartHandler(passedProduct)
        }
    }

    let totalPrice = +dataFound?.selectedColor.discountPrice * value;

    const increment = (e, data) => {
        e.preventDefault();
        let stockLimit = null;

        stockLimit = data.selectedColor?.stock;

        if (value >= stockLimit) {
            message.error('Reached Stock Limit!');
        } else {
            setValue(value + 1);
            const updateCartData = { ...data, qty: value + 1 };
            quantityChangeHandler(updateCartData);
            setDataFound(updateCartData);
        }
    };

    const decrement = (e, data) => {
        const updatedValue = value - 1;
        setValue(updatedValue);

        if (updatedValue === 0) {
            // If the updated value is zero, remove the product from the cart
            removeFromCartHandler(data);
        } else {
            // Otherwise, update the cart with the new quantity
            const updateCartData = { ...data, qty: updatedValue };
            quantityChangeHandler(updateCartData);
            setDataFound(updateCartData);
        }
    };

    return (
        <>
            {dataFound && (
                <div className="cart-item" key={dataFound?._id}>
                    <div className="product">
                        <img src={`${dataFound?.selectedColor?.mainImage?.url ? dataFound?.selectedColor?.mainImage?.url : dataFound?.selectedColor?.image?.url}`} alt={"Product"} />
                        <div className="product-details">
                            <div className="title">{dataFound?.name}</div>
                            <p>{dataFound?.selectedColor?.SKU}</p>
                            <div className="price">
                                <Link onClick={() => removeFromCartHandler(dataFound)}>Remove</Link>
                            </div>
                        </div>
                    </div>
                    <div className="quantity">
                        <button onClick={(e) => decrement(e, dataFound)}>-</button>
                        <span>{dataFound?.qty}</span>
                        <button onClick={(e) => increment(e, dataFound)}>+</button>
                    </div>
                    <div className="subtotal">{dataFound?.selectedColor?.discountPrice}</div>
                    <div className="total">{totalPrice}</div>
                </div>
            )}
        </>
    )
}

CartCard.propTypes = {
    data1: PropTypes.object.isRequired,
    quantityChangeHandler: PropTypes.func.isRequired,
    removeFromCartHandler: PropTypes.func.isRequired
}

export default CartCard
