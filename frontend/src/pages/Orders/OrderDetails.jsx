import { useEffect, useState } from 'react';
// import { BsFillBagFill } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';
import { getAllOrdersOfShop } from '../../redux/actions/order';
import toast from 'react-hot-toast';
import { server } from '../../server';
import { StyleConfig } from '../../utils/StyleConfig';
import SideBar from '../../components/Sidebar';
import sidebar_menu from '../../constants/sidebar-menu';

const OrderDetails = () => {
    const { orders } = useSelector((state) => state.order);
    const { seller } = useSelector((state) => state.seller);
    const dispatch = useDispatch();
    const [status, setStatus] = useState('');
    console.log("status", status)
    const navigate = useNavigate();
    const styles = StyleConfig();

    const { id } = useParams();

    useEffect(() => {
        dispatch(getAllOrdersOfShop());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);


    const data = orders && orders.find((item) => item._id === id);


    const orderUpdateHandler = async () => {
        const products = data?.cart?.products;
        await axios
            .put(
                `${server}/order/update-order-status/${id}`,
                {
                    status, products
                },
                { withCredentials: true }
            )
            .then(() => {
                toast.success('Order updated!');
                // navigate('/shop/dashboard-orders');
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            });
    };

    const refundOrderUpdateHandler = async (e, productID) => {
        await axios
            .put(
                `${server}/order/order-refund-success/${id}`,
                {
                    status,
                    productID,
                },
                { withCredentials: true }
            )
            .then(() => {
                toast.success('Order updated!');
                dispatch(getAllOrdersOfShop(seller._id));
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            });
    };



    const handleGoBack = () => {
        navigate(-1)
    }

    return (
        <div className='dashboard-container'>
            <SideBar menu={sidebar_menu} />
            <div className={`py-4 px-4 min-h-screen ${styles.section}`}>
                <div className="w-full flex items-center justify-between">
                    <div className="flex items-center">
                        {/* <BsFillBagFill size={30} color="#0156FF" /> */}
                        <h1 className="pl-2 text-[24px] mt-3">Order Details</h1>
                    </div>
                    {/* <Link to={"/shop/dashboard-orders"}> */}
                    <div
                        className={`${styles.button} !bg-[#fce1e6] !rounded-[4px] text-[#fff] font-[600] !h-[45px] text-[18px]`} onClick={handleGoBack}
                    >
                        Order List
                    </div>
                    {/* </Link> */}
                </div>

                <div className="w-full flex items-center justify-between pt-6">
                    <h5 className="text-[#00000084] m-0 text-[15px]">
                        Order ID: <span>#{data?._id?.slice(0, 8)}</span>
                    </h5>
                    <h5 className="text-[#00000084] m-0 text-[15px]">
                        Placed on: <span>{data?.createdAt?.slice(0, 10)}</span>
                    </h5>
                </div>

                {/* order items */}
                <br />
                <br />
                {data &&
                    data?.cart.map((item, index) => (
                        <div className="w-full flex items-start mb-5" key={index}>
                            <img
                                src={`${item.showInputs
                                    ? item.selectedColor?.image?.url
                                    : item.selectedColor?.mainImage?.url
                                    }`}
                                alt=""
                                className="w-[80x] h-[80px]"
                            />
                            <div className="w-full">
                                <h5 className="pl-3 text-[20px] fw-medium">{item.name}</h5>
                                <h5 className="pl-3 text-[18px] fw-light">
                                    SKU : {item.selectedColor.SKU}
                                </h5>
                                <h5 className="pl-3 text-[18px] text-[#00000091] fw-normal">
                                    ₹&nbsp;{item.finalPrice} x {item.qty}
                                </h5>
                                {item.status === 'Processing refund' ||
                                    item.status === 'Refund Success' ||
                                    item.status === 'Rejected refund' ? (
                                    <>
                                        <select
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                            className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
                                        >
                                            {['Processing refund', 'Rejected refund', 'Refund Success']
                                                .slice(
                                                    [
                                                        'Processing refund',
                                                        'Rejected refund',
                                                        'Refund Success',
                                                    ].indexOf(item.status)
                                                )
                                                .map((option, index) => (
                                                    <option value={option} key={index}>
                                                        {option}
                                                    </option>
                                                ))}
                                        </select>
                                        {item.status === 'Processing refund' && (
                                            <div
                                                className={`${styles.button} mt-5 !bg-[#FCE1E6] !rounded-[4px] text-[#fff] font-[600] !h-[45px] text-[18px]`}
                                                onClick={(e) => {
                                                    refundOrderUpdateHandler(e, item._id);
                                                }}
                                            >
                                                Update Status
                                            </div>
                                        )}
                                    </>
                                ) : null}
                            </div>
                        </div>
                    ))}

                <div className="border-t w-full text-right flex justify-between">

                    <h5 className="pt-3 text-[18px]">
                        <strong className='fw-medium'>Total Price: </strong><span className='fw-light'>₹&nbsp;{data?.totalPrice}</span>
                    </h5>
                    <h5 className="pt-3 text-[18px]">
                        <strong className='fw-medium'>{data?.paymentInfo?.type}</strong>
                    </h5>
                </div>
                <br />
                <br />
                <div className="w-full 800px:flex items-center">

                    <div className="w-full 800px:w-[60%]">
                        <h4 className="pt-3 text-[20px] font-[600]">Shipping Address:</h4>
                        <h4 className="pt-3 text-[20px]">
                            Name: {data?.shippingAddress?.firstName} {data?.shippingAddress?.lastName}
                        </h4>
                        <h4 className=" text-[20px]">
                            Mail ID: {data?.shippingAddress?.email}
                        </h4>
                        <h4 className=" text-[20px]">
                            Mobile No: {data?.shippingAddress?.mobile}</h4>
                        <h4 className=" text-[20px]">
                            Flat / Building No: {data?.shippingAddress?.flatBuildingNumber}</h4>
                        <h4 className=" text-[20px]">LandMark: {data?.shippingAddress?.nearbyLocation}</h4>
                        <h4 className=" text-[20px]">Area Name: {data?.shippingAddress?.areaName}</h4>
                        <h4 className=" text-[20px]">Pincode: {data?.shippingAddress?.pincode}</h4>
                    </div>

                    <div className="w-full 800px:w-[40%]">
                        <h4 className="pt-3 text-[18px] font-[600]">Payment Status:</h4>
                        <p className='text-[18px] font-[300] mb-2'>
                            {data?.paymentInfo?.status ? data?.paymentInfo?.status : 'Not Paid'}
                        </p>
                    </div>
                </div>
                <br />
                <br />
                <h4 className="pt-3 text-[20px] font-[600]">Order Status:</h4>
                {data?.status !== 'Processing refund' &&
                    data?.status !== 'Refund Success' && (
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-[200px]  border h-[35px] rounded-[5px]"
                        >
                            {[
                                'Processing',
                                'On the way',
                                'Delivered',
                            ]
                                .slice(
                                    [
                                        'Processing',
                                        'On the way',
                                        'Delivered',
                                    ].indexOf(data?.status)
                                )
                                .map((option, index) => (
                                    <option value={option} key={index}>
                                        {option}
                                    </option>
                                ))}
                        </select>
                    )}


                <div
                    className={`${styles.button} mt-5 !bg-[#FCE1E6] !rounded-[4px] text-[#fff] font-[600] !h-[45px] text-[16px] `}
                    onClick={
                        data?.status !== 'Processing refund'
                            ? orderUpdateHandler
                            : refundOrderUpdateHandler
                    }
                >
                    Update Status
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
