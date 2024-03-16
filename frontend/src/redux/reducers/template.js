import { createReducer } from '@reduxjs/toolkit';

const initialState = {
    initialTemplateDate: {},
    editableTemplateData: {},
};

export const templateDataReducer = createReducer(initialState, {
    // mounting initial template data
    mountInitialTemplateData: (state, action) => {
        state.initialTemplateDate = action.payload;
        state.editableTemplateData = action.payload
    },
    updateEditableTemplateData: (state, action) => {
        state.editableTemplateData = action.payload
    }
});