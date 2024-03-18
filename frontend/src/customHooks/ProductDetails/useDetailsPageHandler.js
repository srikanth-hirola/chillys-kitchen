import { message } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../../redux/actions/wishlist";
import { addTocart } from "../../redux/actions/cart";

const useDetailsPageHandler = ({ data, selectedColor, count, click, setMainImg, setLimited, setSoldOut, setCount, setClick }) => {

    const { products } = useSelector((state) => state.products);
    const { cart } = useSelector((state) => state.cart);
    const { wishlist } = useSelector((state) => state.wishlist);
    const dispatch = useDispatch();

    useEffect(() => {
        if (wishlist?.length > 0) {
            let found = wishlist?.find((item) => item?._id === data?._id);
            if (found) {
                setClick(true)
            }
        } else {
            setClick(false)
        }
    }, [data?._id, setClick, wishlist])

    useEffect(() => {
        const main = data?.mainImage;
        const multi = data?.images;

        let imgarr = []
        imgarr.push(main)

        // eslint-disable-next-line array-callback-return
        multi?.map((vel) => {
            imgarr.push(vel)
        });
        if (data?.showInputs) {
            data?.colorInputs?.map((item) => (
                imgarr.push(item?.image)
            ))
        }
        setMainImg(imgarr);
    }, [data?.colorInputs, data?.images, data?.mainImage, data?.showInputs, setMainImg]);


    useEffect(() => {
        const hasLimitedStock = selectedColor?.stock < 7;
        const soldOutStock = selectedColor?.stock < 0;

        if (hasLimitedStock) {
            if (soldOutStock) {
                setLimited('Sold Out');
                setSoldOut(true);
            } else {
                setLimited('Limited Stocks');
                setSoldOut(false);
            }
        } else {
            setLimited('');
            setSoldOut(false);
        }
    }, [selectedColor, setLimited, setSoldOut]);

    const incrementCount = () => {
        const stockLimit = Number(selectedColor?.stock);
        if (count >= stockLimit) {
            message.error('Reached Stock Limit!')
        } else {
            setCount(count + 1);
        }
    };

    const decrementCount = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    const removeFromWishlistHandler = (data) => {
        setClick(!click);
        dispatch(removeFromWishlist(data));
    };

    const addToWishlistHandler = (data) => {
        setClick(!click);
        dispatch(addToWishlist(data));
    };

    const totalReviewsLength =
        products &&
        products.reduce((acc, product) => acc + product.reviews.length, 0);

    const totalRatings =
        products &&
        products.reduce(
            (acc, product) =>
                acc + product.reviews.reduce((sum, review) => sum + (review.rating || 0), 0),
            0
        );

    const avg = totalRatings / totalReviewsLength || 0;

    const averageRating = avg.toFixed(2);

    const loopCheck = async (data) => {
        const result = await data.filter((val) => {
            return val.attrId === selectedColor._id;
        });
        return result[0];
    };

    const addToCartHandler = async ({ e, id }) => {
        e.preventDefault();
        const isItemExists =
            cart &&
            // eslint-disable-next-line array-callback-return
            cart.filter((i) => {
                if (i._id === id && i.selectedColor._id === selectedColor._id) {
                    return i;
                }
            });
        if (isItemExists.length > 0) {
            const areAttributesEqual = await loopCheck(isItemExists);

            if (areAttributesEqual) {
                const currentValue = areAttributesEqual.qty;
                const updatedQty = currentValue + count;

                const stockLimit = selectedColor?.stock;

                if (stockLimit >= updatedQty) {
                    const updatedCartData = {
                        ...areAttributesEqual,
                        qty: updatedQty,
                    };
                    dispatch(addTocart(updatedCartData));
                    message.success('Cart updated');
                } else {
                    message.error('Reached Stock Limit!')
                }
            } else {
                const cartData = {
                    ...data,
                    qty: count,
                    attrId: selectedColor._id,
                    selectedColor: selectedColor,
                    status: '',
                    finalPrice: selectedColor.discountPrice,
                };
                dispatch(addTocart(cartData));
                message.success('Item added to cart successfully!');
            }
        } else {
            if (count > 0) {
                const cartData = {
                    ...data,
                    qty: count,
                    attrId: selectedColor._id,
                    selectedColor: selectedColor,
                    status: '',
                    finalPrice: selectedColor.discountPrice,
                    // newStock: selectedColor?.stock,
                };
                dispatch(addTocart(cartData));
                message.success('Item added to cart successfully!');
            } else {
                message.error('Select number of items');
            }
        }
    };

    const getDiscountPrice = ({ data }) => {
        let price;
        if (data?.showInputs) {
            price = data?.colorInputs[0]?.originalPrice === 0
                ? data?.colorInputs[0]?.originalPrice
                : data?.colorInputs[0].discountPrice;
        } else {

            price = data?.originalPrice === 0
                ? data?.originalPrice
                : data?.discountPrice
        }
        let convertedPrice = price
        return convertedPrice
    }

    const getOriginalPrice = ({ data }) => {
        let price;
        if (data?.showInputs) {
            price = data?.colorInputs[0]?.originalPrice
                ? data?.colorInputs[0]?.originalPrice : null
        } else {
            price = data?.originalPrice ? data?.originalPrice : null
        }
        let convertedPrice = price
        return convertedPrice
    }


    return { incrementCount, decrementCount, removeFromWishlistHandler, addToWishlistHandler, totalReviewsLength, totalRatings, averageRating, addToCartHandler, getDiscountPrice, getOriginalPrice }
}

export default useDetailsPageHandler