const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  cart: {
    type: Array,
    required: true,
  },
  cod: Number,
  sellerCart: {
    type: Object,
    required: true,
  },
  shippingAddress: {
    type: Object,
  },
  BillingAddress: {
    type: Object,
    required: true,
  },
  shipping_is_billing: Boolean,
  shipping: Number,
  user: {
    type: Object,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  discountPrice: Number,
  subTotalPrice: Number,
  status: {
    type: String,
    default: 'Processing',
  },
  refund: Array,
  paymentInfo: {
    id: {
      type: String,
    },
    status: {
      type: String,
    },
    type: {
      type: String,
    },
  },
  paidAt: {
    type: Date,
    default: Date.now(),
  },
  deliveredAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  shippingOrderDetails: {
    type: Object,
  },
  packageDimension: {
    type: Object,
  },
});

module.exports = mongoose.model('Order', orderSchema);
