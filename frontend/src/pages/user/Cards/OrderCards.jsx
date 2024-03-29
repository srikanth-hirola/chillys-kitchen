import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
const OrderCards = ({ order }) => {

    console.log({ order }, "orderspage");
    return (

        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
            <div className='my-orders-page-details'>
                <div className='Orderspage-tabs-active-parent row'>
                    <div className='Orderspage-tabs-active-text1 col-md-8 col-sm-8 col-8'>
                        <h6>Order ID : <strong>#{order?._id.slice(0, 8)}</strong></h6>
                        <p className=''>Date : <strong className='Orderspage-Orderdate'>{order?.createdAt?.slice(0, 10)}</strong></p>
                    </div>
                    {order?.cart?.map((item, i) => (
                        <div key={i} className='col-md-4 col-sm-4 col-4'>
                            <div className='Orderspage-product-image'>
                                <img src={`${item.showInputs
                                    ? item.selectedColor.image?.url
                                    : item.selectedColor.mainImage?.url
                                    }`} alt="product" width={85} height={80} />
                            </div>
                        </div>

                    ))}
                    {order?.cart?.map((item, i) => (
                        <div className='Orderspage-tabs-active-text1' key={i}>
                            <p className='m-0'>Item Name : <strong className='m-0'>{item.name}</strong></p>
                            <p className='m-0'>Total : <strong>₹&nbsp;{item?.finalPrice * item?.qty}</strong></p>
                            <p className='m-0'>Qty : <strong>{item?.qty}</strong></p>
                        </div>
                    ))}
                    <div className='Orderspage-tabs-active-text2'>
                        <p className='m-0'>{order?.paymentInfo?.type}<strong className='Orderspage-paymentMethod'> - {order?.status}</strong></p>
                    </div>
                </div>

                {/* order-item */}

                {order?.cart?.map((item, i) => (
                    <div className='Orderspage-ordered-item-parent' key={i}>
                        <div className='Orderspage-product-image-parent'>
                            <div className='Orderspage-product-text '>


                            </div>
                        </div>

                    </div>
                ))}
                <div className='Orderspage-product-button d-flex justify-content-end'>
                    <Link to={`/user/order/${order?._id}`}>
                        <button>View Details</button>
                    </Link>
                </div>
                <div>
                </div>
            </div>
        </div>

    )
}

OrderCards.propTypes = {
    order: PropTypes.object.isRequired
}

export default OrderCards