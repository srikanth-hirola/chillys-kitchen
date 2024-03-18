import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  cart: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
  buyNow: localStorage.getItem('buyNow')
    ? JSON.parse(localStorage.getItem('buyNow'))
    : [],
};

export const cartReducer = createReducer(initialState, {
  addToCart: (state, action) => {
    const item = action.payload;
    return {
      ...state,
      cart: [...state.cart, item],
    };
  },
  updateCartItem: (state, action) => {
    const updatedItem = action.payload;
    // Replace the existing item in the cart with the updated item
    const updatedCart = state.cart.map((item) =>
      item._id === updatedItem._id &&
        item.selectedColor._id === updatedItem.selectedColor._id &&
        item.attrId === updatedItem.attrId
        ? updatedItem
        : item
    );

    return {
      ...state,
      cart: updatedCart,
    };
  },

  updateCart: (state, action) => {
    const item = action.payload;
    return {
      ...state,
      cart: item,
    };
  },

  removeFromCart: (state, action) => {
    const data = state.cart.filter((i) => i.attrId !== action.payload);
    let arr = [...data];
    return {
      ...state,
      cart: arr,
    };
  },
  buyNow: (state, action) => {
    const item = action.payload;
    return {
      ...state,
      buyNow: [item],
    };
  },

  removeAllFromCart: (state) => {
    return {
      ...state,
      cart: [],
    };
  }
});
