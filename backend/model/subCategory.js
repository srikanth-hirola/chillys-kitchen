const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
    subCategory: {
        type: String,
        required: [true, "SubCategory is required"]
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    subCatImg: {
        type: Object
    }
});

module.exports = mongoose.model('SubCategory', subCategorySchema);
