const ProductModal = {
    draft: false,
    name: "",
    slug: "",
    metaTitle: "",
    metaDescription: "",

    description: "",
    noItem: 0,
    searchTerms: [],
    category: "",
    SKU: "",
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
            originalPrice: 0,
            discountPrice: 0,
            stock: 0,
            sold_out: 0,
        },
    ],
    originalPrice: 0,
    discountPrice: 0,
    stock: 0,
    images: [],
    mainImage: "",
};

export default ProductModal;
