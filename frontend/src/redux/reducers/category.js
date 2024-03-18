import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  isLoading: true,
  category: [],
  subCategories: []
};

export const categoryReducer = createReducer(initialState, {
  adminAllCategoriesRequest: (state) => {
    state.isLoading = true
  },
  adminAllCategoriesSuccess: (state, action) => {
    state.isLoading = false
    state.category = action.payload
  },
  adminAllCategoriesFailed: (state, action) => {
    state.isLoading = true
    state.error = action.payload
  },

  allSubCategories: (state) => {
    state.isLoading = true
  },
  allSubCategoriesSuccess: (state, action) => {
    state.isLoading = false
    state.subCategories = action.payload
  },
  allSubCategoriesFailed: (state, action) => {
    state.isLoading = true
    state.error = action.payload
  },
})

// import { createReducer } from '@reduxjs/toolkit';
// import { ADD_SPECIFICATION } from '../actions/types';

// const initialState = {
//   isLoading: true,
// };

// export const languageReducerr = (state = initialState, action) => {
//   switch (action.type) {
//     case 'ADD_SPECIFICATION':
//       return {
//         ...state,
//         specifications: [...state.specifications, action.payload],
//       };
//     default:
//       return state;
//   }
// };

