import React, { useEffect, useState } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrdersOfUser } from '../../redux/actions/order';
import OrderCards from './Cards/OrderCards';


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
                <h3>My Orders</h3>
                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3"
                >
                    <Tab eventKey="All Orders" title="All Orders">
                        <div className="row">
                            {orders?.length > 0 ?
                                orders?.map((order, i) => (
                                    <React.Fragment key={i}>
                                        <OrderCards order={order} />
                                        <hr />
                                    </React.Fragment>
                                ))
                                : <p>No Order Found</p>}
                        </div>
                    </Tab>
                </Tabs>
            </div>
        </>

    )
}

export default OrderspageTabs