import { createReducer } from '@reduxjs/toolkit';

const initialState = {
    isLoadingSiteConfig: true,
    siteConfigData: {},
    success: false,

    colorOpen: false,
    isGradient: true,

    contentTypeName: ""

};

export const siteConfigReducer = createReducer(initialState, {
    // get all site config
    getAllSiteConfig: (state) => {
        state.isLoadingSiteConfig = true;
    },
    getAllSiteConfigSuccess: (state, action) => {
        state.siteConfigData = action.payload;
        state.isLoadingSiteConfig = false;
    },
    getAllSitConfigFailed: (state, action) => {
        state.isLoadingSiteConfig = false;
        state.error = action.payload;
    },

    //save all site config
    siteConfigRequest: (state) => {
        state.isLoadingSiteConfig = true;
    },
    siteConfigCreateSuccess: (state, action) => {
        state.isLoadingSiteConfig = false;
        state.success = true;
    },
    siteConfigCreateFail: (state, action) => {
        state.isLoadingSiteConfig = false;
        state.error = action.payload;
    },
    resetSiteCongSuccess: (state) => {
        state.success = false;
    },


    //color state
    setColorOpen: (state, action) => {
        state.colorOpen = true;
        state.isGradient = action.payload.isGradient
    },
    setColorClose: (state) => {
        state.colorOpen = false
    },

    setTwoSideBarContentType: (state, action) => {
        state.contentTypeName = action.payload
    }
});