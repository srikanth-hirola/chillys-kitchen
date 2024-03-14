const express = require('express');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const router = express.Router();
const ErrorHandler = require('../utils/ErrorHandler');
const sendMail = require('../utils/sendMail');
const Newsletter = require('../model/newsletter');
const sendHtmlMail = require('../utils/sendHtmlMail');

// send newsletter mail
router.post(
    '/send-newsletter',
    catchAsyncErrors(async (req, res, next) => {
        try {
            const { haveTemp, emailContent } = req.body;
            const { subject, body } = emailContent;
            const emails = await Newsletter.find({});
            if (emails.length === 0) {
                res.status(404).json({ message: 'No emails are subscribed!' })
                return;
            }

            let recipents = emails;
            const options = {
                email: recipents,
                subject: subject,
                message: body
            }
            res.status(201).json({ success: true })

            if (haveTemp) {
                await sendHtmlMail(options)
            } else {
                await sendMail(options)
            }
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    })
);

// subscribe to newsletter mail
router.post(
    '/subscribe-to-newsletter',
    catchAsyncErrors(async (req, res, next) => {
        try {
            const { email } = req.body;
            const found = await Newsletter.findOne({ mailIds: { '$in': [email] } });
            if (!found) {
                const foundMails = await Newsletter.find({});
                if (foundMails.length === 0) {
                    Newsletter.create({ mailIds: [email] })
                } else {
                    let updatedArray = foundMails;
                    updatedArray.push(email);
                    await Newsletter.updateMany({}, {
                        $push: { mailIds: email }
                    })
                }

                res.status(201).json({ message: "Subscribed Successfully" })
            } else {
                res.status(400).json({ message: "This mail Id is already subscribed!" })
            }
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    })
);

module.exports = router;