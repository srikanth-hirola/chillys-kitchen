const mongoose = require("mongoose");

const cateringFormSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter your name!'],
        },
        email: {
            type: String,
            required: [true, 'Please enter your email!'],
        },
        phoneNumber: {
            type: String,
            required: [true, 'Please enter your Phone Number!'],
        },
        category: {
            type: String,
            required: [true, 'Please Select Your Category!'],
        },
        noOfPeople: {
            type: String,
            required: [true, 'Please enter No Of People!'],
        },
        type: {
            type: String,
            required: [true, 'Please Select your Type!'],
        },
        date: {
            type: Date,
            required: [true, 'Please Select your Date!'],
        },
        location: {
            type: String,
            required: [true, 'Please enter your location!'],
        },
        pincode: {
            type: String,
            required: [true, 'Please enter your pincode!'],
        },
        message: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Catering", cateringFormSchema);
