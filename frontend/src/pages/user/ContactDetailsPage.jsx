import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import SideBar from './SideBar';
import AddressCards from './Cards/AddressCards';
import AddNewAddress from './Modals/AddNewAddress';
import UserProfileModal from './UserProfileModal';
import Navbar from '../../components/common/Navbar';
import FeatherIcon from 'feather-icons-react';

const ContactDetailsPage = () => {
    const { user } = useSelector((state) => state.user);
    console.log("user", user)
    const [addressData, setAddressData] = useState([]);
    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    useEffect(() => {
        setAddressData(user?.addresses)
    }, [user])

    return (
        <>
            <AddNewAddress key={2} open={open} setOpen={setOpen} showModal={showModal} />
            <div className='ContactDetails-parent '>
               <Navbar className="navbar-text"/>
                <div className='ContactDetails-main-content overflow-hidden'>
                    <div className="row">
                        <div className="col-md-3 col-lg-3">
                            <UserProfileModal />
                        </div>
                        <div className='col-md-9 col-lg-9'>
                            <div className='ContactDetails-sub3'>
                                {/* <div className='ContactDetails-sub3-headings'>
                                    <h3>Contact Details</h3>
                                </div> */}
                                <div className='ContactDetails-sub1-text'>
                                    <h3 className='py-3'>Address</h3>
                                    <div className='add-contact-details' onClick={showModal}>
                                        <FeatherIcon icon='plus-circle'/>
                                        <button >Add new</button>
                                    </div>
                                </div>
                                <div className="ContactDetails-Address-details-parent ">
                                    <div className='row'>
                                        {addressData?.length > 0 ?
                                            addressData?.map((address, i) => (
                                                <div className="col-lg-5 col-md-6 col-sm-6 col-12" key={i}>
                                                    <AddressCards address={address} index={i} />
                                                </div>
                                            ))
                                            : <p>No Address Saved</p>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default ContactDetailsPage