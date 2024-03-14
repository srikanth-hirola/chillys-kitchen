const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter your name!'],
        },
        phone: {
            type: String,
            required: [true, 'Please enter your phone number!'],
        },
        email: {
            type: String,
            required: [true, 'Please enter your email!'],
        },
        item: {
            type: String,
            required: [true, 'Please enter item name!'],
        },
        details: {
            type: String,
        },
        qty: {
            type: Number,
            required: [true, 'Please enter qty!'],
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Inquiry", inquirySchema);
