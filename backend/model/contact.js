const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, 'Please enter your name!'],
        },
        lastName: {
            type: String,
        },
        mobileno: {
            type: String,
            required: [true, 'Please enter your phone number!'],
        },
        email: {
            type: String,
            required: [true, 'Please enter your email!'],
        },
        catType: Object,
        message: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
