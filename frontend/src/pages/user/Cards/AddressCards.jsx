import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteUserAddress } from '../../../redux/actions/user';
import FeatherIcon from 'feather-icons-react';
import "./CardStyles.css";
import { useState } from 'react';
import AddNewAddress from '../Modals/AddNewAddress';
import EditProfileAddress from '../Modals/EditProfileAddress';
const AddressCards = ({ address, index }) => {
    const dispatch = useDispatch();

    const [editModal, setEditModal] = useState(false);
    const showModal = () => {
        setEditModal(true);
    };

    const handleDelete = () => {
        dispatch(deleteUserAddress(index));
    };


    console.log("addresspage", address);
    return (
        <>
            <EditProfileAddress key={2} open={editModal} setOpen={setEditModal} showModal={showModal} />

            <div className='ContactDetails-Address-details-sub p-3'>
                <div className='edit-button'>
                    <h5>{address?.firstName} {address?.lastName}</h5>
                    <div className='d-flex justify-items-end'>
                        <div className='feather-editing'>
                            <FeatherIcon icon='edit'
                                onClick={showModal}
                            />
                        </div>
                        <div className='feather-delete'>
                            <FeatherIcon icon='trash-2'
                                onClick={() => handleDelete()}
                            />
                        </div>
                    </div>
                </div>
              
                <p className='my-2'>{address?.mobile},<span className='m-0'>{address?.flatBuildingNumber} ,{address?.nearbyLocation},{address?.areaName}, {address?.pincode}</span>
</p>
                <p className='m-0'></p>
                <div className='ContactDetails-Address-details-sub-buttons'>
                    <button className='ContactDetails-Address-details-sub-buttons1'>{address?.deliveryTypes}</button>
                    {/* <button className='ContactDetails-Address-details-sub-buttons2'>Default billing address</button> */}
                </div>
            </div>
        </>
    )
}

AddressCards.propTypes = {
    address: PropTypes.object.isRequired
}

export default AddressCards