const express = require('express');
const path = require('path');
const router = express.Router();
const jwt = require('jsonwebtoken');
const sendMail = require('../utils/sendMail');
const Shop = require('../model/shop');
const { isAuthenticated, isSeller, isAdmin } = require('../middleware/auth');
const cloudinary = require('cloudinary');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/ErrorHandler');
const sendShopToken = require('../utils/shopToken');
const otpGenerator = require('otp-generator');

// create shop
router.post(
  '/create-shop',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email } = req.body;
      const sellerEmail = await Shop.findOne({ email });
      if (sellerEmail) {
        return next(new ErrorHandler('User already exists', 400));
      }

      // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      //   folder: 'avatars',
      // });

      const seller = {
        name: req.body.name,
        email: email,
        password: req.body.password,
      };

      let sellerNew = await Shop.findOne({ email });

      if (sellerNew) {
        return next(new ErrorHandler('User already exists', 400));
      }

      await Shop.create(seller);

      res.status(201).json({
        success: true,
        message: 'Your Request for Shop Sent Successfully',
      });

      // const activationToken = createActivationToken(seller);

      // const activationUrl = `http://localhost:3000/seller/activation/${activationToken}`;

      // try {
      //   await sendMail({
      //     email: seller.email,
      //     subject: 'Activate your Shop',
      //     message: `Hello ${seller.name}, please click on the link to activate your shop: ${activationUrl}`,
      //   });
      //   res.status(201).json({
      //     success: true,
      //     message: `please check your email:- ${seller.email} to activate your shop!`,
      //   });
      // } catch (error) {
      //   return next(new ErrorHandler(error.message, 500));
      // }
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// create activation token
const createActivationToken = (seller) => {
  return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
    expiresIn: '5m',
  });
};


//shop-updated
router.put('/update-shop/:id',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const {
        name,
        address,
        zipCode,
        phoneNumber,
        description,
      } = req.body;

      await Shop.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            name,
            address,
            zipCode,
            phoneNumber,
            description,
          },
        }
      )
        .then((result) => {
          res.status(201).json({
            Status: 'Success',
          });
        })
        .catch((error) => {
          return next(new ErrorHandler(error, 400));
        });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
)

// activate user
router.post(
  '/activation',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newSeller = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newSeller) {
        return next(new ErrorHandler('Invalid token', 400));
      }
      const { name, email, password, avatar, zipCode, address, phoneNumber } =
        newSeller;

      let seller = await Shop.findOne({ email });

      if (seller) {
        return next(new ErrorHandler('User already exists', 400));
      }

      seller = await Shop.create({
        approved: false,
        name,
        email,
        avatar,
        password,
        zipCode,
        address,
        phoneNumber,
      });

      sendShopToken(seller, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// approved sellers --- for admin
router.put(
  '/approve-seller/:id',
  catchAsyncErrors(async (req, res, next) => {
    try {
      await Shop.findByIdAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            approved: true,
          },
        }
      )
        .then((result1) => {
          const options = {
            email: result1.email,
            subject: 'Approval Message',
            message: `Your ${result1.name} is Approved You can login to your Shop Now`,
          };
          sendMail(options)
            .then((result2) => {
              res.status(201).json({
                Status: 'Success',
              });
            })
            .catch((error) => {
              return next(new ErrorHandler(error.message, 500));
            });
        })
        .catch((errror) => {
          return next(new ErrorHandler(error.message, 500));
        });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// login shop
router.post(
  '/login-shop',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler('Please provide the all fields!', 400));
      }

      const user = await Shop.findOne({ email }).select(
        '+password'
      );

      if (!user) {
        return next(new ErrorHandler("User doesn't exists!", 400));
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler('Please provide the correct information', 400)
        );
      }

      sendShopToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// forget password
router.post(
  "/admin-forget-password",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email } = req.body;

      if (!email) {
        return next(new ErrorHandler("Please provide email!", 400));
      }

      const user = await Shop.findOne({ email })

      if (!user) {
        return next(new ErrorHandler("User doesn't exists!", 400));
      }

      const otp = otpGenerator.generate(4, {
        digits: true,
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
      });

      const optionUser = {
        email: user?.email,
        subject: 'Change Password',
        message: `OTP to Change Password ${otp}`
      }

      await sendMail(optionUser)
      console.log(email)
      await Shop.findOneAndUpdate({ email }, {
        $set: {
          otp: otp
        }
      })

      res.status(200).json({ success: true })

    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// reset otp
router.post(
  "/admin-otpVer",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, otp } = req.body;

      if (!email) {
        return next(new ErrorHandler("Please provide email!", 400));
      }

      let user = await Shop.findOne({ email })
      if (user.otp === Number(otp)) {
        await Shop.findOneAndUpdate({ email }, {
          $set: {
            otp: 0
          }
        })
        res.status(200).json({ success: true })

      } else {
        res.status(400).json({ message: "Invalid OTP" })
      }


    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// reset otp
