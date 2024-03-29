import React, { useEffect, useState } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrdersOfUser } from '../../redux/actions/order';
import OrderCards from './Cards/OrderCards';
import { Link } from 'react-router-dom'

const OrderspageTabs = () => {
    const { user } = useSelector((state) => state.user);
    const { orders } = useSelector((state) => state.order);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllOrdersOfUser(user._id));
    }, [dispatch, user._id]);


    const [key, setKey] = useState('All Orders');
    return (
        <>
            <div className='OrderspageTabs-parent'>
                <h1 className='py-3'>My Orders</h1>
                <div className="row">
                    {orders?.length > 0 ?
                        orders?.map((order, i) => (
                            <React.Fragment key={i}>
                                <OrderCards order={order} />

                            </React.Fragment>
                        ))
                        : <p>No Order Found</p>}
                </div>
            </div >
        </>

    )
}

export default OrderspageTabs