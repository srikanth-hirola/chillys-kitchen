/* eslint-disable no-unused-vars */


import React, { useEffect, useState } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { UserOutlined } from "@ant-design/icons";
import { Form, Input, Checkbox, Button, Card } from "antd";
import { useSelector } from "react-redux";
import OrderSummary from "../components/CheckOut/OrderSummary";

const { Item } = Form;

const Checkout = () => {
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const [cartData, setCartData] = useState(cart);
  const [couponCode, setCouponCode] = useState('');
  const [couponCodeData, setCouponCodeData] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [showCoupan, setCoupan] = useState(true);

  const [totalPriceFinal, setTotalPriceFinal] = useState(0);

  const subTotalPrice = cartData?.reduce((acc, item) => {
    if (item.active) {
      return acc + item.qty * item.selectedColor.eventPrice;
    } else {
      return acc + item.qty * item.selectedColor.discountPrice;
    }
  }, 0);

  // const handleSubmit = async (e, totalPrice) => {
  //   e.preventDefault();
  //   const name = couponCode;

  //   await axios.get(`${server}/coupon/get-coupon-value/${name}`).then((res) => {
  //     const shopId = res.data.couponCode?.shopId;
  //     const couponCodeValue = res.data.couponCode?.value;
  //     if (res.data.couponCode !== null) {
  //       const isCouponValid =
  //         cartData && cartData.filter((item) => item.shopId === shopId);

  //       if (isCouponValid.length === 0) {
  //         toast.error('Coupon code is not valid for this shop');
  //         setCouponCode('');
  //       } else {
  //         // const eligiblePrice = isCouponValid.reduce(
  //         //   (acc, item) => acc + item.qty * item.discountPrice,
  //         //   0
  //         // );
  //         const eligiblePrice = totalPrice;

  //         if (eligiblePrice <= res.data.couponCode?.maxAmount && eligiblePrice >= res.data.couponCode?.minAmount) {
  //           const discountPrice = (eligiblePrice * couponCodeValue) / 100;

  //           setDiscountPrice(discountPrice.toFixed(2));
  //           setCouponCodeData(res.data.couponCode);
  //           setCouponCode('');
  //           setTotalPriceFinal(Number(totalPrice) - Number(discountPrice))
  //         } else {
  //           toast.error('Coupon is not applicable!')
  //         }


  //       }
  //     }
  //     if (res.data.couponCode === null) {
  //       toast.error("Coupon code doesn't exists!");
  //       setCouponCode('');
  //     }
  //   });
  // };

  const handleCoupanFinal = (total) => {
    const discountPercentenge = couponCodeData ? discountPrice : '';

    const totalPriceCoupan = couponCodeData
      ? (total - discountPercentenge).toFixed(2)
      : (total);

    return totalPriceCoupan
  }


  const discountPercentenge = couponCodeData ? discountPrice : '';


  const [quantity, setQuantity] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);

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



  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setFormData({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      mobile: "1234567890",
      flatBuildingNumber: "A1",
      pincode: "123456",
      nearbyLocation: "Near Park",
      areaName: "Example Area",
      deliveryTypes: ["Home", "Corporate"],
    });
  };

  const handleAddAddress = () => {
    setShowAddressForm(true);
    setSelectedAddress(null);
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
    });
  };

  const handleRemoveAddress = () => {
    setSelectedAddress(null);
    setShowAddressForm(false);
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
    });
  };

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

  return (
    <>
      <Navbar />
      <div className="checkout-main">
        <div className="checkout-sec">
          <div className="container">
            <div className="checkout-main-head">
              <h3>Checkout</h3>
              <div className="">
                {!selectedAddress && !showAddressForm && (
                  <div className="select-address-button">
                    <Button onClick={handleAddAddress}>
                      Add New Address
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="row justify-content-around">
              <div className="col-md-7">
                <div className="checkout">
                  {/* Address cards */}
                  <div className="row">
                    <div className="col-md-4">
                      <div className="address-cards">
                        <Card
                          title="Address 1"
                          onClick={() => handleAddressSelect("Address 1")}
                          style={{ marginBottom: 16 }}
                        >
                          123 Street, City, Country
                        </Card>

                      </div>

                    </div>
                    <div className="col-md-4">
                      <div className="address-cards">
                        <Card
                          title="Address 2"
                          onClick={() => handleAddressSelect("Address 2")}
                        >
                          456 Road, Town, Country
                        </Card>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="address-cards">
                        <Card
                          title="Address 2"
                          onClick={() => handleAddressSelect("Address 3")}
                        >
                          456 Road, Town, Country
                        </Card>
                      </div>
                    </div>
                  </div>
                  {selectedAddress && (
                    <div className="selected-address">
                      <div className="selected-head">
                        <h2>Selected Address</h2>

                        <Button onClick={handleRemoveAddress}>
                          Remove Address
                        </Button>
                      </div>
                      <Form layout="vertical">
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
                      </Form>
                    </div>
                  )}

                  {showAddressForm && (
                    <div className="add-address-form">
                      <h2>Add New Address</h2>
                      <Form layout="vertical">
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
                        <Item>
                          <Button type="primary">Save Address</Button>
                        </Item>
                      </Form>
                    </div>
                  )}


                </div>
              </div>
              <OrderSummary quantity={quantity} setQuantity={setQuantity} cartData={cartData} />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Checkout;
