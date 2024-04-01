import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import useData from '../../customHooks/getName/useData';

const WishListCard = ({
    data1,
    removeFromCartHandler
}) => {
    const { getCategory, getSubCategory } = useData();

    return (
        <>
            {data1 && (
                <Link to={`/menu?category=${getCategory({
                    name: "_id", data: data1?.category
                })?.category}&subCategory=${getSubCategory({ data: data1?.subCategory, name: '_id' })?.subCategory}&product=${data1?.slug}`}>
                    <div className="cart-item" key={data1?._id}>
                        <div className="product">
                            <img src={`${data1?.mainImage?.url}`} alt={"Product"} />
                            <div className="product-details">
                               <div className="title-sec">
                               <div className="title">{data1?.name}</div>
                                <div className="title">{data1?.originalPrice}</div>
                               </div>
                                <div className="price">
                                    <Link onClick={() => removeFromCartHandler(data1)}>Remove</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            )}
        </>
    )
}

WishListCard.propTypes = {
    data1: PropTypes.object.isRequired,
    removeFromCartHandler: PropTypes.func.isRequired
}

export default WishListCard