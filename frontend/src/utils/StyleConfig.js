import { useSelector } from 'react-redux';


export const StyleConfig = () => {
    const { siteConfigData } = useSelector((state) => state.siteConfig);


    const styles = {
        custom_container: "w-11/12 hidden sm:block",
        heading: 'text-[27px] text-center md:text-start font-[600] font-Roboto pb-[20px]',
        section: 'w-11/12 mx-auto',
        productTitle: 'text-[25px] font-[600] font-Roboto text-[#333]',
        productDiscountPrice: "font-bold text-[18px] text-[#333] font-Roboto",
        price: "font-[500] text-[16px] text-[#d55b45] pl-3 mt-[-4px] line-through",
        shop_name: "pt-3 text-[15px] text-blue-400 pb-3",
        active_indicator: "absolute bottom-[-27%] left-0 h-[3px] w-full bg-[crimson]",
        button: 'w-[150px] bg-primary h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer',
        button1: 'w-[150px] bg-primary h-[50px] flex items-center justify-center rounded-xl cursor-pointer',
        cart_button: "px-[20px] h-[38px] rounded-[20px] bg-[#fa8232] flex items-center justify-center cursor-pointer",
        cart_button_text: "text-[#fff] text-[16px] font-[600]",
        input: "w-full border p-1 rounded-[5px]",
        activeStatus: "w-[10px] h-[10px] rounded-full absolute top-0 right-1 bg-[#40d132]",
        noramlFlex: "flex items-center",
        mainColor: siteConfigData?.mainColor,
        fontColor: siteConfigData?.fontColor,
        fontActiveColor: siteConfigData?.fontActiveColor,
        bgcolor: siteConfigData?.bgcolor,
        cardColors: siteConfigData?.cardColors,
        bannerColors: siteConfigData?.bannerColors,
        headerColors: siteConfigData?.headerColors,
        siteFeaturesColors: siteConfigData?.siteFeaturesColors,
        footerColors: siteConfigData?.footerColors,
        productMainColors: siteConfigData?.productMainColors,


        logo: siteConfigData?.logo,
        allImages: siteConfigData?.allImages,
        headerImages: siteConfigData?.headerImages,
        bannerImages: siteConfigData?.bannerImages,
        collectionImages: siteConfigData?.collectionImages,
        adbannerImages: siteConfigData?.adbannerImages,
        featureImages: siteConfigData?.featureImages,
        socialmediaImages: siteConfigData?.socialmediaImages,
        newsletterImages: siteConfigData?.newsletterImages,
        saleImages: siteConfigData?.saleImages,
        categoryproductImages: siteConfigData?.categoryproductImages,
        brandImages: siteConfigData?.brandImages,
        aboutUsImages: siteConfigData?.aboutUsImages,
        formImages: siteConfigData?.formImages,
        testimonialsImages: siteConfigData?.testimonialsImages,
        industriesImages: siteConfigData?.industriesImages,
        regionsImages: siteConfigData?.regionsImages,
        eventsImages: siteConfigData?.eventsImages,
        blogsImages: siteConfigData?.blogsImages,

        currency: siteConfigData?.currency,
        paymentMethods: siteConfigData?.paymentMethods,
        CurrencyArr: siteConfigData?.CurrencyArr,
        mainBanner: siteConfigData?.mainBanner,
        sideBanner1: siteConfigData?.sideBanner1,
        sideBanner2: siteConfigData?.sideBanner2,

        midSecDisplay: siteConfigData?.midSecDisplay,
        midSecImg1: siteConfigData?.midSecImg1,
        midSecImg2: siteConfigData?.midSecImg2,
        midSecImg3: siteConfigData?.midSecImg3,

        midSec2Display: siteConfigData?.midSec2Display,
        midSec2Img1: siteConfigData?.midSec2Img1,
        midSec2Img2: siteConfigData?.midSec2Img2,
        midSec2Img3: siteConfigData?.midSec2Img3,

        midSec3Display: siteConfigData?.midSec3Display,
        midSec3Img1: siteConfigData?.midSec3Img1,
        midSec3Img2: siteConfigData?.midSec3Img2,
        midSec3Img3: siteConfigData?.midSec3Img3,

        midSec4Display: siteConfigData?.midSec4Display,
        midSec4Img1: siteConfigData?.midSec4Img1,
        midSec4Img2: siteConfigData?.midSec4Img2,
        midSec4Img3: siteConfigData?.midSec4Img3,

        midSec5Display: siteConfigData?.midSec5Display,
        midSec5Img1: siteConfigData?.midSec5Img1,
        midSec5Img2: siteConfigData?.midSec5Img2,
        midSec5Img3: siteConfigData?.midSec5Img3,

        selectedCategories: siteConfigData?.selectedCategories,
        displayAllCategories: siteConfigData?.displayAllCategories,
        displayEventProducts: siteConfigData?.displayEventProducts,

        contactUs: siteConfigData?.contactUs,
        fbDisplay: siteConfigData?.fbDisplay,
        instaDisplay: siteConfigData?.instaDisplay,
        twitterDisplay: siteConfigData?.twitterDisplay,
        whatsappDisplay: siteConfigData?.whatsappDisplay,
        linkedInDisplay: siteConfigData?.linkedInDisplay,
        youTubeDisplay: siteConfigData?.youTubeDisplay,
        behanceDisplay: siteConfigData?.behanceDisplay,
        dribbbleDisplay: siteConfigData?.dribbbleDisplay,
        pinterestDisplay: siteConfigData?.pinterestDisplay,

        selectedBannerLayout: siteConfigData?.selectedBannerLayout,
        layoutOne: siteConfigData?.layoutOne,
        layoutTwo: siteConfigData?.layoutTwo,
        layoutThree: siteConfigData?.layoutThree,
        layoutFour: siteConfigData?.layoutFour,
        layoutFive: siteConfigData?.layoutFive,
        layoutSix: siteConfigData?.layoutSix,
        layoutSeven: siteConfigData?.layoutSeven,
        layoutEight: siteConfigData?.layoutEight,
        layoutNine: siteConfigData?.layoutNine,
        layoutTen: siteConfigData?.layoutTen,
        layoutEleven: siteConfigData?.layoutEleven,

        selectedHeaderLayout: siteConfigData?.selectedHeaderLayout,
        homePageSectionsPosition: siteConfigData?.homePageSectionsPosition,
        selectedSiteFeatureLayout: siteConfigData?.selectedSiteFeatureLayout,
        siteFeaturesIcons: siteConfigData?.siteFeaturesIcons,
        featureContent: siteConfigData?.featureContent,
        siteFeatureLayout1: siteConfigData?.siteFeatureLayout1,
        featuresIconDeimension: siteConfigData?.featuresIconDeimension,

        selectedCategoryLayout: siteConfigData?.selectedCategoryLayout,
        selectedProductCardLayout: siteConfigData?.selectedProductCardLayout,
        selectedProductMainLayout: siteConfigData?.selectedProductMainLayout,
        selectedProductSpecsLayout: siteConfigData?.selectedProductSpecsLayout,
        selectedFooterLayout: siteConfigData?.selectedFooterLayout,

        CategoriesOneDisplay: siteConfigData?.CategoriesOneDisplay,
        CategoriesOne: siteConfigData?.CategoriesOne,
        CategoriesTwoDisplay: siteConfigData?.CategoriesTwoDisplay,
        CategoriesTwo: siteConfigData?.CategoriesTwo,
        CategoriesThreeDisplay: siteConfigData?.CategoriesThreeDisplay,
        CategoriesThree: siteConfigData?.CategoriesThree,

        eventCardLayoutOne: siteConfigData?.eventCardLayoutOne,
        eventCardLayoutTwo: siteConfigData?.eventCardLayoutTwo,
        eventLayountOneSelectedEvents: siteConfigData?.eventLayountOneSelectedEvents,
        eventLayountTwoSelectedEvents: siteConfigData?.eventLayountTwoSelectedEvents,

        OtherFooterContent: siteConfigData?.OtherFooterContent,
        footerMapUrl: siteConfigData?.footerMapUrl,
        footerLayout2Content: siteConfigData?.footerLayout2Content,
        footerImages: siteConfigData?.footerImages,
        footerLayout3Content: siteConfigData?.footerLayout3Content,
        footerLayout4Content: siteConfigData?.footerLayout4Content,

        fontFamilyLink: siteConfigData?.fontFamily?.fontFamilyLink,
        fontFamily: `${siteConfigData?.fontFamily?.fontFamily}`,
        // fontFamilyLink: "https://fonts.googleapis.com/css2?family=ABeeZee&display=swap",
        // fontFamily: 'ABeeZee, sans-serif'

        productImagesGallery: siteConfigData?.productImagesGallery,
        contactUsDetails: siteConfigData?.contactUsDetails,


        aboutUsSecOne: siteConfigData?.aboutUsSecOne,
        aboutUsSecTwo: siteConfigData?.aboutUsSecTwo,
        aboutUsSecThree: siteConfigData?.aboutUsSecThree,
        aboutUsSecFour: siteConfigData?.aboutUsSecFour,
        aboutUsSecFive: siteConfigData?.aboutUsSecFive,
        aboutUsSecSix: siteConfigData?.aboutUsSecSix,
        aboutUsSecSeven: siteConfigData?.aboutUsSecSeven,
        aboutUsSecEight: siteConfigData?.aboutUsSecEight,
        aboutUsSecNine: siteConfigData?.aboutUsSecNine,
        aboutUsSecTen: siteConfigData?.aboutUsSecTen,

        MainBannerContent: siteConfigData?.MainBannerContent,
        featureSecOne: siteConfigData?.featureSecOne,
        featureSecTwo: siteConfigData?.featureSecTwo,
        quoteContent: siteConfigData?.quoteContent,
        brands: siteConfigData?.brands,
        testimonialContent: siteConfigData?.testimonialContent,
        industriesContent: siteConfigData?.industriesContent,
        regionsContent: siteConfigData?.regionsContent,
        eventBottom: siteConfigData?.eventBottom,
        eventTop: siteConfigData?.eventTop,
        eventMiddle: siteConfigData?.eventMiddle,
        newsLetter: siteConfigData?.newsLetter,
        blogSecOne: siteConfigData?.blogSecOne,
        contactSecOne: siteConfigData?.contactSecOne,
        footerContent: siteConfigData?.footerContent,
        headingsContent: siteConfigData?.headingsContent,

        allPagesSEODetails: siteConfigData?.allPagesSEODetails
    };

    return styles;
}




