const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
  draft: Boolean,
  name: {
    type: String,
    // required: [true, 'Please enter your product name!'],
  },
  slug: String,
  metaTitle: String,
  metaDescription: String,
  productIdState: Boolean,
  productId: String,
  description: {
    type: String,
  },
  model: String,
  noItem: String,
  searchTerms: Array,
  category: {
    type: String,
    // required: [true, 'Please enter your product category!'],
  },
  SKU: String,
  specs: [
    {
      heading: String,
      key: {
        name: String,
        value: [String],
      },
    },
  ],
  specs2: [
    {
      heading: String,
      key: {
        name: String,
        value: String,
      },
    },
  ],
  haveAttributes: Boolean,
  attributeStock: Boolean,
  attributes: [
    {
      name: String,
      values: [
        {
          valName: String,
          stock: Number,
          eventStock: Number,
          sold_out: Number,
        },
      ],
    },
  ],
  showInputs: Boolean,
  colorInputs: [ //to check if it has varient or not
    {
      SKU: String,
      image: {
        public_id: String,
        url: String,
      },
      imageColor: String,
      originalPrice: String,
      discountPrice: String,
      stock: Number,
      sold_out: Number,
      haveAttributes: Boolean,
      attributeStock: Boolean,
      attributes: [
        {
          name: String,
          values: [
            {
              valName: String,
              stock: Number,
              eventStock: Number,
              sold_out: Number,
            },
          ],
        },
      ],
    },
  ],
  originalPrice: {
    type: Number,
  },
  discountPrice: {
    type: Number,
  },
  stock: {
    type: Number,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  mainImage: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  reviews: [
    {
      user: {
        type: Object,
      },
      rating: {
        type: Number,
      },
      comment: {
        type: String,
      },
      productId: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  ratings: {
    type: Number,
  },
  shopId: {
    type: String,
    required: true,
  },
  shop: {
    type: Object,
    required: true,
  },
  sold_out: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
// const productSchema = new mongoose.Schema({
//   draft: Boolean,
//   approved: {
//     type: Boolean,
//   },
//   rejected: {
//     type: Boolean,
//   },
//   name: {
//     type: String,
//     // required: [true, 'Please enter your product name!'],
//   },
//   slug: String,
//   brandName: {
//     type: String,
//   },
//   seoKeywords: [String],
//   metaTitle: String,
//   metaDescription: String,
//   productIdState: Boolean,
//   productId: String,
//   description: {
//     type: String,
//     // required: [true, 'Please enter your product description!'],
//   },
//   productDescription: Array,
//   model: String,
//   noItem: String,
//   codAvailable: Boolean,
//   refundAvailable: Boolean,
//   ataDimension: Boolean,
//   itemLength: Number,
//   itemLengthUnit: String,
//   itemWidth: Number,
//   itemWidthUnit: String,
//   itemHeight: Number,
//   itemHeightUnit: String,
//   ataWeight: Boolean,
//   itemWeight: Number,
//   itemWeightUnit: String,
//   assemblyReq: Boolean,
//   searchTerms: Array,
//   noOfPieces: Number,
//   components: String,
//   assemblyInstruction: String,
//   size: String,
//   color: String,
//   ataMaterials: Boolean,
//   materialType: String,
//   manufacturer: String,
//   safetyWarning: String,
//   packageHeight: Number,
//   packageHeightUnit: String,
//   packageLength: Number,
//   packageLengthhUnit: String,
//   packageWidth: Number,
//   packageWidthUnit: String,
//   packageWeight: Number,
//   packageWeightUnit: String,
//   productCareInstruction: String,
//   shape: String,
//   warrentyDescription: String,
//   constructionType: String,
//   pickupAddress: String,
//   category: {
//     type: String,
//     // required: [true, 'Please enter your product category!'],
//   },
//   subCatgory: {
//     type: String,
//     // required: [true, 'Please enter your product Sub-category!'],
//   },
//   subSubCategory: {
//     type: String,
//     // required: [true, 'Please enter your product Sub Sub-category!'],
//   },
//   SKU: String,
//   taxPercent: Number,
//   productTaxCode: String,
//   specs: [
//     {
//       heading: String,
//       key: {
//         name: String,
//         value: [String],
//       },
//     },
//   ],
//   specs2: [
//     {
//       heading: String,
//       key: {
//         name: String,
//         value: String,
//       },
//     },
//   ],
//   haveAttributes: Boolean, //single product(non-varient product), if it has attribute or not
//   attributeStock: Boolean,// if attribute is true , then cheking if  attribute stocks is there or not
//   attributes: [ //if product have attribute
//     {
//       name: String,
//       values: [
//         {
//           valName: String,
//           stock: Number,
//           eventStock: Number,
//           sold_out: Number,
//         },
//       ],
//     },
//   ],
//   showInputs: Boolean, //varient product
//   colorInputs: [ //to check if it has varient or not
//     {
//       SKU: String,
//       materialType: String,
//       length: Number,
//       itemLengthUnit: String,
//       width: Number,
//       itemWidthUnit: String,
//       height: Number,
//       itemHeightUnit: String,
//       weight: Number,
//       itemWeightUnit: String,
//       image: {
//         public_id: String,
//         url: String,
//       },
//       imageColor: String,
//       originalPrice: String,
//       discountPrice: String,
//       eventPrice: Number,
//       eventStock: Number,
//       stock: Number,
//       sold_out: Number,
//       haveAttributes: Boolean,
//       attributeStock: Boolean,
//       attributes: [ //if varient has attribute
//         {
//           name: String,
//           values: [
//             {
//               valName: String,
//               stock: Number,
//               eventStock: Number,
//               sold_out: Number,
//             },
//           ],
//         },
//       ],
//     },
//   ],
//   itemCondition: String, // rest of the points apart varient , attribute
//   conditionNote: String,
//   maxOrderQuantity: Number,
//   giftMessaged: String,
//   giftWrapAvailable: String,
//   hsnCode: Number,
//   tags: {
//     type: String,
//   },
//   originalPrice: {
//     type: Number,
//   },
//   discountPrice: {
//     type: Number,
//   },
//   eventPrice: {
//     type: Number,
//   },
//   stock: {
//     type: Number,
//   },
//   eventStock: {
//     type: Number,
//   },
//   images: [
//     {
//       public_id: {
//         type: String,
//         required: true,
//       },
//       url: {
//         type: String,
//         required: true,
//       },
//     },
//   ],
//   mainImage: {
//     public_id: {
//       type: String,
//     },
//     url: {
//       type: String,
//     },
//   },
//   reviews: [
//     {
//       user: {
//         type: Object,
//       },
//       rating: {
//         type: Number,
//       },
//       comment: {
//         type: String,
//       },
//       productId: {
//         type: String,
//       },
//       createdAt: {
//         type: Date,
//         default: Date.now(),
//       },
//     },
//   ],
//   ratings: {
//     type: Number,
//   },
//   shopId: {
//     type: String,
//     required: true,
//   },
//   shop: {
//     type: Object,
//     required: true,
//   },
//   sold_out: {
//     type: Number,
//     default: 0,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now(),
//   },
// });

module.exports = mongoose.model('Product', productSchema);
