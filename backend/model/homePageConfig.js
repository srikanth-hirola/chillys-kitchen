const mongoose = require('mongoose');

const homePageSchema = new mongoose.Schema({

    // banner with header fields
    creatingtext: String,

    headerImages: Array,

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

    testimonialsImages: Array,
    testimonialsContent: Object,

    // cclient imaages
    clientImages: Array,

    footerContent: Object,
    OtherFooterContent: Object,
    footerImages: Array,

});

module.exports = mongoose.model('HomePageModel', homePageSchema)