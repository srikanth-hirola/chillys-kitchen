/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import SideBar from '../../components/Sidebar';
import sidebar_menu from '../../constants/sidebar-menu';
import { Table, Tag, Button } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import DashboardHeader from '../../components/DashboardHeader';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrdersOfShop } from '../../redux/actions/order';

const ShippedOrders = () => {
    const { orders, isLoading } = useSelector((state) => state.order);

    const columns = [
        {
            title: 'OrderID',
            dataIndex: '_id',
            key: '_id',
            render: text => <span>#{text.slice(0, 8)}</span>,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Items Qty',
            dataIndex: 'cart',
            key: 'cart',
            render: text => <span>{text.length}</span>,
        },
        {
            title: 'Total',
            key: 'totalPrice',
            dataIndex: 'totalPrice',
            render: text => <span>{text}</span>
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, data) => (
                <Button type="link" href={`/admin/order-details/${data?._id}`} icon={<RightOutlined />} />
            ),
        },
    ];

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllOrdersOfShop());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    return (
        <div className='dashboard-container'>
            <SideBar menu={sidebar_menu} />

            <div className='dashboard-content'>
                <div className="dashboard-header">
                    <h3>Pending Orders</h3>
                    <div className="add-btn">
                        <DashboardHeader />
                    </div>
                </div>
                <h3>orders</h3>
                <Table
                    dataSource={orders?.filter((item) => item?.status?.toLowerCase() === "on the way")}
                    columns={columns}
                    bordered={false}
                    pagination={false}
                />
            </div>
        </div>
    );
}

export default ShippedOrders