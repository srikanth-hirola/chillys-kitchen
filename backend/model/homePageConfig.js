const mongoose = require('mongoose');

const homePageSchema = new mongoose.Schema({
    header: {
        logo: {
            content: {
                img: {
                    public_id: "",
                    url: "",
                },
            },
        },
        nav: {
            navigation: {
                content: {
                    items: {
                        structure: {
                            title: "",
                            url: "",
                        },
                    },
                    items: [
                        {
                            title: "",
                            url: "",
                        },
                        {
                            title: "",
                            url: "",
                        },
                        {
                            title: "",
                            url: "",
                        },
                        {
                            title: "",
                            url: "",
                        },
                        {
                            title: "",
                            url: "",
                        },
                        {
                            title: "",
                            url: "",
                        },
                    ],
                },
            },
        },
        number: {
            content: {
                phonenumber: {
                    text: '',
                }
            },
        },
    },

    banner: {
        backgroundImage: {
            content: {
                img: {
                    public_id: "",
                    url: "",
                },
            },
        },
        bannerSubTitle: {
            content: {
                text: "",
            },
        },
        bannerTitle: {
            content: {
                text: "",
            },
        },
        bannerDesignedTitle: {
            content: {
                text: "",
            },
        },
        bannerDescription: {
            content: {
                text: "",
            },
        },
        buttons: {
            "button one": {
                content: {
                    title: "",
                    url: "",
                },
            },
            "button two": {
                content: {
                    title: "",
                    url: "",
                },
            },
        },
        bannerMainImage: {
            content: {
                img: {
                    public_id: "",
                    url: "",
                },
            },
        },
    },


    menuCardsSection: {
        menuCardSectionSubTitle: {
            content: {
                text: "",
            },
        },
        menuCardSectionTitle: {
            content: {
                text: "",
            },
        },
        menucards: {
            cards: {
                content: {
                    items: {
                        structure: {
                            img: {
                                public_id: "",
                                url: "",
                            },
                            title: "",
                            description: "",
                            link: {
                                title: "",
                                url: "",
                            },
                        },
                    },
                    items: [
                        {
                            img: {
                                public_id: "",
                                url: "",
                            },
                            title: "",
                            description: "",
                            link: {
                                title: "",
                                url: "",
                            },
                        },
                        {
                            img: {
                                public_id: "",
                                url: "",
                            },
                            title: "",
                            description: "",
                            link: {
                                title: "",
                                url: "",
                            },
                        },
                        {
                            img: {
                                public_id: "",
                                url: "",
                            },
                            title: "",
                            description: "",
                            link: {
                                title: "",
                                url: "",
                            },
                        },
                        {
                            img: {
                                public_id: "",
                                url: "",
                            },
                            title: "",
                            description: "",
                            link: {
                                title: "",
                                url: "",
                            },
                        },
                    ],
                },
            },
        }, 
    },


    aboutUsSection: {
        Image: {
            content: {
                img: {
                    public_id: "",
                    url: "",
                },
            },
        },
        contactDetails: {
            title: {
                content: {
                    text: "",
                },
            },
            phoneNumber: {
                content: {
                    text: "",
                },
            },
            email: {
                content: {
                    text: "",
                },
            },
            Address: {
                content: {
                    text: "",
                },
            },
        },
        aboutSectionTitle: {
            content: {
                text: "",
            },
        },
        aboutSectionDescriptionOne: {
            content: {
                text: "",
            },
        },
        aboutSectionDescriptionTwo: {
            content: {
                text: "",
            },
        },
        button: {
            content: {
                title: "",
                url: "",
            },
        },
    },



    serviceSection: {
        serviceSubTitle: {
            content: {
                text: "",
            },
        },
        serviceTitle: {
            content: {
                text: "",
            },
        },
        servicecards: {
            cards: {
                content: {
                    items: {
                        structure: {
                            img: {
                                public_id: "",
                                url: "",
                            },
                            title: "",
                            description: "",
                        },
                    },
                    items: [
                        {
                            img: {
                                public_id: "",
                                url: "",
                            },
                            title: "",
                            description: "",
                        },
                        {
                            img: {
                                public_id: "",
                                url: "",
                            },
                            title: "",
                            description: "",
                        },
                        {
                            img: {
                                public_id: "",
                                url: "",
                            },
                            title: "",
                            description: "",
                        },
                    ],
                },
            },
        }, 
    },



    aboutUsSectionTwo: {
        ImageOne: {
            content: {
                img: {
                    public_id: "",
                    url: "",
                },
            },
        },
        ImageTwo: {
            content: {
                img: {
                    public_id: "",
                    url: "",
                },
            },
        },
        ImageThree: {
            content: {
                img: {
                    public_id: "",
                    url: "",
                },
            },
        },
        aboutUsSectionTwoTitle: {
            content: {
                text: "",
            },
        },
        aboutUsSectionTwoDescription: {
            content: {
                text: "",
            },
        },
        Lists: {
            listItems: {
                content: {
                    items: {
                        structure: {
                            text: "",
                        }
                    },
                    limit: 3,
                    items: [
                        {
                            text: "",
                        },
                        {
                            text: "",
                        },
                        {
                            text: "",
                        },
                    ],
                },
            },
        },
    },



    clientImages: {
        content: {
            items: {
                structure: {
                    img: {
                        public_id: "",
                        url: "",
                    },
                },
            },
            items: [
                {
                    img: {
                        public_id: "",
                        url: "",
                    },
                },
                {
                    img: {
                        public_id: "",
                        url: "",
                    },
                },
                {
                    img: {
                        public_id: "",
                        url: "",
                    },
                },
                {
                    img: {
                        public_id: "",
                        url: "",
                    },
                },
                {
                    img: {
                        public_id: "",
                        url: "",
                    },
                },
                {
                    img: {
                        public_id: "",
                        url: "",
                    },
                },
            ],
        },
    },



    Footer: {
        footerLogo: {
            content: {
                img: {
                    public_id: "",
                    url: "",
                },
            },
        },
        footerDescription: {
            content: {
                text: "",
            },
        },
        socialMedia: {
            content: {
                items: {
                    structure: {
                        img: {
                            public_id: "",
                            url: "",
                        },
                        link: "",
                    },
                },
                limit: 5,
                items: [
                    {
                        img: {
                            public_id: "",
                            url: "",
                        },
                        link: "",
                    },
                    {
                        img: {
                            public_id: "",
                            url: "",
                        },
                        link: "",
                    },
                    {
                        img: {
                            public_id: "",
                            url: "",
                        },
                        link: "",
                    },
                    {
                        img: {
                            public_id: "",
                            url: "",
                        },
                        link: "",
                    },
                    {
                        img: {
                            public_id: "",
                            url: "",
                        },
                        link: "",
                    },
                ],
            },
        },
        footerOneLinks: {
            content: {
                title: "",
                items: {
                    structure: {
                        title: "",
                        url: "",
                    },
                },
                items: [
                    {
                        title: "",
                        url: "", 
                    },
                    {
                        title: "",
                        url: "", 
                    },
                    {
                        title: "",
                        url: "", 
                    },
                    {
                        title: "",
                        url: "", 
                    },
                    {
                        title: "",
                        url: "", 
                    },
                    {
                        title: "",
                        url: "", 
                    },
                ]
            },
        },
        footerTwoLinks: {
            content: {
                title: "",
                items: {
                    structure: {
                        title: "",
                        url: "",
                    },
                },
                items: [
                    {
                        title: "",
                        url: "", 
                    },
                    {
                        title: "",
                        url: "", 
                    },
                    {
                        title: "",
                        url: "", 
                    },
                    {
                        title: "",
                        url: "", 
                    },
                    {
                        title: "",
                        url: "", 
                    },
                    {
                        title: "",
                        url: "", 
                    },
                ]
            },
        },
        footerImages: {
            content: {
                title: "",
                items: {
                    structure: {
                        img: {
                            public_id: "",
                            url: "",
                        },
                    },
                },
                limit: 4,
                items: [
                    {
                        img: {
                            public_id: "",
                            url: "",
                        },
                    },
                    {
                        img: {
                            public_id: "",
                            url: "",
                        },
                    },
                    {
                        img: {
                            public_id: "",
                            url: "",
                        },
                    },
                    {
                        img: {
                            public_id: "",
                            url: "",
                        },
                    },
                ],
            },
        },
    },


});

module.exports = mongoose.model('HomePageModel', homePageSchema)