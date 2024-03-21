import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteUserAddress } from '../../../redux/actions/user';

const AddressCards = ({ address }) => {
    const dispatch = useDispatch();

    const handleDelete = (item) => {
        const id = item?._id;
        dispatch(deleteUserAddress(id));
    };


    return (
        <div className='ContactDetails-Address-details-sub'>
            <h5>{address?.billinguserName}</h5>
            <span>{address?.billinguserphonenumber}</span>
            <p>{address?.billingaddress1} {address?.billingaddress2
            }
            </p>
            <div className='ContactDetails-Address-details-sub-buttons'>
                <button className='ContactDetails-Address-details-sub-buttons1'>{address?.addressType}</button>
                {/* <button className='ContactDetails-Address-details-sub-buttons2'>Default billing address</button> */}
            </div>
            <div className='ContactDetails-Address-details-sub-footer'>
                <button className='ContactDetails-Address-details-sub-footer-button1' onClick={() => handleDelete(address)}>Remove</button>
                {/* <button className='ContactDetails-Address-details-sub-footer-button2'>Edit</button>
                <button className='ContactDetails-Address-details-sub-footer-button2'>Set as Default</button> */}
            </div>
        </div>
    )
}

AddressCards.propTypes = {
    address: PropTypes.object.isRequired
}

export default AddressCards