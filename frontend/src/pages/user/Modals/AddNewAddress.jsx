import { useState } from 'react';
import { Form, Input, Checkbox, Modal } from "antd";
// import { Country, State, City } from 'country-state-city';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { updatUserAddress } from '../../../redux/actions/user';
const { Item } = Form;

const AddNewAddress = ({ open, setOpen }) => {
    const [confirmLoading, setConfirmLoading] = useState(false);

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };
    const handleCancel = () => {
        setOpen(false);
    };

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        flatBuildingNumber: "",
        pincode: "",
        nearbyLocation: "",
        areaName: "",
        deliveryTypes: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCheckboxChange = (checkedValues) => {
        setFormData({
            ...formData,
            deliveryTypes: checkedValues,
        });
    };


    const dispatch = useDispatch();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const val = validationFun(formData);
        if (!val) {
            toast.error("Please fill all the fields!");
        } else {
            dispatch(
                updatUserAddress(
                    formData
                )
            );
            setOpen(false);
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                mobile: "",
                flatBuildingNumber: "",
                pincode: "",
                nearbyLocation: "",
                areaName: "",
                deliveryTypes: [],
            })
        }
    };

    const validationFun = (addresDetails) => {
        if (
            addresDetails?.firstName === "" ||
            addresDetails?.lastName === "" ||
            addresDetails?.email === "" ||
            addresDetails?.mobile === "" ||
            addresDetails?.flatBuildingNumber === "" ||
            addresDetails?.pincode === "" ||
            addresDetails?.nearbyLocation === "" ||
            addresDetails?.areaName === "" ||
            addresDetails?.deliveryTypes?.length === 0
        ) {
            toast.error("All Address Field's are required!");
            return false;
        } else {
            return true;
        }

    };


    return (
        <>
            {/* <Button type="primary" onClick={showModal}>
                pop up 1 - congratulations
            </Button> */}
            <Modal
                title=""
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                footer={null}
                onCancel={handleCancel}
                className='AddNewAddress-popup-Modal'
            >
                <div className='AddNewAddress-parent'>
                    <h2>Add New Address</h2>
                    <Form layout="vertical" >
                        <Item label="First Name">
                            <Input
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </Item>
                        <Item label="Last Name">
                            <Input
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </Item>
                        <Item label="Email">
                            <Input
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </Item>
                        <Item label="Mobile">
                            <Input
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                            />
                        </Item>
                        <Item label="Flat/Building Number">
                            <Input
                                name="flatBuildingNumber"
                                value={formData.flatBuildingNumber}
                                onChange={handleChange}
                            />
                        </Item>
                        <Item label="Pincode">
                            <Input
                                name="pincode"
                                value={formData.pincode}
                                onChange={handleChange}
                            />
                        </Item>
                        <Item label="Nearby Location">
                            <Input
                                name="nearbyLocation"
                                value={formData.nearbyLocation}
                                onChange={handleChange}
                            />
                        </Item>
                        <Item label="Area Name">
                            <Input
                                name="areaName"
                                value={formData.areaName}
                                onChange={handleChange}
                            />
                        </Item>
                        <Item label="Select Delivery Type">
                            <Checkbox.Group
                                options={["Home", "Corporate", "Wedding", "Events"]}
                                value={formData.deliveryTypes}
                                onChange={handleCheckboxChange}
                            />
                        </Item>
                        <button onClick={handleSubmit}>Submit</button>
                    </Form>
                </div>
            </Modal>
        </>
    );
};

AddNewAddress.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func
}

export default AddNewAddress;