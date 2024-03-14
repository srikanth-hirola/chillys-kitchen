const express = require('express');
const { isSeller, isAuthenticated, isAdmin } = require('../middleware/auth');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const router = express.Router();
const cloudinary = require('cloudinary');
const ErrorHandler = require('../utils/ErrorHandler');
const Category = require('../model/category');
const Product = require('../model/product');
const TwoSideMails = require('../utils/TwoSideMails');
const sendMail = require('../utils/sendMail');
const User = require('../model/user');
const Shop = require('../model/shop');
const { cacheMiddleware, flushCategories } = require('../middleware/cacheMiddleware');



// get all categories of a shop
router.get(
  '/get-all-categories', cacheMiddleware,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const categories = await Category.find({ approved: true });
      res.status(201).json({
        success: true,
        categories,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);


router.get(
  '/search', cacheMiddleware,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { category, subcategory, subsubcategory } = req.query;
      const filter = { approved: true };

      if (category) {
        var catFound = await Category.findOne({ name: category });
        filter.category = new RegExp(catFound?._id, 'i');
      }
      if (subcategory) {
        if (catFound) {
          // var subFound = catFound?.subcategories?.find((sub) => sub?.name === subcategory)
          catFound?.subcategories?.map((sub) => {
            if (sub?.name.toLocaleLowerCase().trim() === subcategory.toLocaleLowerCase().trim()) {
              filter.subCatgory = new RegExp(sub?._id, 'i');
            }
          })
        }
      }
      if (subsubcategory) {
        if (subFound) {
          // var subSubFound = subFound?.subSubcategories?.find((subSub) => subSub?.name === subsubcategory)
          subFound?.subSubcategories?.map((subSub) => {
            if (subSub?.name.toLocaleLowerCase().trim() === subsubcategory.toLocaleLowerCase().trim()) {
              filter.subSubCategory = new RegExp(subSub?._id, 'i');
            }
          })
        }
      }

      const products = await Product.find(filter);

      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);


// get top categories of a shop
router.get(
  '/get-top-all-categories',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const categories = await Category.find({ approved: true });
      res.status(201).json({
        success: true,
        categories,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all requested categories of a shop
router.get(
  '/requested-categories',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const categories = await Category.find({ approved: false });
      res.status(201).json({
        success: true,
        categories,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Add Category
router.post(
  '/add-category', flushCategories,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const category = req.body.categories[0];

      let logoToUpload = category.CatImg;
      const myCloud = await cloudinary.v2.uploader.upload(logoToUpload, {
        folder: 'siteCategoryImages',
      });

      logoToUpload = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };

      category.CatImg = logoToUpload;

      const newCategory = new Category(category);

      await Category.insertMany(newCategory)
        .then((result) => {
          res.status(201).json({
            Status: 'Success',
          });
        })
        .catch((error) => {
          console.log(error)
          return next(new ErrorHandler(error, 400));
        });
      // let images = [];

      // if (req.body.images.length === 0) {
      //   return next(new ErrorHandler('Category Image is Required!', 400));
      // }

      // if (typeof req.body.images === 'string') {
      //   images.push(req.body.images);
      // } else {
      //   images = req.body.images;
      // }

      // const imagesLinks = [];

      // for (let i = 0; i < images.length; i++) {
      //   const result = await cloudinary.v2.uploader.upload(images[i], {
      //     folder: 'category',
      //   });

      //   imagesLinks.push({
      //     public_id: result.public_id,
      //     url: result.secure_url,
      //   });
      // }

      // const categoryData = req.body;
      // categoryData.images = imagesLinks;

      // const category = await Category.create(categoryData);

      // res.status(201).json({
      //   success: true,
      //   category,
      // });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// request Category
router.post(
  '/request-category', flushCategories,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const category = req.body.categories[0];

      let logoToUpload = category.CatImg;
      const myCloud = await cloudinary.v2.uploader.upload(logoToUpload, {
        folder: 'siteCategoryImages',
      });

      logoToUpload = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };

      category.CatImg = logoToUpload;

      const newCategory = new Category(category);

      await Category.insertMany(newCategory)
        .then(async (result) => {
          res.status(201).json({
            Status: 'Success',
          });

          const adminSide = {
            subject: 'New Category Request',
            message: `New Category named ${category?.name} is requested`
          }

          const sellerSide = {
            subject: 'New Category Added',
            message: `${category?.name} Category is added successfully`
          }

          const shopDetails = await Shop.findById(category?.shopID)

          await TwoSideMails(shopDetails?.email, adminSide, sellerSide)
        })
        .catch((error) => {
          console.log(error)
          return next(new ErrorHandler(error, 400));
        });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Custom Category
router.put(
  '/custom-category', flushCategories,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { existingName, categoryName, subCat, CatImg } = req.body;

      const found = await Category.findOne({ name: existingName })

      if (!found) {
        res.status(500).json({
          Status: 'Failed',
          message: "Category Not Found"
        });
        return;
      }

      let newImg = CatImg;

      if (!CatImg?.url) {
        if (found?.CatImg) {
          const imageId = found?.CatImg?.public_id;
          await cloudinary.v2.uploader.destroy(imageId);
          const myCloud = await cloudinary.v2.uploader.upload(CatImg, {
            folder: 'siteCategoryImages',
          });

          newImg = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };
        } else {
          const myCloud = await cloudinary.v2.uploader.upload(CatImg, {
            folder: 'siteCategoryImages',
          });

          newImg = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };
        }
      }

      await Category.findOneAndUpdate(
        { name: existingName },
        {
          $set: {
            name: categoryName,
            subcategories: subCat,
            CatImg: newImg
          },
        }
      )
        .then(async (result) => {
          res.status(201).json({
            Status: 'Success',
          });

          const adminSide = {
            email: process.env.SMPT_MAIL,
            subject: 'Category Customized',
            message: `${existingName} Catgory is Customized!`
          }

          await sendMail(adminSide)

        })
        .catch((e) => {
          return next(new ErrorHandler(error, 400));
        });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Delete Category
router.delete(
  '/delete-category/:id', flushCategories,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { id } = req.params;

      const found = await Category.findById(id)

      if (!found) {
        res.status(500).json({
          Status: 'Failed',
          message: "Category Not Found"
        });
        return;
      }

      if (found?.CatImg) {
        const imageId = found?.CatImg?.public_id;
        await cloudinary.v2.uploader.destroy(imageId);
      }

      await Product.deleteMany({ category: found?.name });

      await Category.findByIdAndDelete(id)
        .then((result) => {
          res.status(201).json({
            Status: 'Success',
          });
        })
        .catch((e) => {
          return next(new ErrorHandler(error, 400));
        });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// approve Category
router.put(
  '/approve-category/:id', flushCategories,
  catchAsyncErrors(async (req, res, next) => {
    try {
      await Category.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            approved: true,
          },
        }
      )
        .then(async (result) => {
          res.status(201).json({
            Status: 'Success',
          });

          const adminSide = {
            subject: 'New Category Approved',
            message: `New Category named ${result?.name} is Approved`
          }

          const sellerSide = {
            subject: 'New Category Approved',
            message: `${result?.name} Category is Approved successfully`
          }

          const shopDetails = await Shop.findById(result?.shopID)

          await TwoSideMails(shopDetails?.email, adminSide, sellerSide)
        })
        .catch((e) => {
          return next(new ErrorHandler(error, 400));
        });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);


//delete Category
router.delete(
  '/delete-categories/:id', flushCategories,
  // isAdmin('Admin'),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const category = await Category.findOneAndDelete({ _id: req.params.id });

      const result = await cloudinary.v2.uploader.destroy(
        category?.CatImg?.public_id
      );

      res.status(201).json({
        success: true,
        category,
        Status: "Success"
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;
