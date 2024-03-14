const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
    {
        category: String
    }
)

const BlogCategory = mongoose.model('blogCategory', categorySchema);

module.exports = BlogCategory;