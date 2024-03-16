export const updateReceivedMessage = (data) => async (dispatch, getState) => {
    dispatch({
        type: 'updateNewMessage',
        payload: data
    });
    localStorage.setItem('newMessageDate', JSON.stringify(getState().messages.newMessageDate));
};

export const createNewReceivedMessage = (data) => async (dispatch, getState) => {
    dispatch({
        type: 'setNewMessage',
        payload: data
    });
    localStorage.setItem('newMessageDate', JSON.stringify(getState().messages.newMessageDate));
};

export const removeViewedMessage = (data) => async (dispatch, getState) => {
    dispatch({
        type: 'removeNewMessage',
        payload: data
    });
    localStorage.setItem('newMessageDate', JSON.stringify(getState().messages.newMessageDate));
};