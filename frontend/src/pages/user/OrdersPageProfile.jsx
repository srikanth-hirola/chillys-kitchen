import OrderspageTabs from './OrderspageTabs'
import SideBar from './SideBar'


const OrdersPageProfile = () => {


    return (
        <>
            <div className='Orderspage-parent'>
                {/* <div className='Orderspage-sub1'>
                    <p>Home</p>
                    <p>My Account</p>
                    <p>Personal Info </p>
                </div> */}
                <div className='Orderspage-main-content'>
                    <div className="row">
                        <div className="col-md-12 col-lg-3">
                            <SideBar />
                        </div>
                        <div className='col-md-12 col-lg-9'>
                            <OrderspageTabs />
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default OrdersPageProfile