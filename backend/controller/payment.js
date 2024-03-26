const express = require('express');
const router = express.Router();
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Site = require('../model/siteConfig');


const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

router.post(
  '/process',
  catchAsyncErrors(async (req, res, next) => {
    // const ShiteData = await Site.find({});
    // const currencyCode = ShiteData[0]?.currency?.code;
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: `INR`,
      metadata: {
        company: 'Hirola',
      },
    });
    res.status(200).json({
      success: true,
      client_secret: myPayment.client_secret,
    });
  })
);

router.get(
  '/stripeapikey',
  catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({ stripeApikey: process.env.STRIPE_API_KEY });
  })
);

router.post('/razorpay', async (req, res) => {
  const { amount } = req.body;
  // const ShiteData = await Site.find({});
  const currencyCode = "INR";

  const options = {
    amount: amount, // Amount in paisa
    currency: `${currencyCode}`,
    receipt: crypto.randomBytes(10).toString('hex'),
  };

  try {
    const payment = await razorpay.orders.create(options);
    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: 'Payment creation failed' });
  }
});

router.post('/razorpay-verification', async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body.response;

  const body = razorpay_order_id + '|' + razorpay_payment_id;

  const generated_signature = crypto
    .createHmac('SHA256', '0U2I1WMMmDYkjwONiaFeV7Iu')
    .update(body)
    .digest('hex');

  if (generated_signature == razorpay_signature) {
    res.json({ Status: 'Success' });
  } else {
    res.json({ Status: 'Success' });
  }

  // const options = {
  //   amount: amount, // Amount in paisa
  //   currency: 'INR',
  //   receipt: crypto.randomBytes(10).toString('hex'),
  // };

  // console.log(options);

  // try {
  //   const payment = await razorpay.orders.create(options);
  //   res.json(payment);
  // } catch (error) {
  //   res.status(500).json({ error: 'Payment creation failed' });
  // }
});

module.exports = router;
