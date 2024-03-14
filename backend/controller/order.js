const express = require('express');
const router = express.Router();
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const { isAuthenticated, isSeller, isAdmin } = require('../middleware/auth');
const Order = require('../model/order');
const Shop = require('../model/shop');
const Product = require('../model/product');
const Event = require('../model/event');
const axios = require('axios');
const order = require('../model/order');
const TwoSideMails = require('../utils/TwoSideMails');
const TwoSideOrderMails = require('../utils/TwoSideOrderMail');
const sendMail = require('../utils/sendMail');

// create new order
router.post(
  '/create-order',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const {
        cart,
        cod,
        sellerCart,
        shippingAddress,
        BillingAddress,
        shipping_is_billing,
        user,
        totalPrice,
        paymentInfo,
        shipping,
        discountPrice
      } = req.body;

      for (const val of cart) {
        try {
          if (val.active) {
            const allEvents = await Event.find();
            const event = allEvents?.find((event) =>
              event.productArray.some((item) => item._id === val._id)
            );
            const product = event.productArray.find(
              (item) => item._id === val._id
            );
            const eventID = event._id.toString();
            if (product.showInputs === true) {
              await updateEventOrderColor(eventID, val.qty, val);
            } else {
              await updateEventOrder(eventID, val.qty, val);
            }
          } else {
            const product = await Product.findById(val._id);

            if (product.showInputs === true) {
              await updateOrderColor(val._id, val.qty, val);
            } else {
              await updateOrder(val._id, val.qty, val);
            }
          }
        } catch (error) {
          console.log(error, 'error');
        }
      }

      async function updateOrder(id, qty, val) {
        const product = await Product.findById(id);

        if (
          val.selectedColor.haveAttributes &&
          val.selectedColor.attributeStock
        ) {
          product.attributes[0].values.forEach((i) => {
            if (i._id.toString() === val.attrId) {
              i.stock -= qty;
              i.sold_out += qty;
            }
          });

          await Product.findOneAndUpdate(
            { _id: id },
            { $set: { attributes: product.attributes } }
          );
        } else {
          await Product.findOneAndUpdate(
            { _id: id },
            {
              $set: {
                stock: product.stock - qty,
                sold_out: product.sold_out + qty,
              },
            }
          );
        }
      }

      async function updateOrderColor(id, qty, val) {
        try {
          const product = await Product.findById(id);

          if (
            val.selectedColor.haveAttributes &&
            val.selectedColor.attributeStock
          ) {
            product.colorInputs.forEach((color) => {
              if (color._id.toString() === val.selectedColor._id) {
                color.attributes[0].values.forEach((i) => {
                  if (i._id.toString() === val.attrId) {
                    i.stock -= qty;
                    i.sold_out += qty;
                  }
                });
              }
            });

            await Product.findOneAndUpdate(
              { _id: id },
              { $set: { colorInputs: product.colorInputs } }
            );
          } else {
            product.colorInputs.forEach((color) => {
              if (color._id.toString() === val.selectedColor._id) {
                color.stock -= qty;
                color.sold_out += qty;
              }
            });

            await Product.findOneAndUpdate(
              { _id: id },
              { $set: { colorInputs: product.colorInputs } }
            );
          }
        } catch (error) {
          console.error(error);
        }
      }

      async function updateEventOrder(id, qty, val) {
        const allEvents = await Event.findById(id);
        const product = allEvents.productArray.find(
          (item) => item._id === val._id
        );

        if (
          val.selectedColor.haveAttributes &&
          val.selectedColor.attributeStock
        ) {
          product.attributes[0].values.forEach((i) => {
            if (i._id.toString() === val.attrId) {
              i.eventStock -= qty;
              i.sold_out += qty;
            }
          });

          await Event.findOneAndUpdate(
            { _id: id },
            { $set: { productArray: allEvents.productArray } }
          );
        } else {
          product.eventStock -= qty;
          product.sold_out + qty;
          await Event.findOneAndUpdate(
            { _id: id },
            { $set: { productArray: allEvents.productArray } }
          );
        }
      }

      async function updateEventOrderColor(id, qty, val) {
        try {
          const allEvents = await Event.findById(id);
          const product = allEvents.productArray.find(
            (item) => item._id === val._id
          );

          if (
            val.selectedColor.haveAttributes &&
            val.selectedColor.attributeStock
          ) {
            product.colorInputs.forEach((color) => {
              if (color._id.toString() === val.selectedColor._id) {
                color.attributes[0].values.forEach((i) => {
                  if (i._id.toString() === val.attrId) {
                    i.eventStock -= qty;
                    i.sold_out += qty;
                  }
                });
              }
            });

            await Event.findOneAndUpdate(
              { _id: id },
              { $set: { productArray: allEvents.productArray } }
            );
          } else {
            product.colorInputs.forEach((color) => {
              if (color._id.toString() === val.selectedColor._id) {
                color.eventStock -= qty;
                color.sold_out += qty;
              }
            });

            await Event.findOneAndUpdate(
              { _id: id },
              { $set: { productArray: allEvents.productArray } }
            );
          }
        } catch (error) {
          console.error(error);
        }
      }

      const shopItemsMap = new Map();

      for (const item of cart) {
        const shopId = item.shopId;
        if (!shopItemsMap.has(shopId)) {
          shopItemsMap.set(shopId, []);
        }
        shopItemsMap.get(shopId).push(item);
      }

      const orders = [];

      for (const [shopId, items] of shopItemsMap) {
        const order = await Order.create({
          cart: items,
          shippingAddress,
          cod,
          sellerCart,
          BillingAddress,
          shipping_is_billing,
          shipping,
          user,
          totalPrice,
          paymentInfo,
          discountPrice
        });
        orders.push(order);
      }

      const optionUser = {
        email: user?.email,
        subject: 'Order Placed Successfully',
        message: 'Order is placed successfully wait for the confirmation of order!'
      }

      await sendMail(optionUser)

      await sellerCart?.forEach(async (seller) => {
        const found = await Shop.findById(seller?.sellerID)
        if (found) {
          const sellerSide = {
            email: found?.email,
            subject: 'New Order Received',
            message: 'New Order Received Confirm the order'
          }
          await sendMail(sellerSide)
        }
      })



      res.status(201).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get all orders of user
router.get(
  '/get-all-orders/:userId',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find({ 'user._id': req.params.userId }).sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);



// get all orders of seller
router.get(
  '/get-seller-all-orders/:shopId',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find({
        'cart.shopId': req.params.shopId,
      }).sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update order status for seller
router.put(
  '/update-order-status/:id',
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);
      const products = req.body.products;

      let productNames = [];

      if (!order) {
        return next(new ErrorHandler('Order not found with this id', 400));
      }
      // if (req.body.status === 'Transferred to delivery partner') {
      //   order.cart.forEach(async (o) => {
      //     const foundProduct = products?.find((product) => product._id === o._id)
      //     if (foundProduct) {
      //       o.status = req.body.status;
      //     }
      //     // await updateOrder(o._id, o.qty);
      //   });
      // }

      order.cart.forEach(async (o) => {
        const foundProduct = await products?.find((product) => product._id === o._id)
        if (foundProduct) {
          o.status = req.body.status;
          productNames.push({
            name: foundProduct?.name,
            SKU: foundProduct?.selectedColor?.SKU
          })
        }
      });

      order.status = req.body.status;

      if (req.body.status === 'Delivered') {
        order.deliveredAt = Date.now();
        order.paymentInfo.status = 'Succeeded';
        // const serviceCharge = order.totalPrice * 0.1;
        // await updateSellerInfo(order.totalPrice - serviceCharge);
        await updateSellerInfo(order.totalPrice);
      }

      order.markModified('cart');

      await order.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        order,
      });

      async function updateOrder(id, qty) {
        const product = await Product.findById(id);

        product.stock -= qty;
        product.sold_out += qty;

        await product.save({ validateBeforeSave: false });
      }

      async function updateSellerInfo(amount) {
        const seller = await Shop.findById(req.seller.id);

        seller.availableBalance = amount;

        await seller.save();
      }

      const optionUser = {
        email: order?.user?.email,
        subject: 'Order Status',
        message: `Your OrderId: #${req.params.id.slice(0, 8)}  Status Updated. Status : ${req.body.status}. Your Order ${productNames}`
      }

      await sendMail(optionUser)

    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// give a refund ----- user
