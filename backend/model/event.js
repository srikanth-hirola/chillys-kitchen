const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  draft: Boolean,
  name: {
    type: String,
  },
  metaTitle: String,
  metaDescription: String,
  seoKeywords: Array,
  slug: String,
  description: {
    type: String,
  },
  productArray: Array,
  start_Date: {
    type: Date,
  },
  Finish_Date: {
    type: Date,
  },
  status: {
    type: String,
  },
  images: [
    {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
  shopId: {
    type: String,
    required: true,
  },
  shop: {
    type: Object,
    required: true,
  },
  sold_out: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Event', eventSchema);
