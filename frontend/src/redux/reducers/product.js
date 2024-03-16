import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  isLoading: true,
};

export const productReducer = createReducer(initialState, {
  //create draft product
  productCreateDraftRequest: (state) => {
    state.isLoading = true;
  },
  productCreateDraftSuccess: (state, action) => {
    state.isLoading = false;
    state.product = action.payload;
    state.successDraft = true;
  },
  productCreateDraftFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.successDraft = false;
  },

  //create product
  productCreateRequest: (state) => {
    state.isLoading = true;
  },
  productCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.product = action.payload;
    state.success = true;
  },
  productCreateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

  //publish Draft product
  productUpdateCreateRequest: (state) => {
    state.isLoading = true;
  },
  productUpdateCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.product = action.payload;
    state.success = true;
  },
  productUpdateCreateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

  //reset state
  resetSuccessDraft: (state) => {
    state.successDraft = false;
    state.success = false;
    state.successDraftSave = false;
  },

  //Update product
  productPublishDraftCreateRequest: (state) => {
    state.isLoading = true;
  },
  productPublishDraftCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.product = action.payload;
    state.success = true;
  },
  productPublishDraftCreateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

  //save draft product
  productSaveDraftRequest: (state) => {
    state.isLoading = true;
  },
  productSaveDraftSuccess: (state, action) => {
    state.isLoading = false;
    state.product = action.payload;
    state.successDraftSave = true;
  },
  productSaveDraftFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.successDraftSave = false;
  },

  // get all products of shop
  getAllProductsShopRequest: (state) => {
    state.isLoading = true;
  },
  getAllProductsShopSuccess: (state, action) => {
    state.isLoading = false;
    state.products = action.payload;
  },
  getAllProductsShopFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  //get all products for preview
  getAllProductsPreviewRequest: (state) => {
    state.isLoading = true;
  },
  getAllProductsPreviewSuccess: (state, action) => {
    state.isLoading = false;
    state.previewProducts = action.payload;
  },
  getAllProductsPreviewFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // delete product of a shop
  deleteProductRequest: (state) => {
    state.isLoading = true;
  },
  deleteProductSuccess: (state, action) => {
    state.isLoading = false;
    state.message = action.payload;
  },
  deleteProductFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // get all products
  getAllProductsRequest: (state) => {
    state.isLoading = true;
  },
  getAllProductsSuccess: (state, action) => {
    state.isLoading = false;
    state.allProducts = action.payload;
  },
  getAllProductsFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  getPublishedProductsShopRequest: (state) => {
    state.isLoading = true;
  },
  getPubllishedProductsShopSuccess: (state, action) => {
    state.isLoading = false;
    state.allPublishedProducts = action.payload;
  },
  getPublishedProductsShopFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  clearErrors: (state) => {
    state.error = null;
  },
});