router.put(
  '/order-refund/:id',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler('Order not found with this id', 400));
      }

      let product = null;

      order.cart.map((val) => {
        if (val._id === req.body.productID) {
          product = val
          val.status = req.body.status;
          order.status = req.body.status;
        }
      });

      // order.status = req.body.status;

      order.markModified('cart');

      await order.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        order,
        message: 'Order Refund Request successfully!',
      });

      var objectId = order?._id;
      var id = objectId.valueOf();

      const optionUser = {
        email: order?.user?.email,
        subject: 'Order Refund',
        message: `Your Request for Refund of OrderId: #${id.slice(0, 8)} for ${product?.name} ( SKU : ${product?.selectedColor?.SKU} ) is sent Successfully`
      }

      await sendMail(optionUser)

      await order?.sellerCart?.forEach(async (seller) => {
        const found = await Shop.findById(product?.shopId)
        if (found) {
          const sellerSide = {
            email: found?.email,
            subject: 'Order Refund Request',
            message: `Request for Refund of OrderId: #${id.slice(0, 8)} for ${product?.name} ( SKU : ${product?.selectedColor?.SKU} ) is received`
          }
          await sendMail(sellerSide)
        }
      })
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// accept the refund ---- seller
router.put(
  '/order-refund-success/:id',
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler('Order not found with this id', 400));
      }

      var objectId = order?._id;
      var id = objectId.valueOf();

      let product = null;

      if (req.body.status === 'Rejected refund') {
        order.cart.map(async (val) => {
          if (val._id === req.body.productID) {
            product = val;
            val.status = req.body.status;
            order.status = req.body.status;
          }
        });

        // order.status = req.body.status;
        order.markModified('cart');

        await order.save();

        res.status(200).json({
          success: true,
          message: 'Order Refund Rejection successfull!',
        });


        //mail
        const optionUser = {
          email: order?.user?.email,
          subject: 'Order Refund Rejected',
          message: `Your Refund of OrderId: #${id.slice(0, 8)} for ${product?.name} ( SKU : ${product?.selectedColor?.SKU} ) is Rejected`
        }

        await sendMail(optionUser)

        await order?.sellerCart?.forEach(async (seller) => {
          const found = await Shop.findById(product?.shopId)
          if (found) {
            const sellerSide = {
              email: found?.email,
              subject: 'Order Refund Rejected',
              message: `Refund of OrderId: #${id.slice(0, 8)} for ${product?.name} ( SKU : ${product?.selectedColor?.SKU} ) is rejected Successfully`
            }
            await sendMail(sellerSide)
          }
        })
      } else if (req.body.status === 'Refund Success') {
        order.cart.map(async (val) => {
          if (val._id === req.body.productID) {
            product = val;
            val.status = req.body.status;
            order.status = req.body.status;
            await updateOrder(val._id, val.qty);
            await updateSellerInfo(val.finalPrice)
          }
        });

        async function updateSellerInfo(amount) {
          const seller = await Shop.findById(req.seller.id);
          const withdraawamt = seller.availableBalance - amount
          seller.availableBalance = withdraawamt;

          await seller.save();
        }

        order.cart.map(async (val) => {
          if (val.status === 'Processing refund') {
            order.status = 'Processing refund';
          }
        });

        order.markModified('cart');

        await order.save();

        res.status(200).json({
          success: true,
          message: 'Order Refund successfull!',
        });

        async function updateOrder(id, qty) {
          const product = await Product.findById(id);

          product.stock += qty;
          product.sold_out -= qty;

          await product.save({ validateBeforeSave: false });
        }

        //mail
        const optionUser = {
          email: order?.user?.email,
          subject: 'Order Refund Success',
          message: `Your Refund of OrderId: #${id.slice(0, 8)} for ${product?.name} ( SKU : ${product?.selectedColor?.SKU} ) is Refunded Successfully`
        }

        await sendMail(optionUser)

        await order?.sellerCart?.forEach(async (seller) => {
          const found = await Shop.findById(product?.shopId)
          if (found) {
            const sellerSide = {
              email: found?.email,
              subject: 'Order Refund Success',
              message: `Refund of OrderId: #${id.slice(0, 8)} for ${product?.name} ( SKU : ${product?.selectedColor?.SKU} ) is Refunded Successfully`
            }
            await sendMail(sellerSide)
          }
        })

      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// reject the refund ---- seller
router.put(
  '/order-refund-reject/:id',
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler('Order not found with this id', 400));
      }

      console.log(order);

      // const options = {
      //   email: order.user.email,
      //   subject: 'Refund Rejection',
      //   message: `Your ${order.name} is Approved You can login to your Shop Now`,
      // };

      // sendMail(options)
      //       .then((result2) => {
      //         res.status(201).json({
      //           Status: 'Success',
      //         });
      //       })
      //       .catch((error) => {
      //         return next(new ErrorHandler(error.message, 500));
      //       });

      // order.status = req.body.status;

      // await order.save();

      res.status(200).json({
        success: true,
        message: 'Order Refund Rejected successfull!',
      });

      if (req.body.status === 'Refund Success') {
        order.cart.forEach(async (o) => {
          await updateOrder(o._id, o.qty);
        });
      }

      // async function updateOrder(id, qty) {
      //   const product = await Product.findById(id);

      //   product.stock += qty;
      //   product.sold_out -= qty;

      //   await product.save({ validateBeforeSave: false });
      // }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// all orders --- for admin
router.get(
  '/admin-all-orders',
  isAuthenticated,
  isAdmin('Admin'),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find().sort({
        deliveredAt: -1,
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
