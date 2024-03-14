const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  approved: Boolean,
  shopID: String,
  CatImg: {
    type: Object,
    required: true,
  },
  name: String,
  subcategories: [
    {
      name: String,
      subSubcategories: [
        {
          name: String
        }
      ],
    },
  ],
});

module.exports = mongoose.model('Category', categorySchema);
