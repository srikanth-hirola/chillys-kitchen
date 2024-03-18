import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    newMessageDate: localStorage.getItem('newMessageDate')
        ? JSON.parse(localStorage.getItem('newMessageDate'))
        : [],
};

export const messageReducer = createReducer(initialState, {
    setNewMessage: (state, action) => {
        state.newMessageDate = [...state.newMessageDate, action.payload]
    },
    updateNewMessage: (state, action) => {

        let updatedState = state.newMessageDate.map((item) => {
            if (item?.userId === action.payload.userId) {
                return {
                    ...item,
                    messageLength: (item?.messageLength || 0) + 1
                };
            }
            return item;
        })

        state.newMessageDate = updatedState
    },
    removeNewMessage: (state, action) => {
        state.newMessageDate = state.newMessageDate?.filter((item) => item?.userId !== action.payload.userId)
    }
})