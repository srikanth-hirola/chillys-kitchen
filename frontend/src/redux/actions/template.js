
export const StructureTemplate = (data) => async (dispatch) => {
    dispatch({
        type: 'mountInitialTemplateData',
        payload: data,
    })
}

export const UpdateEditableTemplateData = (data) => async (dispatch) => {
    dispatch({
        type: 'updateEditableTemplateData',
        payload: data
    })
}
