const mongoose = require('mongoose');

const siteConfigSchema = new mongoose.Schema({
    productImagesGallery: [],
    mainColor: Object,
    fontColor: Object,
    buttonFontColor: Object,
    fontActiveColor: Object,
    bgcolor: Object,
    cardColors: Object,
    bannerColors: Object,
    headerColors: Object,
    siteFeaturesColors: Object,
    footerColors: Object,
    productMainColors: Object,
    logo: {
        url: String,
        public_id: String
    },

    //images starts
    allImages: Array,
    headerImages: Array,
    bannerImages: Array,
    collectionImages: Array,
    adbannerImages: Array,
    featureImages: Array,
    socialmediaImages: Array,
    newsletterImages: Array,
    saleImages: Array,
    categoryproductImages: Array,
    brandImages: Array,
    aboutUsImages: Array,
    formImages: Array,
    testimonialsImages: Array,
    industriesImages: Array,
    regionsImages: Array,
    eventsImages: Array,
    blogsImages: Array,
    //images ends

    currency: Object,
    paymentMethods: {
        INR: Array,
        USD: Array,
        EUR: Array,
    },
    CurrencyArr: Array,
    fontFamily: Object,
    selectedBannerLayout: Number,
    selectedHeaderLayout: Number,
    homePageSectionsPosition: Array,
    selectedSiteFeatureLayout: Number,
    layoutOne: {
        imgOne: {
            image: {
                url: String,
                public_id: String
            },
            url: String
        },
        imgTwo: {
            image: {
                url: String,
                public_id: String
            },
            url: String
        },
        imgThree: {
            image: {
                url: String,
                public_id: String
            },
            url: String
        }
    },
    layoutTwo: {
        imgOne: Array,
        imgTwo: {
            image: {
                url: String,
                public_id: String
            },
            url: String
        },
        imgThree: {
            image: {
                url: String,
                public_id: String
            },
            url: String
        }
    },
    layoutThree: {
        imgOne: Array,
        imgTwo: Array,
        imgThree: Array
    },
    layoutFour: {
        imgOne: {
            image: {
                url: String,
                public_id: String
            },
            url: String
        },
        imgTwo: Array,
        imgThree: Array
    },
    layoutFive: {
        imgOne: Array
    },
    layoutSix: {
        imgOne: Array,
        imgTwo: Array
    },
    layoutSeven: {
        imgOne: {
            image: {
                url: String,
                public_id: String
            },
            url: String
        },
        imgTwo: {
            image: {
                url: String,
                public_id: String
            },
            url: String
        },
        imgThree: {
            image: {
                url: String,
                public_id: String
            },
            url: String
        },
        imgFour: {
            image: {
                url: String,
                public_id: String
            },
            url: String
        },
        imgFive: {
            image: {
                url: String,
                public_id: String
            },
            url: String
        },
        imgSix: {
            image: {
                url: String,
                public_id: String
            },
            url: String
        },
        imgSeven: {
            image: {
                url: String,
                public_id: String
            },
            url: String
        },
        imgEight: {
            image: {
                url: String,
                public_id: String
            },
            url: String
        }
    },
    layoutEight: {
        imgOne: Array,
        imgTwo: Array,
        imgThree: Array,
        imgFour: Array,
        imgFive: Array,
        imgSix: Array,
        imgSeven: Array,
        imgEight: Array
    },
    layoutNine: {
        imgOne: {
            image: {
                url: String,
                public_id: String
            }
        },
        content: {
            heading: String,
            subtitle: String,
            button: String,
            buttonUrl: String
        }
    },
    layoutTen: {
        imgOne: Array,
        content: {
            heading: String,
            subtitle: String,
            button1: String,
            button2: String,
            button1URl: String,
            button2URL: String
        }
    },
    layoutEleven: {
        imgOne: {
            image: {
                url: String,
                public_id: String
            },
        },
        content: {
            heading: String,
            subtitle: String,
            description: String,
            linkTitle: String,
            textlink: String
        }
    },
    siteFeaturesIcons: Array,
    mainBanner: {
        image: {
            url: String,
            public_id: String
        },
        url: String
    },
    sideBanner1: {
        image: {
            url: String,
            public_id: String
        },
        url: String
    },
    sideBanner2: {
        image: {
            url: String,
            public_id: String
        },
        url: String
    },
    midSecDisplay: Boolean,
    midSecImg1: {
        url: String,
        public_id: String
    },
    midSecImg2: {
        url: String,
        public_id: String
    },
    midSecImg3: {
        url: String,
        public_id: String
    },
    midSec2Display: Boolean,
    midSec2Img1: {
        url: String,
        public_id: String
    },
    midSec2Img2: {
        url: String,
        public_id: String
    },
    midSec2Img3: {
        url: String,
        public_id: String
    },
    midSec3Display: Boolean,
    midSec3Img1: {
        url: String,
        public_id: String
    },
    midSec3Img2: {
        url: String,
        public_id: String
    },
    midSec3Img3: {
        url: String,
        public_id: String
    },
    midSec4Display: Boolean,
    midSec4Img1: {
        url: String,
        public_id: String
    },
    midSec4Img2: {
        url: String,
        public_id: String
    },
    midSec4Img3: {
        url: String,
        public_id: String
    },
    midSec5Display: Boolean,
    midSec5Img1: {
        url: String,
        public_id: String
    },
    midSec5Img2: {
        url: String,
        public_id: String
    },
    midSec5Img3: {
        url: String,
        public_id: String
    },
    // displayAllCategories: Boolean,
    displayEventProducts: Boolean,
    selectedCategories: Array,
    contactUs: Object,
    fbDisplay: Boolean,
    instaDisplay: Boolean,
    twitterDisplay: Boolean,
    whatsappDisplay: Boolean,
    linkedInDisplay: Boolean,
    youTubeDisplay: Boolean,
    behanceDisplay: Boolean,
    dribbbleDisplay: Boolean,
    pinterestDisplay: Boolean,
    featureContent: Array,
    siteFeatureLayout1: Array,
    siteFeatureLayout2: Array,
    featuresIconDeimension: {
        width: Number,
        height: Number
    },

    selectedCategoryLayout: Number,
    selectedProductCardLayout: Number,
    selectedProductMainLayout: Number,
    selectedProductSpecsLayout: Number,
    selectedFooterLayout: Number,


    CategoriesOneDisplay: Boolean,
    CategoriesOne: {
        displayAllCategories: Boolean,
        selectedCategories: Array
    },
    CategoriesTwoDisplay: Boolean,
    CategoriesTwo: {
        displayAllCategories: Boolean,
        selectedCategories: Array
    },
    CategoriesThreeDisplay: Boolean,
    CategoriesThree: {
        displayAllCategories: Boolean,
        selectedCategories: Array
    },

    eventCardLayoutOne: Boolean,
    eventLayountOneSelectedEvents: Array,
    eventCardLayoutTwo: Boolean,
    eventLayountTwoSelectedEvents: Array,

    OtherFooterContent: Array,
    footerMapUrl: String,
    footerLayout2Content: Array,
    footerImages: Array,
    footerLayout3Content: Array,
    footerLayout4Content: Object,

    contactUsDetails: Object,
    aboutUsSecOne: Object,
    aboutUsSecTwo: Object,
    aboutUsSecThree: Object,
    aboutUsSecFour: Object,
    aboutUsSecFive: Object,
    aboutUsSecSix: Object,
    aboutUsSecSeven: Object,
    aboutUsSecEight: Object,
    aboutUsSecNine: Object,
    aboutUsSecTen: Object,

    MainBannerContent: Object,
    featureSecOne: Object,
    featureSecTwo: Object,
    quoteContent: Object,
    brands: Object,
    testimonialContent: Object,
    industriesContent: Object,
    regionsContent: Object,
    eventBottom: Object,
    eventTop: Object,
    eventMiddle: Object,
    newsLetter: Object,
    blogSecOne: Object,
    contactSecOne: Object,
    footerContent: Object,
    headingsContent: Object,

    allPagesSEODetails: Object
})

module.exports = mongoose.model('SiteConfig', siteConfigSchema);