router.post(
  "/admin-resetOTP",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email } = req.body;

      if (!email) {
        return next(new ErrorHandler("Please provide email!", 400));
      }

      await Shop.findOneAndUpdate({ email }, {
        $set: {
          otp: 0
        }
      })

      res.status(200).json({ success: true })

    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// change password
router.post(
  "/changeAdminPassword",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email) {
        return next(new ErrorHandler("Please provide email!", 400));
      }
      const user = await Shop.findOne({ email })

      if (!user) {
        return next(new ErrorHandler("User doesn't exists!", 400));
      }

      user.password = password

      await user.save();

      res.status(200).json({ success: true })

    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// load shop
router.get(
  '/getSeller',
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      console.log(req.seller._id)
      const seller = await Shop.findById(req.seller._id);

      if (!seller) {
        return next(new ErrorHandler("User doesn't exists", 400));
      }

      res.status(200).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// load shop for product
router.post(
  '/getSellerProduct',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { sellerID } = req.body;
      const seller = await Shop.findById(sellerID);

      if (!seller) {
        return next(new ErrorHandler("User doesn't exists", 400));
      }

      const sellerData = {
        name: seller?.name,
        description: seller?.description,
        pickupLocation: seller?.pickupLocation,
        address: seller?.address,
        phoneNumber: seller?.phoneNumber,
        avatar: seller?.avatar,
        zipCode: seller?.zipCode
      }

      res.status(200).json({
        success: true,
        seller: sellerData,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// log out from shop
router.get(
  '/logout-admin',
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie('seller_token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });
      res.status(201).json({
        success: true,
        message: 'Log out successful!',
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get shop info
router.get(
  '/get-shop-info/:id',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shop = await Shop.findById(req.params.id);
      res.status(201).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update shop profile picture
router.put(
  '/update-shop-avatar',
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      let existsSeller = await Shop.findById(req.seller._id);

      const imageId = existsSeller.avatar.public_id;

      await cloudinary.v2.uploader.destroy(imageId);

      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'avatars',
        width: 150,
      });

      existsSeller.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };

      await existsSeller.save();

      res.status(200).json({
        success: true,
        seller: existsSeller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update seller info
router.put(
  '/update-seller-info',
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { name, description, address, phoneNumber, zipCode } = req.body;

      const shop = await Shop.findOne(req.seller._id);

      if (!shop) {
        return next(new ErrorHandler('User not found', 400));
      }

      shop.name = name;
      shop.description = description;
      shop.address = address;
      shop.phoneNumber = phoneNumber;
      shop.zipCode = zipCode;

      await shop.save();

      res.status(201).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update seller shipment info
router.put(
  '/shipment-data-update',
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { shipment, sellerID } = req.body;

      const shop = await Shop.findOne({ _id: sellerID });

      if (!shop) {
        return next(new ErrorHandler('User not found', 400));
      }

      shop.shipment = shipment;

      await shop.save();

      res.status(201).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);


// update seller password
router.put(
  "/update-seller-password",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await Shop.findById(req.body.id).select("+password");

      const isPasswordMatched = await user.comparePassword(
        req.body.oldPassword
      );

      if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password is incorrect!", 400));
      }

      if (req.body.newPassword !== req.body.confirmPassword) {
        return next(
          new ErrorHandler("Password doesn't matched with each other!", 400)
        );
      }
      user.password = req.body.newPassword;

      await user.save();

      res.status(200).json({
        success: true,
        message: "Password updated successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// reject sellers --- for admin
router.delete(
  '/reject-seller/:id',
  catchAsyncErrors(async (req, res, next) => {
    try {
      await Shop.findOneAndDelete({ _id: req.params.id })
        .then(async (result) => {
          await cloudinary.v2.uploader.destroy(result.avatar.public_id);
          const options = {
            email: result.email,
            subject: 'Rejection Message',
            message: `Your ${result.name} is rejected`,
          };
          sendMail(options)
            .then((result1) => {
              res.status(201).json({
                Status: 'Success',
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



// all sellers --- for admin
router.get(
  '/admin-all-sellers',
  isAuthenticated,
  isAdmin('Admin'),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const sellers = await Shop.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        sellers,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete seller ---admin
router.delete(
  '/delete-seller/:id',
  isAuthenticated,
  isAdmin('Admin'),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.params.id);

      if (!seller) {
        return next(
          new ErrorHandler('Seller is not available with this id', 400)
        );
      }

      await Shop.findByIdAndDelete(req.params.id);

      res.status(201).json({
        success: true,
        message: 'Seller deleted successfully!',
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update seller withdraw methods --- sellers
router.put(
  '/update-payment-methods',
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { withdrawMethod } = req.body;

      const seller = await Shop.findByIdAndUpdate(req.seller._id, {
        withdrawMethod,
      });

      res.status(201).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete seller withdraw merthods --- only seller
router.delete(
  '/delete-withdraw-method/',
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.seller._id);

      if (!seller) {
        return next(new ErrorHandler('Seller not found with this id', 400));
      }

      seller.withdrawMethod = null;

      await seller.save();

      res.status(201).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
