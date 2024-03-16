import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  isLoadingShipping: true,
  shippingOrders: [],
  returnShippingOrders: [],
};

export const shippingReducer = createReducer(initialState, {
  // get all orders of shop
  getAllShippingOrdersShopRequest: (state) => {
    state.isLoading = true;
  },
  getAllShippingOrdersShopSuccess: (state, action) => {
    state.shippingOrders = action.payload.data;
    state.isLoading = false;
  },
  getAllShippingOrdersShopFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },


  //get all return orders of shop
  getAllReturnShippingOrdersShopRequest: (state) => {
    state.isLoading = true;
  },
  getAllReturnShippingOrdersShopSuccess: (state, action) => {
    state.returnShippingOrders = action.payload.data;
    state.isLoading = false;
  },
  getAllReturnShippingOrdersShopFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
});
