const mongoose = require('mongoose');

const homePageSchema = new mongoose.Schema({

    // banner with header fields
    creatingtext: String,
    mainLogo : {
        public_id: String,
        url: String
    },
    headerContent: Object,
    bannerImages: Array,
    bannerContent: Object,
    menuContent: Object,

    // aboutus section one
    aboutUsImage: {
        public_id: String,
        url: String,
    },
    aboutUsContent: Object,
    serviceContent: Object,

    // about us section two
    aboutUsSectionTwoImage: Array,
    aboutUsSectionTwoContent: Object,

    // cclient imaages
    clientImages: Array,

    // footer
    footerLogo: {
        public_id: String,
        url: String,
    },
    footerContent: Object,
    footerImages: Array,

});

module.exports = mongoose.model('HomePageModel', homePageSchema)