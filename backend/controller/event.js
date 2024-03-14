const express = require('express');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Shop = require('../model/shop');
const Event = require('../model/event');
const ErrorHandler = require('../utils/ErrorHandler');
const { isSeller, isAdmin, isAuthenticated } = require('../middleware/auth');
const router = express.Router();
const cloudinary = require('cloudinary');
const Category = require('../model/category');
const product = require('../model/product');
const slugify = require('slugify');

// create event
router.post(
  '/create-event',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(new ErrorHandler('Shop Id is invalid!', 400));
      } else {
        let images = [];

        if (typeof req.body.images === 'string') {
          images.push(req.body.images);
        } else {
          images = req.body.images;
        }

        const imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
          if (!images.public_id) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
              folder: 'events',
            });

            imagesLinks.push({
              public_id: result.public_id,
              url: result.secure_url,
            });
          }
        }

        const productData = req.body;
        productData.images = imagesLinks;
        productData.shop = shop;
        if (productData?.name) {
          productData.slug = slugify(productData?.name)
        }

        const eventStart = productData?.start_Date.substring(0, 10)
        const today = new Date().toISOString().substring(0, 10);

        if (eventStart === today) {
          productData.status = "Running"
        } else {
          productData.status = "NotStarted"
        }

        const event = await Event.create(productData);

        res.status(201).json({
          success: true,
          event,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);




// create draft event
router.post(
  '/create-draft-event',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(new ErrorHandler('Shop Id is invalid!', 400));
      } else {
        let images = [];

        if (typeof req.body.images === 'string') {
          images.push(req.body.images);
        } else {
          images = req.body.images;
        }

        const imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
          if (!images.public_id) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
              folder: 'events',
            });

            imagesLinks.push({
              public_id: result.public_id,
              url: result.secure_url,
            });
          }
        }

        const productData = req.body;
        productData.images = imagesLinks;
        productData.shop = shop;
        if (productData?.name) {
          productData.slug = slugify(productData?.name)
        }

        if (productData?.start_Date) {
          const eventStart = productData?.start_Date.substring(0, 10)
          const today = new Date().toISOString().substring(0, 10);

          if (eventStart === today) {
            productData.status = "Running"
          } else {
            productData.status = "NotStarted"
          }
        } else {
          productData.status = "NotStarted"
        }


        const event = await Event.create(productData);

        res.status(201).json({
          success: true,
          event,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// save draft event
router.post(
  '/save-draft-event',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { id, data } = req.body;
      const shopId = data.shopId;
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(new ErrorHandler('Shop Id is invalid!', 400));
      } else {

        let foundEvent = await Event.findById(id)

        let image = foundEvent?.images;
        let images = [];

        if (typeof data.images === 'string') {
          images.push(data.images);
        } else {
          images = data.images;
        }

        const imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
          if (image[0]?.public_id && !images[0]?.public_id) {
            await cloudinary.v2.uploader.destroy(image[0].public_id)

            const result = await cloudinary.v2.uploader.upload(images[i], {
              folder: 'events',
            });

            imagesLinks.push({
              public_id: result.public_id,
              url: result.secure_url,
            });
          } else if (!images[0]?.public_id) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
              folder: 'events',
            });

            imagesLinks.push({
              public_id: result.public_id,
              url: result.secure_url,
            });
          }
        }

        const productData = data;
        productData.images = imagesLinks;
        productData.shop = shop;
        if (productData?.name) {
          productData.slug = slugify(productData?.name)
        }

        if (productData?.start_Date) {
          const eventStart = productData?.start_Date.substring(0, 10)
          const today = new Date().toISOString().substring(0, 10);

          if (eventStart === today) {
            productData.status = "Running"
          } else {
            productData.status = "NotStarted"
          }
        } else {
          productData.status = "NotStarted"
        }


        const event = await Event.findByIdAndUpdate(id, productData, { new: true });

        res.status(201).json({
          success: true,
          event,
        });
      }
    } catch (error) {
      console.log(error)
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get event Product
router.get(
  '/get-eventProduct/:id',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const product = [];
      const sellers = await Event.find()
        .then((result) => {
          result.map((val) => {
            val.productArray.map((value) => {
              if (value._id === req.params.id) {
                product.push(value);
              }
            });
          });
          res.status(201).json({
            success: true,
            product,
          });
        })
        .catch((error) => {
          return next(new ErrorHandler(error.message, 500));
        });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get all category and products
router.get(`/get-all-cat-product/:id`, async (req, res, next) => {
  try {
    await Category.find()
      .then(async (category) => {
        await product
          .find({ shopId: req.params.id, approved: true })
          .then((product) => {
            res.status(201).json({
              success: true,
              category,
              product,
            });
          })
          .catch((error) => {
            return next(new ErrorHandler(error, 400));
          });
      })
      .catch((error) => {
        return next(new ErrorHandler(error, 400));
      });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// get all events
router.get('/get-all-draft-events/:id', async (req, res, next) => {
  try {
    const events = await Event.find({ draft: true, shopId: req.params.id });
    res.status(201).json({
      success: true,
      events,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// get all draft events
router.get('/get-all-events', async (req, res, next) => {
  try {
    const events = await Event.find({ status: "Running", draft: false });
    res.status(201).json({
      success: true,
      events,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// get all events products
router.get(
  '/get-all-event-products/:id',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const events = await Event.find({ slug: req.params.id });

      res.status(201).json({
        success: true,
        Status: 'Success',
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all events products store
router.get(
  '/get-all-event-products-store/:id',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const events = await Event.find({ _id: req.params.id });

      res.status(201).json({
        success: true,
        Status: 'Success',
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// update event
router.put(
  '/update-event-store', isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const {
        productData
      } = req.body;
      const shopId = req.seller._id;
      const proId = productData?._id;

      if (!shopId || !proId) {
        return next(
          new ErrorHandler('Invalid request. Missing shopId or eventId.', 400)
        );
      }

      // Find the shop by ID
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(new ErrorHandler('Shop Id is invalid!', 400));
      }

      // Find the existing product by ID
      const productFind = await Event.findById(proId);
      if (!productFind) {
        return next(new ErrorHandler('Product Not Found!', 400));
      }


      // Update the product with the new data
      const updatedProduct = await Event.findOneAndUpdate(
        { _id: proId },
        productData,
        { new: true } // Ensure you get the updated document
      );

      res.status(201).json({
        success: true,
        event: updatedProduct,
      });
    } catch (error) {
      console.error(error);
      return next(
        new ErrorHandler(
          'Something went wrong while processing the request.',
          500
        )
      );
    }
  })
);


// get all events of a shop
router.get(
  '/get-all-events/:id',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const events = await Event.find({ shopId: req.params.id });

      res.status(201).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// delete event of a shop
router.delete(
  '/delete-shop-event/:id',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const event = await Event.findById(req.params.id);

      for (let i = 0; i < event.images.length; i++) {
        const result = await cloudinary.v2.uploader.destroy(
          event.images[i].public_id
        );
      }

      await Event.findByIdAndDelete(req.params.id);

      res.status(201).json({
        success: true,
        message: 'Event Deleted successfully!',
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// all events --- for admin
router.get(
  '/admin-all-events',
  isAuthenticated,
  isAdmin('Admin'),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const events = await Event.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
