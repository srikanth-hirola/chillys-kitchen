const ProductModal = {
    draft: false,
    name: "",
    slug: "",
    metaTitle: "",
    metaDescription: "",

    description: "",
    noItem: null,
    searchTerms: [],
    category: "",
    subCategory: '',
    SKU: "",
    isMultiImage: false,
    specs: [
        {
            key: "",
            value: "",
        },
    ],
    showInputs: false,
    colorInputs: [
        {
            SKU: "",
            image: "",
            imageColor: "",
            originalPrice: null,
            discountPrice: null,
            stock: null,
            sold_out: null,
        },
    ],
    originalPrice: null,
    discountPrice: null,
    stock: null,
    images: [],
    mainImage: {
        public_id: '',
        url: ''
    },
};

export default ProductModal;
