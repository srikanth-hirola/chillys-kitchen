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
    cardsImages: Array,
    menuContent: Object,

    // aboutus section one
    aboutUsSectionOneImages: Array,
    aboutUsOneContent: Object,
    serviceImages: Array,
    serviceContent: Object,

    // about us section two
    deliverySectionImages: Array,
    deliverySectionContent: Object,

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