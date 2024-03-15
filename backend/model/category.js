const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  category: {
    type: String,
    require: [true, "Category is required!"]
  },
});

module.exports = mongoose.model('Category', categorySchema);
