const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
    {
        draft: {
            type: Boolean,
        },
        slug: {
            type: String,
            required: [true, "Slug is required!"],
        },
        title: {
            type: String,
            required: [true, "Title is required!"],
        },
        metaTitle: {
            type: String,
            required: [true, "Meta Title is required!"],
        },
        metaDescription: {
            type: String,
            required: [true, "Meta Description is required!"],
        },
        blogDescription: {
            type: String,
            required: [true, "Post Description is required!"],
        },
        postedBy: {
            type: String,
            default: "By hirola"
        },
        read_time: {
            type: String,
            required: [true, "Read Time is required!"],
        },
        category: {
            type: String,
        },
        format: {
            type: String,
            default: "standard"
        },
        excerpt: {
            type: String,
            required: [true, "Excerpt is required!"],
        },
        large_thumb: {
            type: Array,
            required: [true, "Images are required!"]
        },
        body: {
            type: String,
            required: [true, "Page Content required!"],
        },
        author: {
            type: Object,
            default: {
                author_name: "Hirola Infotech Solutions ",
                author_avatar: "https://res.cloudinary.com/dq6ok3jsu/image/upload/v1702638627/logo_dvdzrb.svg",
                author_para: "Email is a crucial channel in any marketing mix, and never has this been truer than for today’s entrepreneur. Curious what to say."
            }
        }
    },
    { timestamps: true }
);



const Blog = mongoose.model('blog', blogSchema);

module.exports = Blog;