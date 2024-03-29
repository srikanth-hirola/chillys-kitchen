const express = require('express');
const { isSeller, isAuthenticated, isAdmin } = require('../middleware/auth');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const router = express.Router();
const ErrorHandler = require('../utils/ErrorHandler');
const Inquiry = require('../model/Inquiry');
const contact = require('../model/contact');
const catering = require('../model/CateringForm');


// create product
router.post(
    '/inquiry',
    catchAsyncErrors(async (req, res, next) => {
        try {
            const { form } = req.body;
            await Inquiry.create(form);
            res.status(201).json({
                success: true
            })
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    })
);


// get all products of a shop
router.get(
    '/inquiry',
    isSeller,
    catchAsyncErrors(async (req, res, next) => {
        try {
            const inquiris = await Inquiry.find({});
            res.status(200).json({
                success: true,
                inquiris
            })
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    })
);


// create contact
router.post(
    '/contact',
    catchAsyncErrors(async (req, res, next) => {
        try {
            const { form } = req.body;
            await contact.create(form);
            res.status(201).json({
                success: true
            })
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    })
);


// get all products of a shop
router.get(
    '/contact',
    isSeller,
    catchAsyncErrors(async (req, res, next) => {
        try {
            const contacts = await contact.find({});
            res.status(200).json({
                success: true,
                contacts
            })
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    })
);


// create catering form
router.post(
    '/cateringform',
    catchAsyncErrors(async (req, res, next) => {
        try {
            const form  = req.body;
            await catering.create(form);
            res.status(201).json({
                success: true
            })
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    })
);


// get all catering form
router.get(
    '/cateringform',
    // isSeller,
    catchAsyncErrors(async (req, res, next) => {
        try {
            const caterings = await catering.find({});
            res.status(200).json({
                success: true,
                caterings
            })
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    })
);


module.exports = router;
