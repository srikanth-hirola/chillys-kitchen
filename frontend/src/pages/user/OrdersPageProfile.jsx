import Navbar from '../../components/common/Navbar'
import OrderspageTabs from './OrderspageTabs'
import UserProfileModal from './UserProfileModal'

const OrdersPageProfile = () => {


    return (
        <>
            <div className='Orderspage-parent'>
               <Navbar />
                <div className='Orderspage-main-content overflow-hidden'>
                    <div className="row">
                        <div className="col-md-3 col-lg-3">
                            <UserProfileModal/>
                        </div>
                        <div className='col-md-9 col-lg-9'>
                            <OrderspageTabs />
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default OrdersPageProfile