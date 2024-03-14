const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
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
        message: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
