const express = require('express');
const { isSeller, isAuthenticated, isAdmin } = require('../middleware/auth');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const router = express.Router();
const ErrorHandler = require('../utils/ErrorHandler');
const Site = require('../model/homePageConfig');
const cloudinary = require('cloudinary');
const { flushSiteConfig, cacheMiddleware } = require('../middleware/cacheMiddleware');



// update site config
// router.post(
//     '/site-config', flushSiteConfig,
//     catchAsyncErrors(async (req, res, next) => {
//         try {
//             const { formData } = req.body;
//             const { mainColor, buttonFontColor, fontColor, fontActiveColor, bgcolor } = formData;

//             await Site.updateMany(
//                 {},
//                 {
//                     $set: {
//                         mainColor: mainColor,
//                         buttonFontColor: buttonFontColor,
//                         fontColor: fontColor,
//                         fontActiveColor: fontActiveColor,
//                         bgcolor: bgcolor
//                     }
//                 }
//             );

//             res.status(200).json({ success: true });
//         } catch (error) {
//             return next(new ErrorHandler(error.message, 500));
//         }
//     })
// );


router.post(
    '/site-config-chilly-kitchen', flushSiteConfig,
    catchAsyncErrors(async (req, res, next) => {
        try {
            const formData  = req.body;
            console.log("formData", formData)
            const { creatingtext } = formData;

            await Site.create(
                // {},
                // {
                    formData
                // }
            );

            res.status(200).json({ success: true });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    })
);

// update currency type
router.put(
    '/site-config-currency', flushSiteConfig,
    catchAsyncErrors(async (req, res, next) => {
        try {
            const { currency, paymentMethods } = req.body;

            await Site.updateMany(
                {},
                {
                    $set: {
                        currency: currency,
                        paymentMethods: paymentMethods,
                    }
                }
            );

            res.status(200).json({ success: true });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    })
);

// update contact us
router.put(
    '/site-config-contactus', flushSiteConfig,
    catchAsyncErrors(async (req, res, next) => {
        try {
            const { contactUs } = req.body;

            await Site.updateMany(
                {},
                {
                    $set: {
                        contactUs: contactUs,
                    }
                }
            );

            res.status(200).json({ success: true });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    })
);

// update displaying sections
router.put(
    '/site-config-display', flushSiteConfig,
    catchAsyncErrors(async (req, res, next) => {
        try {
            const { name, value } = req.body;
            await Site.updateMany(
                {},
                {
                    $set: {
                        [name]: value
                    }
                }
            );

            res.status(200).json({ success: true });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    })
);

// update layout content
router.put(
    '/site-config-layout-content', flushSiteConfig,
    catchAsyncErrors(async (req, res, next) => {
        try {
            const { layoutContent, layoutName } = req.body;
            await Site.updateMany(
                {},
                {
                    $set: {
                        [layoutName]: layoutContent
                    }
                }
            );

            res.status(200).json({ success: true });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    })
);

// update selected categories
router.put(
    '/site-config-update-categories', flushSiteConfig,
    catchAsyncErrors(async (req, res, next) => {
        try {
            const { CategoryLayoutName, CategoryContent } = req.body;
            await Site.updateMany(
                {},
                {
                    $set: {
                        [CategoryLayoutName]: CategoryContent,
                    }
                }
            );

            res.status(200).json({ success: true });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    })
);

router.post(
    '/site-config-logo', flushSiteConfig,
    catchAsyncErrors(async (req, res, next) => {
        try {
            const { image, name } = req.body;

            let logoToUpload = image;

            const foundLogo = await Site.find({});


            if (name === "logo" && foundLogo[0]?.logo?.public_id) {
                const imageId = foundLogo[0].logo.public_id;
                await cloudinary.v2.uploader.destroy(imageId);
            } else if (name === "mainBanner" && foundLogo[0]?.mainBanner?.image?.public_id) {
                const imageId = foundLogo[0].mainBanner.image.public_id;
                await cloudinary.v2.uploader.destroy(imageId);
            } else if (name === "sideBanner1" && foundLogo[0]?.sideBanner1?.image?.public_id) {
                const imageId = foundLogo[0].sideBanner1.image.public_id;
                await cloudinary.v2.uploader.destroy(imageId);
            } else if (name === "sideBanner2" && foundLogo[0]?.sideBanner2?.image?.public_id) {
                const imageId = foundLogo[0].sideBanner2.image.public_id;
                await cloudinary.v2.uploader.destroy(imageId);
            } else if (name === "midSecImg1" && foundLogo[0]?.midSecImg1?.public_id) {
                const imageId = foundLogo[0].midSecImg1.public_id;
                await cloudinary.v2.uploader.destroy(imageId);
            } else if (name === "midSecImg2" && foundLogo[0]?.midSecImg2?.public_id) {
                const imageId = foundLogo[0].midSecImg2.public_id;
                await cloudinary.v2.uploader.destroy(imageId);
            } else if (name === "midSecImg3" && foundLogo[0]?.midSecImg3?.public_id) {
                const imageId = foundLogo[0].midSecImg3.public_id;
                await cloudinary.v2.uploader.destroy(imageId);
            } else if (name === "midSec2Img1" && foundLogo[0]?.midSec2Img1?.public_id) {
                const imageId = foundLogo[0].midSec2Img1.public_id;
                await cloudinary.v2.uploader.destroy(imageId);
            } else if (name === "midSec2Img2" && foundLogo[0]?.midSec2Img2?.public_id) {
                const imageId = foundLogo[0].midSec2Img2.public_id;
                await cloudinary.v2.uploader.destroy(imageId);
            } else if (name === "midSec2Img3" && foundLogo[0]?.midSec2Img3?.public_id) {
                const imageId = foundLogo[0].midSec2Img3.public_id;
                await cloudinary.v2.uploader.destroy(imageId);
            } else if (name === "midSec3Img1" && foundLogo[0]?.midSec3Img1?.public_id) {
                const imageId = foundLogo[0].midSec3Img1.public_id;
                await cloudinary.v2.uploader.destroy(imageId);
            } else if (name === "midSec3Img2" && foundLogo[0]?.midSec3Img2?.public_id) {
                const imageId = foundLogo[0].midSec3Img2.public_id;
                await cloudinary.v2.uploader.destroy(imageId);
            } else if (name === "midSec3Img3" && foundLogo[0]?.midSec3Img3?.public_id) {
                const imageId = foundLogo[0].midSec3Img3.public_id;
                await cloudinary.v2.uploader.destroy(imageId);
            } else if (name === "midSec4Img1" && foundLogo[0]?.midSec4Img1?.public_id) {
                const imageId = foundLogo[0].midSec4Img1.public_id;
                await cloudinary.v2.uploader.destroy(imageId);
            } else if (name === "midSec4Img2" && foundLogo[0]?.midSec4Img2?.public_id) {
                const imageId = foundLogo[0].midSec4Img2.public_id;
                await cloudinary.v2.uploader.destroy(imageId);
            } else if (name === "midSec4Img3" && foundLogo[0]?.midSec4Img3?.public_id) {
                const imageId = foundLogo[0].midSec4Img3.public_id;
                await cloudinary.v2.uploader.destroy(imageId);
            } else if (name === "midSec5Img1" && foundLogo[0]?.midSec5Img1?.public_id) {
                const imageId = foundLogo[0].midSec5Img1.public_id;
                await cloudinary.v2.uploader.destroy(imageId);
            } else if (name === "midSec5Img2" && foundLogo[0]?.midSec5Img2?.public_id) {
                const imageId = foundLogo[0].midSec5Img2.public_id;
                await cloudinary.v2.uploader.destroy(imageId);
            } else if (name === "midSec5Img3" && foundLogo[0]?.midSec5Img3?.public_id) {
                const imageId = foundLogo[0].midSec5Img3.public_id;
                await cloudinary.v2.uploader.destroy(imageId);
            }

            const myCloud = await cloudinary.v2.uploader.upload(logoToUpload, {
                folder: 'siteImages',
            });

            // logoToUpload = {
            //     ...logoToUpload,
            //     image: {
            //         public_id: myCloud.public_id,
            //         url: myCloud.secure_url,
            //     }
            // }

            logoToUpload = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            }




            const updateObject = { [name]: logoToUpload };

            await Site.updateMany({}, updateObject);

            res.status(200).json({ success: true });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    })
);

//delete image
router.delete(
    '/site-config-image-delete', flushSiteConfig,
    catchAsyncErrors(async (req, res, next) => {
        try {
            const { objName, public_id } = req.body;

            const foundLogo = await Site.find({});

            await cloudinary.v2.uploader.destroy(public_id);

            let allImages = await foundLogo[0][objName].filter((val) => val?.public_id !== public_id);

            const updateObject = { [objName]: allImages };

            await Site.updateMany({}, updateObject);
            res.status(200).json({ success: true });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    })
);

//uploading images
router.put(
    '/site-config-imgs-upload', flushSiteConfig,
    catchAsyncErrors(async (req, res, next) => {
        try {
            const { allImages, name } = req.body;


            const uploadPromises = allImages.map(async (image) => {
                const myCloud = await cloudinary.v2.uploader.upload(image, {
                    folder: `chilly_kitchen/${name}`,
                });

                return {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                };
            });

            const uploadedImages = await Promise.all(uploadPromises);

            const siteInfo = await Site.findOne({});
            console.log( 'hy before')
            const mergedImages = siteInfo[name]
                ? siteInfo[name].concat(uploadedImages)
                : uploadedImages;

            await Site.updateMany({}, { [name]: mergedImages });

            res.status(200).json({ success: true });
        } catch (error) {
            console.log(error)
            return next(new ErrorHandler(error.message, 500));
        }
    })
);


router.post(
    '/site-config-banner', flushSiteConfig,
    catchAsyncErrors(async (req, res, next) => {
        try {
            const { bannerImages } = req.body;

            let logoToUpload = bannerImages;

            const foundLogo = await Site.find({});

            if (foundLogo[0]?.logo?.public_id) {
                const imageId = foundLogo[0]?.logo?.public_id;
                await cloudinary.v2.uploader.destroy(imageId);
            }

            const myCloud = await cloudinary.v2.uploader.upload(logoToUpload, {
                folder: 'logo',
            });

            logoToUpload = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            };



            await Site.updateMany(
                {},
                {
                    $set: {
                        logo: logoToUpload,
                    },
                }
            );
            res.status(200).json({ success: true });
        } catch (error) {
            console.error(error);
            return next(new ErrorHandler(error.message, 500));
        }
    })
);


router.get(
    '/site-config', 
    catchAsyncErrors(async (req, res, next) => {
        try {

            let siteConfig = await Site.find();

            if (!siteConfig) {
                res.status(500).json({ message: "No Site Config Data Found" })
            }

            res.status(200).json({ success: true, siteConfig: siteConfig[0] });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    })
);

module.exports = router;
