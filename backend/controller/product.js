const express = require('express');
const { isSeller, isAuthenticated, isAdmin } = require('../middleware/auth');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const router = express.Router();
const Product = require('../model/product');
const Order = require('../model/order');
const Shop = require('../model/shop');
const cloudinary = require('cloudinary');
const ErrorHandler = require('../utils/ErrorHandler');
const Category = require('../model/category');
const user = require('../model/user');
const sendMail = require('../utils/sendMail');
const TwoSideMails = require('../utils/TwoSideMails');
const slugify = require('slugify');
const { cacheMiddleware, flushProducts, flushCategories, flushProductsByCategory } = require('../middleware/cacheMiddleware');


//get total length of products
router.get('/get-published-products/length', cacheMiddleware, async (req, res) => {
  try {
    const length = await Product.countDocuments({
      approved: true,
      draft: false,
    })

    res.status(201).json({
      success: true,
      length,
    });
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

//get all filters
router.get('/get-published-products/filters', async (req, res) => {
  try {
    const page = req.query?.search;
    let filters
    if (page) {
      filters = await Product.find({
        approved: true,
        draft: false,
      }, { category: 1, subCatgory: 1, ratings: 1, brandName: 1, _id: 1 })
    } else {
      filters = await Product.find({
        approved: true,
        draft: false,
      }, { category: 1, subCatgory: 1, ratings: 1, brandName: 1, _id: 1 })
    }


    res.status(201).json({
      success: true,
      filters,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


//get products according to page
router.get('/get-published-products/pagination', cacheMiddleware, async (req, res) => {
  const page = req.query.page || 1;
  const ITEMS_PER_PAGE = req.query.limit || 10
  try {

    const products = await Product.find({
      approved: true,
      draft: false,
    }).sort({ _id: -1 })
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE)
      .exec();
    // const result = await Blog.find({}, { _id: 1, title: 1, createdAt: 1, post_date: 1, large_thumb: 1, excerpt: 1, read_time: 1, author: 1, category: 1, slug: 1, })
    //   .sort({ _id: -1 })
    //   .skip((page - 1) * ITEMS_PER_PAGE)
    //   .limit(ITEMS_PER_PAGE)
    //   .exec();

    res.status(201).json({
      success: true,
      products,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// create product
router.post(
  '/create-product', flushProducts, flushProductsByCategory,
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
          const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'products',
          });

          imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
          });
        }

        const productData = req.body;
        productData.images = imagesLinks;
        productData.shop = shop;

        const product = await Product.create(productData);

        res.status(201).json({
          success: true,
          product,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// requested product
// router.post(
//   '/requested-product',
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const shopId = req.body.shopId;
//       const shop = await Shop.findById(shopId);
//       if (!shop) {
//         return next(new ErrorHandler('Shop Id is invalid!', 400));
//       } else {
//         let images = [];
//         if (req.body.images.length === 0) {
//           return next(new ErrorHandler('Product Images are Required!', 400));
//         }
//         if (typeof req.body.images === 'string') {
//           images.push(req.body.images);
//         } else {
//           images = req.body.images;
//         }
//         const imagesLinks = [];
//         for (let i = 0; i < images.length; i++) {
//           const result = await cloudinary.v2.uploader.upload(images[i], {
//             folder: 'products',
//           });
//           imagesLinks.push({
//             public_id: result.public_id,
//             url: result.secure_url,
//           });
//         }
//         const productData = req.body;
//         productData.images = imagesLinks;

//         if (req.body.showInputs === true) {
//           for (let i = 0; i < req.body.colorInputs.length; i++) {
//             const result1 = await cloudinary.v2.uploader.upload(
//               req.body.colorInputs[i].image,
//               {
//                 folder: 'products',
//               }
//             );
//             req.body.colorInputs[i].image = result1.public_id;
//           }

//           const newColorImageInputs = req.body.colorInputs;

//           productData.shop = shop;
//           productData.colorInputs = newColorImageInputs;

//           const product = await Product.create(productData);
//           res.status(201).json({
//             success: true,
//             product,
//           });
//         } else {
//           const productData = req.body;
//           productData.shop = shop;
//           const product = await Product.create(productData);
//           res.status(201).json({
//             success: true,
//             product,
//           });
//         }
//       }
//     } catch (error) {
//       return next(new ErrorHandler(error, 400));
//     }
//   })
// );
// router.post(
//   '/requested-product',
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const shopId = req.body.shopId;

//       const shop = await Shop.findById(shopId);

//       if (!shop) {
//         return next(new ErrorHandler('Shop Id is invalid!', 400));
//       }

//       let images = [];

//       if (req.body.images && req.body.images.length > 0) {
//         const imagesLinks = [];

//         for (let i = 0; i < req.body.images.length; i++) {
//           const result = await cloudinary.v2.uploader.upload(
//             req.body.images[i],
//             {
//               folder: 'products',
//             }
//           );
//           imagesLinks.push({
//             public_id: result.public_id,
//             url: result.secure_url,
//           });
//         }

//         req.body.images = imagesLinks;
//       } else {
//       }

//       // Handle main image upload
//       if (req.body.mainImage && req.body.mainImage.url !== '') {
//         const mainImageResult = await cloudinary.v2.uploader.upload(
//           req.body.mainImage.url,
//           {
//             folder: 'products',
//           }
//         );
//         req.body.mainImage = {
//           public_id: mainImageResult.public_id,
//           url: mainImageResult.secure_url,
//         };
//       } else {
//       }

//       // if (req.body.showInputs === true) {
//       //   for (let i = 0; i < req.body.colorInputs.length; i++) {
//       //     const result1 = await cloudinary.v2.uploader.upload(
//       //       req.body.colorInputs[i].image,
//       //       {
//       //         folder: 'products',
//       //       }
//       //     );
//       //     req.body.colorInputs[i].image = result1.public_id;
//       //   }

//       //   const newColorImageInputs = req.body.colorInputs;

//         if (req.body.showInputs && req.body.colorInputs.length > 0) {
//           const colorImagePromises = req.body.colorInputs.map(
//             async (colorInput, index) => {
//               console.log('befor if');
//               if (colorInput.image.url) {
//                 console.log('after if');
//                 const colorImageResult = await cloudinary.v2.uploader.upload(
//                   colorInput.image.url,
//                   {
//                     folder: 'products',
//                   }
//                 );
//                 colorInput.image = {
//                   public_id: colorImageResult.public_id,
//                   url: colorImageResult.secure_url,
//                 };
//               }
//               return colorInput;
//             }
//           );
//           req.body.colorInputs = await Promise.all(colorImagePromises);
//         }

//         const productData = {
//           ...req.body,
//           shop: shop,
//           // colorInputs: newColorImageInputs,
//         };

//         const product = await Product.create(productData);
//         res.status(201).json({
//           success: true,
//           product,
//         });
//       // } else {
//       //   const productData = {
//       //     ...req.body,
//       //     shop: shop,
//       //   };

//       //   const product = await Product.create(productData);
//       //   res.status(201).json({
//       //     success: true,
//       //     product,
//       //   });
//       // }
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 400));
//     }
//   })
// );

router.post(
  '/requested-product', flushProducts, flushProductsByCategory,
  catchAsyncErrors(async (req, res, next) => {
    try {
      let images = [];

      if (req.body.images && req.body.images.length > 0) {
        const imagesLinks = await Promise.all(
          req.body.images.map(async (image) => {
            const result = await cloudinary.v2.uploader.upload(image, {
              folder: 'chilly_kitchen/products',
            });
            return {
              public_id: result.public_id,
              url: result.secure_url,
            };
          })
        );
        req.body.images = imagesLinks;
      }

      if (req.body.mainImage && req.body.mainImage?.url !== '') {
        const mainImageResult = await cloudinary.v2.uploader.upload(
          req.body.mainImage.url,
          {
            folder: 'chilly_kitchen/products',
          }
        );
        req.body.mainImage = {
          public_id: mainImageResult.public_id,
          url: mainImageResult.secure_url,
        };
      }

      if (req.body.showInputs && req.body.colorInputs.length > 0) {
        const colorImagePromises = req.body.colorInputs.map(
          async (colorInput) => {
            if (colorInput.image.url) {
              const colorImageResult = await cloudinary.v2.uploader.upload(
                colorInput.image.url,
                {
                  folder: 'chilly_kitchen/products',
                }
              );
              colorInput.image = {
                public_id: colorImageResult.public_id,
                url: colorImageResult.secure_url,
              };
            }
            return colorInput;
          }
        );
        req.body.colorInputs = await Promise.all(colorImagePromises);
      }

      if (req.body?.name) {
        req.body.slug = slugify(req.body?.name.toLowerCase());
      }

      const productData = {
        ...req.body,
      };

      const product = await Product.create(productData);
      res.status(201).json({
        success: true,
        product,
      });

      // const adminSide = {
      //   subject: 'New Product Request Received',
      //   message: 'Got new Product Request'
      // }

      // const sellerSide = {
      //   subject: 'New Product Added',
      //   message: 'New Product Created Successfully'
      // }

      // await TwoSideMails(shop?.email, adminSide, sellerSide)

    } catch (error) {
      console.log(error)
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// router.post(
//   '/requested-product',
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const shopId = req.body.shopId;
//       const shop = await Shop.findById(shopId);
//       if (!shop) {
//         return next(new ErrorHandler('Shop Id is invalid!', 400));
//       } else {
//         let images = [];
//         if (req.body.images.length > 0) {
//           const imagesLinks = [];
//           for (let i = 0; i < images.length; i++) {
//             const result = await cloudinary.v2.uploader.upload(images[i], {
//               folder: 'products',
//             });
//             imagesLinks.push({
//               public_id: result.public_id,
//               url: result.secure_url,
//             });
//           }
//           const productData = req.body;
//           productData.images = imagesLinks;
//           // return next(new ErrorHandler('Product Images are Required!', 400));
//         }
//          // Handle main image upload
//       if (productData.mainImage && productData.mainImage.url !== '') {
//         const mainImageResult = await cloudinary.v2.uploader.upload(
//           productData.mainImage.url,
//           {
//             folder: 'products',
//           }
//         );
//         productData.mainImage = {
//           public_id: mainImageResult.public_id,
//           url: mainImageResult.secure_url,
//         };
//       }

//         if (typeof req.body.images === 'string') {
//           images.push(req.body.images);
//         } else {
//           images = req.body.images;
//         }

//         if (req.body.showInputs === true) {
//           for (let i = 0; i < req.body.colorInputs.length; i++) {
//             const result1 = await cloudinary.v2.uploader.upload(
//               req.body.colorInputs[i].image,
//               {
//                 folder: 'products',
//               }
//             );
//             req.body.colorInputs[i].image = result1.public_id;
//           }

//           const newColorImageInputs = req.body.colorInputs;

//           productData.shop = shop;
//           productData.colorInputs = newColorImageInputs;

//           // if(productData.productIdState){
//           //   const shopID = shopId;
//           //   const name = productData.name;

//           // }

//           const product = await Product.create(productData);
//           res.status(201).json({
//             success: true,
//             product,
//           });
//         } else {
//           const productData = req.body;
//           productData.shop = shop;
//           const product = await Product.create(productData);
//           res.status(201).json({
//             success: true,
//             product,
//           });
//         }
//       }
//     } catch (error) {
//       return next(new ErrorHandler(error, 400));
//     }
//   })
// );

// create draft product
// router.post(
//   '/create-draft-product',
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const { formData, images, mainImage, colorInputsIndexUpdateImage } =
//         req.body;
//       const { shopId } = req.body;

//       // Input Validation: Check if required fields are present and in the expected format

//       if (!shopId) {
//         return next(
//           new ErrorHandler('Invalid request. Missing shopId or proId.', 400)
//         );
//       }

//       // if (!formData || !Array.isArray(formData.colorInputs)) {
//       //   return next(
//       //     new ErrorHandler(
//       //       'Invalid formData or colorInputs is not an array.',
//       //       400
//       //     )
//       //   );
//       // }

//       // Find the shop by ID
//       const shop = await Shop.findById(shopId);
//       if (!shop) {
//         return next(new ErrorHandler('Shop Id is invalid!', 400));
//       }

//       formData.shop = shop;

//       // Find the existing product by ID
//       // const productFind = await Product.findById(proId);
//       // if (!productFind) {
//       //   return next(new ErrorHandler('Product Not Found!', 400));
//       // }

//       // Handle main image upload
//       if (formData.mainImage.url && formData.mainImage.url !== '') {
//         const mainImageResult = await cloudinary.v2.uploader.upload(
//           formData.mainImage.url,
//           {
//             folder: 'products',
//           }
//         );
//         formData.mainImage = {
//           public_id: mainImageResult.public_id,
//           url: mainImageResult.secure_url,
//         };
//       } else {
//         // Handle case when no main image is provided.
//         // You might want to add some error handling here or skip this block if it's not required.
//       }

//       // Handle additional images upload
//       if (images && images.length > 0) {
//         const imagesLinks = await Promise.all(
//           images.map(async (image) => {
//             const result = await cloudinary.v2.uploader.upload(image, {
//               folder: 'products',
//             });
//             return {
//               public_id: result.public_id,
//               url: result.secure_url,
//             };
//           })
//         );
//         formData.images = formData.images.concat(imagesLinks);
//       }

//       // Handle color inputs if needed
//       if (formData.showInputs && formData.colorInputs.length > 0) {
//         const colorImagePromises = formData.colorInputs.map(
//           async (colorInput, index) => {
//             if (
//               colorInput.image.public_id &&
//               colorInputsIndexUpdateImage.includes(index)
//             ) {
//               const colorImageResult = await cloudinary.v2.uploader.upload(
//                 colorInput.image.public_id,
//                 {
//                   folder: 'products',
//                 }
//               );
//               colorInput.image = {
//                 public_id: colorImageResult.public_id,
//                 url: colorImageResult.secure_url,
//               };
//             }
//             return colorInput;
//           }
//         );
//         formData.colorInputs = await Promise.all(colorImagePromises);
//       }

//       // Update the product with the new data
//       const updatedProduct = await Product.create(formData);

//       res.status(201).json({
//         success: true,
//         product: updatedProduct,
//       });
//     } catch (error) {
//       console.error(error);
//       return next(
//         new ErrorHandler(
//           'Something went wrong while processing the request.',
//           500
//         )
//       );
//     }
//   })
// );

router.post(
  '/create-draft-product',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { formData, images, shopId } = req.body;
      if (!shopId) {
        return next(
          new ErrorHandler('Invalid request. Missing shopId or proId.', 400)
        );
      }

      // Find the shop by ID
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(new ErrorHandler('Shop Id is invalid!', 400));
      }

      formData.shop = shop;

      // Handle main image upload
      if (formData.mainImage.url && formData.mainImage.url !== '') {
        const mainImageResult = await cloudinary.v2.uploader.upload(
          formData.mainImage.url,
          {
            folder: 'products',
          }
        );
        formData.mainImage = {
          public_id: mainImageResult.public_id,
          url: mainImageResult.secure_url,
        };
      } else {
      }

      // Handle additional images upload
      if (images && images.length > 0) {
        const imagesLinks = await Promise.all(
          images.map(async (image) => {
            const result = await cloudinary.v2.uploader.upload(image, {
              folder: 'products',
            });
            return {
              public_id: result.public_id,
              url: result.secure_url,
            };
          })
        );

        formData.images = imagesLinks;
      }

      // Handle color inputs if needed
      if (formData.showInputs && formData.colorInputs.length > 0) {
        const colorImagePromises = formData.colorInputs.map(
          async (colorInput, index) => {
            if (colorInput.image.url) {
              const colorImageResult = await cloudinary.v2.uploader.upload(
                colorInput.image.url,
                {
                  folder: 'products',
                }
              );
              colorInput.image = {
                public_id: colorImageResult.public_id,
                url: colorImageResult.secure_url,
              };
            }
            return colorInput;
          }
        );
        formData.colorInputs = await Promise.all(colorImagePromises);
      }

      // creat draft product
      const product = await Product.create(formData);

      res.status(201).json({
        success: true,
        product: product,
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

//publish Draft Product
router.post(
  '/draft-publish-product', flushProducts,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const {
        formData,
        images,
        mainImage,
        colorInputsIndexUpdateImage,
        proId,
      } = req.body;

      const shopId = formData.shopId;

      // Input Validation: Check if required fields are present and in the expected format

      if (!shopId || !proId) {
        return next(
          new ErrorHandler('Invalid request. Missing shopId or proId.', 400)
        );
      }

      if (!formData || !Array.isArray(formData.colorInputs)) {
        return next(
          new ErrorHandler(
            'Invalid formData or colorInputs is not an array.',
            400
          )
        );
      }

      // Find the shop by ID
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(new ErrorHandler('Shop Id is invalid!', 400));
      }

      // Find the existing product by ID
      const productFind = await Product.findById(proId);
      if (!productFind) {
        return next(new ErrorHandler('Product Not Found!', 400));
      }

      // Handle main image upload
      if (mainImage && mainImage !== '') {
        const mainImageResult = await cloudinary.v2.uploader.upload(mainImage, {
          folder: 'products',
        });
        formData.mainImage = {
          public_id: mainImageResult.public_id,
          url: mainImageResult.secure_url,
        };
      }

      // Handle additional images upload
      if (images && images.length > 0) {
        const imagesLinks = await Promise.all(
          images.map(async (image) => {
            const result = await cloudinary.v2.uploader.upload(image, {
              folder: 'products',
            });
            return {
              public_id: result.public_id,
              url: result.secure_url,
            };
          })
        );
        formData.images = formData.images.concat(imagesLinks);
      }

      // Handle color inputs if needed
      if (formData.showInputs && formData.colorInputs.length > 0) {
        const colorImagePromises = formData.colorInputs.map(
          async (colorInput, index) => {
            if (
              colorInput.image.url &&
              colorInputsIndexUpdateImage.includes(index)
            ) {
              const colorImageResult = await cloudinary.v2.uploader.upload(
                colorInput.image.url,
                {
                  folder: 'products',
                }
              );
              colorInput.image = {
                public_id: colorImageResult.public_id,
                url: colorImageResult.secure_url,
              };
            }
            return colorInput;
          }
        );
        formData.colorInputs = await Promise.all(colorImagePromises);
      }

      // Update the product with the new data
      const updatedProduct = await Product.findOneAndUpdate(
        { _id: proId },
        formData,
        { new: true } // Ensure you get the updated document
      );

      res.status(201).json({
        success: true,
        product: updatedProduct,
      });
      const adminSide = {
        subject: 'New Product Request Received',
        message: 'Got new Product Request'
      }

      const sellerSide = {
        subject: 'New Product Request Send Successfully',
        message: 'sent Product Request'
      }

      await TwoSideMails(shop?.email, adminSide, sellerSide)
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

// router.post(
//   '/create-draft-product',
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const shopId = req.body.shopId;
//       const shop = await Shop.findById(shopId);
//       if (!shop) {
//         return next(new ErrorHandler('Shop Id is invalid!', 400));
//       } else {
//         if (req.body.mainImage !== '') {
//           const result = await cloudinary.v2.uploader.upload(
//             req.body.mainImage,
//             {
//               folder: 'products',
//             }
//           );
//           const productData = req.body;
//           productData.mainImage = {
//             public_id: result.public_id,
//             url: result.secure_url,
//           };
//         }
//         let images = [];
//         if (req.body.images.length === 0) {
//           if (req.body.showInputs === true) {
//             if (req.body.colorInputs.length > 0) {
//               for (let i = 0; i < req.body.colorInputs.length; i++) {
//                 const result1 = await cloudinary.v2.uploader.upload(
//                   req.body.colorInputs[i].image,
//                   {
//                     folder: 'products',
//                   }
//                 );
//                 req.body.colorInputs[i].image = result1.public_id;
//               }
//             }

//             const newColorImageInputs = req.body.colorInputs;

//             productData.shop = shop;
//             productData.colorInputs = newColorImageInputs;

//             const product = await Product.create(productData);
//             res.status(201).json({
//               success: true,
//               product,
//             });
//           } else {
//             const productData = req.body;
//             productData.shop = shop;
//             const product = await Product.create(productData);
//             res.status(201).json({
//               success: true,
//               product,
//             });
//           }
//           // return next(new ErrorHandler('Product Images are Required!', 400));
//         } else {
//           if (typeof req.body.images === 'string') {
//             images.push(req.body.images);
//           } else {
//             images = req.body.images;
//           }
//           const imagesLinks = [];
//           for (let i = 0; i < images.length; i++) {
//             const result = await cloudinary.v2.uploader.upload(images[i], {
//               folder: 'products',
//             });
//             imagesLinks.push({
//               public_id: result.public_id,
//               url: result.secure_url,
//             });
//           }
//           const productData = req.body;
//           productData.images = imagesLinks;

//           if (req.body.showInputs === true) {
//             for (let i = 0; i < req.body.colorInputs.length; i++) {
//               const result1 = await cloudinary.v2.uploader.upload(
//                 req.body.colorInputs[i].image,
//                 {
//                   folder: 'products',
//                 }
//               );
//               req.body.colorInputs[i].image = result1.public_id;
//             }

//             const newColorImageInputs = req.body.colorInputs;

//             productData.shop = shop;
//             productData.colorInputs = newColorImageInputs;

//             const product = await Product.create(productData);
//             res.status(201).json({
//               success: true,
//               product,
//             });
//           } else {
//             const productData = req.body;
//             productData.shop = shop;
//             const product = await Product.create(productData);
//             res.status(201).json({
//               success: true,
//               product,
//             });
//           }
//         }
//       }
//     } catch (error) {
//       console.log(error);
//       return next(new ErrorHandler(error, 400));
//     }
//   })
// );

// save draft product

router.post(
  '/save-draft-product',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const {
        formData,
        images,
        mainImage,
        colorInputsIndexUpdateImage,
        proId,
      } = req.body;
      const { shopId } = formData;

      if (!shopId || !proId) {
        return next(
          new ErrorHandler('Invalid request. Missing shopId or proId.', 400)
        );
      }

      if (!formData || !Array.isArray(formData.colorInputs)) {
        return next(
          new ErrorHandler(
            'Invalid formData or colorInputs is not an array.',
            400
          )
        );
      }

      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(new ErrorHandler('Shop Id is invalid!', 400));
      }

      const productFind = await Product.findById(proId);
      if (!productFind) {
        return next(new ErrorHandler('Product Not Found!', 400));
      }

      if (mainImage && mainImage !== '') {
        const mainImageResult = await cloudinary.v2.uploader.upload(mainImage, {
          folder: 'products',
        });
        formData.mainImage = {
          public_id: mainImageResult.public_id,
          url: mainImageResult.secure_url,
        };
      }

      if (images && images.length > 0) {
        const imagesLinks = await Promise.all(
          images.map(async (image) => {
            const result = await cloudinary.v2.uploader.upload(image, {
              folder: 'products',
            });
            return {
              public_id: result.public_id,
              url: result.secure_url,
            };
          })
        );
        if (formData.images === null) {
          formData.images = imagesLinks;
        } else {
          formData.images = formData.images.concat(imagesLinks);
        }
      }

      if (formData.showInputs && formData.colorInputs.length > 0) {
        const colorImagePromises = formData.colorInputs.map(
          async (colorInput, index) => {
            if (
              colorInput.image.url &&
              colorInputsIndexUpdateImage.includes(index)
            ) {
              const colorImageResult = await cloudinary.v2.uploader.upload(
                colorInput.image.url,
                {
                  folder: 'products',
                }
              );
              colorInput.image = {
                public_id: colorImageResult.public_id,
                url: colorImageResult.secure_url,
              };
            }
            return colorInput;
          }
        );
        formData.colorInputs = await Promise.all(colorImagePromises);
      }

      const updatedProduct = await Product.findOneAndUpdate(
        { _id: proId },
        formData,
        { new: true }
      );

      res.status(201).json({
        success: true,
        product: updatedProduct,
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

// router.post(
//   '/save-draft-product',
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const shopId = req.body.formData.shopId;
//       const shop = await Shop.findById(shopId);
//       if (!shop) {
//         return next(new ErrorHandler('Shop Id is invalid!', 400));
//       } else {
//         const proId = req.body.proId;
//         let productFind = await Product.findById(proId);
//         let productData = req.body.formData;

//         if (productFind) {
//           if (
//             req.body.formData.mainImage &&
//             req.body.formData.mainImage.url !== ''
//           ) {
//             const mainImageResult = await cloudinary.v2.uploader.upload(
//               req.body.mainImage,
//               {
//                 folder: 'products',
//               }
//             );
//             productData.mainImage = {
//               public_id: mainImageResult.public_id,
//               url: mainImageResult.secure_url,
//             };
//           }
//           let images = [];
//           if (req.body.images.length === 0) {
//             if (req.body.formData.showInputs === true) {
//               if (req.body.formData.colorInputs.length > 0) {
//                 for (let i = 0; i < req.body.formData.colorInputs.length; i++) {
//                   if (req.body.formData.colorInputs[i].image) {
//                     const result1 = await cloudinary.v2.uploader.upload(
//                       req.body.formData.colorInputs[i].image,
//                       {
//                         folder: 'products',
//                       }
//                     );
//                     req.body.formData.colorInputs[i].image = result1.public_id;
//                   }
//                 }
//               }

//               const newColorImageInputs = req.body.formData.colorInputs;

//               productData.shop = shop;
//               productData.colorInputs = newColorImageInputs;

//               const product = await Product.findOneAndUpdate(
//                 { _id: proId },
//                 productData
//               );
//               res.status(201).json({
//                 success: true,
//                 product,
//               });
//             } else {
//               const productData = req.body.formData;
//               productData.shop = shop;
//               const product = await Product.findOneAndUpdate(
//                 { _id: proId },
//                 productData
//               );
//               res.status(201).json({
//                 success: true,
//                 product,
//               });
//             }
//           } else {
//             if (typeof req.body.formData.images === 'string') {
//               images.push(req.body.images);
//             } else {
//               images = req.body.images;
//             }
//             const imagesLinks = [];
//             for (let i = 0; i < images.length; i++) {
//               const result = await cloudinary.v2.uploader.upload(images[i], {
//                 folder: 'products',
//               });
//               imagesLinks.push({
//                 public_id: result.public_id,
//                 url: result.secure_url,
//               });
//             }
//             let productData = req.body.formData;
//             let newImage = productFind.images.concat(imagesLinks);
//             productData.images = newImage;

//             if (req.body.formData.showInputs === true) {
//               for (let i = 0; i < req.body.formData.colorInputs.length; i++) {
//                 const result1 = await cloudinary.v2.uploader.upload(
//                   req.body.formData.colorInputs[i].image,
//                   {
//                     folder: 'products',
//                   }
//                 );
//                 req.body.formData.colorInputs[i].image = result1.public_id;
//               }

//               const newColorImageInputs = req.body.formData.colorInputs;

//               productData.shop = shop;
//               productData.colorInputs = newColorImageInputs;

//               const product = await Product.findOneAndUpdate(
//                 { _id: proId },
//                 productData
//               );
//               res.status(201).json({
//                 success: true,
//                 product,
//               });
//             } else {
//               const productData = req.body.formData;
//               productData.shop = shop;
//               const product = await Product.findOneAndUpdate(
//                 { _id: proId },
//                 productData
//               );
//               res.status(201).json({
//                 success: true,
//                 product,
//               });
//             }
//           }
//         } else {
//           return next(new ErrorHandler('Product Not Found!', 400));
//         }
//       }
//     } catch (error) {
//       console.log(error);
//       return next(new ErrorHandler(error, 400));
//     }
//   })
// );

// add product review
router.post(
  '/add-review', flushProducts,
  catchAsyncErrors(async (req, res, next) => {
    try {
      await Product.findById(req.body.productId)
        .then((result1) => {
          user
            .findById(req.body.userID)
            .then((result2) => {
              const reviews = result1.reviews;
              const newReview = {
                user: result2,
                rating: req.body.rating,
                comment: req.body.review,
                productId: req.body.productId,
              };
              reviews.push(newReview);

              Product.findByIdAndUpdate(req.body.productId, {
                $set: {
                  reviews: reviews,
                },
              })
                .then((result3) => {
                  res.status(201).json({
                    Status: 'Success',
                  });
                })
                .catch((error) => {
                  return next(new ErrorHandler(error, 400));
                });
            })
            .catch((error) => {
              return next(new ErrorHandler(error, 400));
            });

          // reviews.push(req.)
        })
        .catch((error) => {
          return next(new ErrorHandler(error, 400));
        });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Update product
router.put(
  '/update-product', flushProducts, flushProductsByCategory,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const {
        formData,
        images,
        mainImage,
        colorInputsIndexUpdateImage,
        proId,
      } = req.body;

      if (!formData || !Array.isArray(formData.colorInputs)) {
        return next(
          new ErrorHandler(
            'Invalid formData or colorInputs is not an array.',
            400
          )
        );
      }


      // Find the existing product by ID
      const productFind = await Product.findById(proId);
      if (!productFind) {
        return next(new ErrorHandler('Product Not Found!', 400));
      }

      if (formData?.name) {
        formData.slug = slugify(formData?.name.toLowerCase())
      }

      // Handle main image upload
      if (mainImage && mainImage !== '') {
        const mainImageResult = await cloudinary.v2.uploader.upload(mainImage, {
          folder: 'products',
        });
        formData.mainImage = {
          public_id: mainImageResult.public_id,
          url: mainImageResult.secure_url,
        };
      }

      // Handle additional images upload
      if (images && images.length > 0) {
        const imagesLinks = await Promise.all(
          images.map(async (image) => {
            const result = await cloudinary.v2.uploader.upload(image, {
              folder: 'products',
            });
            return {
              public_id: result.public_id,
              url: result.secure_url,
            };
          })
        );
        if (formData.images === null) {
          formData.images = imagesLinks;
        } else {
          formData.images = formData.images.concat(imagesLinks);
        }
      }

      // Handle color inputs if needed
      if (formData.showInputs && formData.colorInputs.length > 0) {
        const colorImagePromises = formData.colorInputs.map(
          async (colorInput, index) => {
            if (
              colorInput.image.url &&
              colorInputsIndexUpdateImage.includes(index)
            ) {
              const colorImageResult = await cloudinary.v2.uploader.upload(
                colorInput.image.url,
                {
                  folder: 'products',
                }
              );
              colorInput.image = {
                public_id: colorImageResult.public_id,
                url: colorImageResult.secure_url,
              };
            }
            return colorInput;
          }
        );
        formData.colorInputs = await Promise.all(colorImagePromises);
      }


      // Update the product with the new data
      const updatedProduct = await Product.findOneAndUpdate(
        { _id: proId },
        formData,
        { new: true } // Ensure you get the updated document
      );

      res.status(201).json({
        success: true,
        product: updatedProduct,
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
// Update SEO product
router.put(
  '/update-product-seo', isSeller, flushProducts, flushProductsByCategory,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const {
        productData
      } = req.body;
      const shopId = req.seller._id;
      const proId = productData?._id;

      // Input Validation: Check if required fields are present and in the expected format

      if (!shopId || !proId) {
        return next(
          new ErrorHandler('Invalid request. Missing shopId or proId.', 400)
        );
      }

      // Find the shop by ID
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(new ErrorHandler('Shop Id is invalid!', 400));
      }

      // Find the existing product by ID
      const productFind = await Product.findById(proId);
      if (!productFind) {
        return next(new ErrorHandler('Product Not Found!', 400));
      }


      // Update the product with the new data
      const updatedProduct = await Product.findOneAndUpdate(
        { _id: proId },
        productData,
        { new: true } // Ensure you get the updated document
      );

      res.status(201).json({
        success: true,
        product: updatedProduct,
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
// router.put(
//   '/update-product',
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const shopId = req.body.shopId;
//       const shop = await Shop.findById(shopId);
//       if (!shop) {
//         return next(new ErrorHandler('Shop Id is invalid!', 400));
//       } else {
//         const colorImages = req.body.selectedFiles;

//         const colorInputs = req.body.colorInputs;

//         // Product.findById({ _id: req.body._id })
//         //   .then(async(result1) => {
//         //     for (let i = 0; i < colorImages.length; i++) {
//         //       if (colorImages[i] != null) {
//         //         await cloudinary.v2.uploader
//         //           .destroy(result1.colorInputs[i].image)
//         //           .then(async(result2) => {
//         //             console.log(result2);
//         //             const result = await cloudinary.v2.uploader.upload(colorImages[i], {
//         //               folder: 'products',
//         //             });
//         //             colorInputs[i].image = result.public_id;
//         //             console.log(colorInputs);
//         //           })
//         //           .catch((e) => {
//         //             console.log(e);
//         //           });
//         //       }
//         //     }
//         //   })
//         //   .catch((e) => {
//         //     console.log(e);
//         //   });

//         let images = [];

//         if (req.body.images.length === 0 && req.body.oldImages.length === 0) {
//           return next(new ErrorHandler('Product Images are Required!', 400));
//         } else if (
//           req.body.images.length === 0 &&
//           req.body.oldImages.length > 0
//         ) {
//           await Product.findById({ _id: req.body._id })
//             .then(async (result) => {
//               if (result.showInputs === true) {
//                 for (let i = 0; i < colorImages.length; i++) {
//                   if (colorImages[i] != null) {
//                     await cloudinary.v2.uploader
//                       .destroy(result.colorInputs[i].image)
//                       .then(async (result2) => {
//                         console.log(result2);
//                         const result = await cloudinary.v2.uploader.upload(
//                           colorImages[i],
//                           {
//                             folder: 'products',
//                           }
//                         );
//                         colorInputs[i].image = result.public_id;
//                       })
//                       .catch((error) => {
//                         return next(new ErrorHandler(error.message, 500));
//                       });
//                   }
//                 }
//                 await Product.findByIdAndUpdate(
//                   { _id: req.body._id },
//                   {
//                     $set: {
//                       name: req.body.name,
//                       description: req.body.description,
//                       category: req.body.category,
//                       tags: req.body.tags,
//                       originalPrice: req.body.originalPrice,
//                       discountPrice: req.body.discountPrice,
//                       stock: req.body.stock,
//                       attributes: req.body.attributes,
//                       colorInputs: colorInputs,
//                     },
//                   }
//                 )
//                   .then((result2) => {
//                     res.status(200).json({
//                       success: true,
//                     });
//                   })
//                   .catch((error) => {
//                     return next(new ErrorHandler(error.message, 500));
//                   });
//               }

//               await Product.findByIdAndUpdate(
//                 { _id: req.body._id },
//                 {
//                   $set: {
//                     name: req.body.name,
//                     description: req.body.description,
//                     category: req.body.category,
//                     tags: req.body.tags,
//                     originalPrice: req.body.originalPrice,
//                     discountPrice: req.body.discountPrice,
//                     stock: req.body.stock,
//                     attributes: req.body.attributes,
//                     // images: imagesLinks,
//                   },
//                 }
//               )
//                 .then((result2) => {
//                   res.status(200).json({
//                     success: true,
//                   });
//                 })
//                 .catch((error) => {
//                   return next(new ErrorHandler(error.message, 500));
//                 });
//             })
//             .catch((error) => {
//               return next(new ErrorHandler(error, 400));
//             });
//         } else {
//           if (typeof req.body.images === 'string') {
//             images.push(req.body.images);
//           } else {
//             images = req.body.images;
//           }

//           const imagesLinks = [];

//           for (let i = 0; i < images.length; i++) {
//             const result = await cloudinary.v2.uploader.upload(images[i], {
//               folder: 'products',
//             });

//             imagesLinks.push({
//               public_id: result.public_id,
//               url: result.secure_url,
//             });
//           }
//           await Product.findById({ _id: req.body._id })
//             .then(async (result) => {
//               result.images.map((val) => {
//                 imagesLinks.push(val);
//               });

//               if (result.showInputs === true) {
//                 for (let i = 0; i < colorImages.length; i++) {
//                   if (colorImages[i] != null) {
//                     await cloudinary.v2.uploader
//                       .destroy(result.colorInputs[i].image)
//                       .then(async (result2) => {
//                         console.log(result2);
//                         const result = await cloudinary.v2.uploader.upload(
//                           colorImages[i],
//                           {
//                             folder: 'products',
//                           }
//                         );
//                         colorInputs[i].image = result.public_id;
//                       })
//                       .catch((error) => {
//                         return next(new ErrorHandler(error.message, 500));
//                       });
//                   }
//                 }
//                 await Product.findByIdAndUpdate(
//                   { _id: req.body._id },
//                   {
//                     $set: {
//                       name: req.body.name,
//                       description: req.body.description,
//                       category: req.body.category,
//                       tags: req.body.tags,
//                       originalPrice: req.body.originalPrice,
//                       discountPrice: req.body.discountPrice,
//                       stock: req.body.stock,
//                       attributes: req.body.attributes,
//                       images: imagesLinks,
//                       colorInputs: colorInputs,
//                     },
//                   }
//                 )
//                   .then((result2) => {
//                     res.status(200).json({
//                       success: true,
//                     });
//                   })
//                   .catch((error) => {
//                     return next(new ErrorHandler(error.message, 500));
//                   });
//               }

//               await Product.findByIdAndUpdate(
//                 { _id: req.body._id },
//                 {
//                   $set: {
//                     name: req.body.name,
//                     description: req.body.description,
//                     category: req.body.category,
//                     tags: req.body.tags,
//                     originalPrice: req.body.originalPrice,
//                     discountPrice: req.body.discountPrice,
//                     stock: req.body.stock,
//                     images: imagesLinks,
//                     attributes: req.body.attributes,
//                   },
//                 }
//               )
//                 .then((result2) => {
//                   res.status(200).json({
//                     success: true,
//                   });
//                 })
//                 .catch((error) => {
//                   return next(new ErrorHandler(error.message, 500));
//                 });
//             })
//             .catch((error) => {
//               return next(new ErrorHandler(error, 400));
//             });
//         }
//       }
//     } catch (error) {
//       return next(new ErrorHandler(error, 400));
//     }
//   })
// );

// Update Approve product

router.put(
  '/approve-shop-product/:id', flushProducts, flushProductsByCategory,
  catchAsyncErrors(async (req, res, next) => {
    try {
      await Product.findByIdAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            approved: true,
          },
        }
      )
        .then(async (result2) => {
          res.status(200).json({
            success: true,
            message: 'Product Updated successfully!',
          });

          const adminSide = {
            subject: 'Product Approved',
            message: 'Product Request Approved successfully'
          }

          const sellerSide = {
            subject: 'Product Approved',
            message: 'Your Product Request is Approved'
          }

          await TwoSideMails(result2?.shop?.email, adminSide, sellerSide)
        })
        .catch((error) => {
          return next(new ErrorHandler(error.message, 500));
        });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Update Reject product
router.put(
  '/reject-product/:id', flushProducts, flushProductsByCategory,
  catchAsyncErrors(async (req, res, next) => {
    try {
      await Product.findByIdAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            rejected: true,
          },
        }
      )
        .then(async (result2) => {
          res.status(200).json({
            success: true,
            message: 'Product Rejected successfully!',
          });

          const adminSide = {
            subject: 'Product Request Rejected',
            message: 'Product Request rejected successfully'
          }

          const sellerSide = {
            subject: 'Product Request Rejected',
            message: 'Your Product Request is rejected'
          }

          await TwoSideMails(result2?.shop?.email, adminSide, sellerSide)
        })
        .catch((error) => {
          return next(new ErrorHandler(error.message, 500));
        });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all products of a shop
router.get(
  '/get-all-products-shop/:id',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find({
        shopId: req.params.id,
      });
      // console.log(products);

      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get requested products of a shop
router.get(
  '/get-requested-products-shop',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find({
        // shopId: req.params.id,
        approved: false,
        rejected: false,
        draft: false,
      });


      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get published products of a shop
router.get(
  '/get-published-products', cacheMiddleware,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find({
        draft: false,
      });

      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get published products of a shop
router.get(
  '/get-published-products/:slug', cacheMiddleware,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const slug = req.params?.slug
      const product = await Product.find({
        approved: true,
        draft: false,
        slug: slug
      });
      res.status(200).json({
        success: true,
        product,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);


// get a product of a shop
router.get(
  '/get-a-product-shop/:id',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find({ _id: req.params.id });
      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// delete product of a shop
router.delete(
  '/delete-shop-product/:id',
  isSeller, flushProducts, flushProductsByCategory,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return next(new ErrorHandler('Product is not found with this id', 404));
      }

      // for (let i = 0; 1 < product.images.length; i++) {
      //   console.log(product.images[i].public_id);
      //   const result = await cloudinary.v2.uploader.destroy(
      //     product.images[i].public_id
      //   );
      // }

      if (product.images.length > 0) {
        product.images.map(async (val) => {
          await cloudinary.v2.uploader
            .destroy(val.public_id)
            .then(async (result) => {
              await Product.findOneAndDelete({ _id: req.params.id })
                .then((result1) => {
                  res.status(201).json({
                    success: true,
                    message: 'Product Deleted successfully!',
                  });
                  mail(product)

                })
                .catch((error) => {
                  return next(new ErrorHandler(error, 400));
                });
            })
            .catch((error) => {
              return next(new ErrorHandler(error, 400));
            });
        });
      } else {
        Product.findOneAndDelete({ _id: req.params.id })
          .then((result1) => {
            res.status(201).json({
              success: true,
              message: 'Product Deleted successfully!',
            });
            mail(product)
          })
          .catch((error) => {
            return next(new ErrorHandler(error, 400));
          });
      }

      function mail(product) {
        const options = {
          email: product?.shop?.email,
          subject: "Product deleted",
          message: `Product Deleted successfully ,ID: ${product?._id}`
        }
        sendMail(options)
      }
      // await product.remove();
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all products
router.get(
  '/get-all-products',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find({ approved: true }).sort({
        createdAt: -1,
      });

      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get preview Products UI
router.get(
  '/get-all-product-preview/:id',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.findOne({ _id: req.params.id });

      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get edit products
router.get(
  '/editProduct/:id',
  catchAsyncErrors(async (req, res, next) => {
    try {
      await Product.find({ _id: req.params.id })
        .then((products) => {
          Category.find({ approved: true })
            .then((categories) => {
              res.status(201).json({
                success: true,
                products,
                categories,
              });
            })
            .catch((e) => {
              return next(new ErrorHandler(error, 400));
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

// get edit products
router.put(
  '/shop/resend/:id',
  catchAsyncErrors(async (req, res, next) => {
    try {
      await Product.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            rejected: false,
          },
        }
      )
        .then(async (result) => {
          res.status(201).json({
            Status: 'Success',
          });
          const adminSide = {
            subject: 'Product Reapproval Request',
            message: 'Got Product Request for Reapproval'
          }

          const sellerSide = {
            subject: 'Product Request Resent Successfully',
            message: 'Resent Product Request for approval'
          }

          await TwoSideMails(result?.shop?.email, adminSide, sellerSide)
        })
        .catch((error) => {
          return next(new ErrorHandler(error, 400));
        });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);


// delete main image
router.put(
  '/delete-main-image',
  flushProducts, flushProductsByCategory,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { id, _id } = req.body;
      await cloudinary.v2.uploader
        .destroy(id)
        .then(async (result) => {
          await Product.findById({ _id: _id })
            .then((result1) => {
              Product.findByIdAndUpdate(
                { _id: _id },
                { $set: { 'mainImage.public_id': '', 'mainImage.url': '' } }
              )
                .then((result2) => {
                  res.status(200).json({
                    success: true,
                  });
                })
                .catch((error) => {
                  return next(new ErrorHandler(error.message, 500));
                });
            })
            .catch((error) => {
              return next(new ErrorHandler(error.message, 500));
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

// delete showInput image
router.put(
  '/delete-showInput-image',
  flushProducts, flushProductsByCategory,
  catchAsyncErrors(async (req, res, next) => {
    try {
      await cloudinary.v2.uploader
        .destroy(req.body.id)
        .then(async (result) => {
          // await Product.findById({ _id: req.body._id })
          //   .then((result1) => {
          const update = {
            [`colorInputs.${req.body.index}.image`]: { public_id: '', url: '' },
          };
          await Product.findByIdAndUpdate(
            { _id: req.body._id },
            { $set: update },
            { new: true }
          )
            .then((result2) => {
              res.status(200).json({
                success: true,
              });
            })
            .catch((error) => {
              return next(new ErrorHandler(error.message, 500));
            });
          // })
          // .catch((error) => {
          //   return next(new ErrorHandler(error.message, 500));
          // });
        })
        .catch((error) => {
          return next(new ErrorHandler(error.message, 500));
        });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete product image
router.put(
  '/delete-product-image',
  flushProducts, flushProductsByCategory,
  catchAsyncErrors(async (req, res, next) => {
    try {
      await cloudinary.v2.uploader
        .destroy(req.body.id)
        .then(async (result) => {
          await Product.findById({ _id: req.body._id })
            .then((result1) => {
              const newImageArr = result1.images;
              const fileteredImages = newImageArr.filter(
                (item) => item.public_id !== req.body.id
              );
              Product.findByIdAndUpdate(
                { _id: req.body._id },
                {
                  $set: {
                    images: fileteredImages,
                  },
                }
              )
                .then((result2) => {
                  res.status(200).json({
                    success: true,
                  });
                })
                .catch((error) => {
                  return next(new ErrorHandler(error.message, 500));
                });
            })
            .catch((error) => {
              return next(new ErrorHandler(error.message, 500));
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

// review for a product
router.put(
  '/create-new-review',
  isAuthenticated, flushProducts,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { user, rating, comment, productId, orderId } = req.body;

      const product = await Product.findById(productId);

      const review = {
        user,
        rating,
        comment,
        productId,
      };

      const isReviewed = product.reviews.find(
        (rev) => rev.user._id === req.user._id
      );

      if (isReviewed) {
        product.reviews.forEach((rev) => {
          if (rev.user._id === req.user._id) {
            (rev.rating = rating), (rev.comment = comment), (rev.user = user);
          }
        });
      } else {
        product.reviews.push(review);
      }

      let avg = 0;

      product.reviews.forEach((rev) => {
        avg += rev.rating;
      });

      product.ratings = avg / product.reviews.length;

      await product.save({ validateBeforeSave: false });

      await Order.findByIdAndUpdate(
        orderId,
        { $set: { 'cart.$[elem].isReviewed': true } },
        { arrayFilters: [{ 'elem._id': productId }], new: true }
      );

      res.status(200).json({
        success: true,
        message: 'Reviwed succesfully!',
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// all products --- for admin
router.get(
  '/admin-all-products',
  isAuthenticated,
  isAdmin('Admin'),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.get(
  '/search/:term',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { term } = req.params;
      const termArray2 = term.split(' ');
      const termArray = term.replace(/\s/g, '').split('');
      const products = await Product.find({ approved: true });

      const results = await Promise.all(
        products.map(async (product) => {
          let score = 0;
          const searchArray = product.searchTerms.map((low) => {
            if (typeof low !== 'string') {
              return String(low).toLocaleLowerCase();
            }
            return low.toLowerCase();
          });
          for (const termAr of searchArray) {
            const word = termAr.replace(/\s/g, '').split('');
            const word2 = termAr.split(' ');

            for (
              let index = 0;
              index < Math.min(termArray.length, word.length);
              index++
            ) {
              if (termArray[index] === word[index]) {
                score++;
              } else {
                break;
              }
            }
          }
          return { product, score };
        })
      );

      const filteredScore = results.filter((val) => val.score > 0);
      const sorted = filteredScore.sort((a, b) => b.score - a.score);

      res.status(200).json({
        success: true,
        products: sorted,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

router.get(
  '/search-suggestions',
  catchAsyncErrors(async (req, res, next) => {
    const query = req.query.search ? req.query.search.toLowerCase() : null;

    // Check if query is null or empty
    if (!query) {
      return res.json([]); // Return an empty response
    }

    try {
      // Find products where any search term in the `searchTerms` array matches the query
      const result = await Product.find({
        approved: true,
        searchTerms: { $in: [new RegExp(query, 'i')] },
      })
        .limit(10)
        .exec();

      // Extract search terms from the result and send them as JSON
      let suggestions = [];
      result.forEach((doc) => {
        doc.searchTerms.forEach((term) => {
          // Convert number elements to strings and check for matches
          if (typeof term === 'number') {
            term = term.toString();
          }
          if (typeof term === 'string' && term.toLowerCase().includes(query)) {
            suggestions.push(term);
          }
        });
      });

      // Remove duplicates from the suggestions
      suggestions = [...new Set(suggestions)];

      res.json(suggestions);
    } catch (err) {
      console.error(
        'Error fetching search term suggestions from MongoDB:',
        err
      );
      res.status(500).json({ error: 'Internal Server Error' });
    }
  })
);

module.exports = router;
