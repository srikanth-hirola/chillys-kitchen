const mongoose = require('mongoose');

const homePageSchema = new mongoose.Schema({

    // banner with header fields
    mainLogo : {
        public_id: String,
        url: String
    },
    navLink : Array,
    phoneNumber: Number,
    bannerImages: Array,
    bannerSubTitle: String,
    bannerTitle: String,
    bannerDescription: String,
    bannerButtons: Array,

    // special menu fields
    menuSubTitle: String,
    menuTitle: String,
    menuCards: Array,

    // aboutus section one
    aboutUsImage: {
        public_id: String,
        url: String,
    },
    contactTitle: String,
    email: String,
    address: String,
    aboutusTitle: String,
    aboutUsDescriptionOne: String,    
    aboutUsDescriptionTwo: String, 
    aboutUsButton: {
        title: String,
        url: String,
    },

    // service section
    serviceSubTitle: String,
    serviceTitle: String,
    serviceCards: Array,

    // about us section two
    aboutUsSectionTwoImage: Array,
    aboutusSectionTwoTitle: String,
    aboutUsSectionTwoDescription: String,    
    aboutUslists: Array,

    // cclient imaages
    clientImages: Array,

    // footer
    footerLogo: {
        public_id: String,
        url: String,
    },
    footerDescription: String,
    footerSocialMedia: Array,
    footerLinksOne: {
        title: String,
        links: Array,
    },
    footerLinksTwo: {
        title: String,
        links: Array,
    },
    footerImages: Array,
    footerImageTitle: String,

});

module.exports = mongoose.model('HomePageModel', homePageSchema)