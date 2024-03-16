import useAPI from '../../customHooks/API/useAPI';


// get all categories
export const getAllCategories = () => async (dispatch) => {
  const { getApi } = useAPI();
  try {
    dispatch({
      type: 'adminAllCategoriesRequest',
    });

    const { data, error } = await getApi({ endpoint: `/api/v2/category/get-all-categories` });

    if (data) {
      dispatch({
        type: 'adminAllCategoriesSuccess',
        payload: data.categories,
      });
    }
    if (error) {
      dispatch({
        type: 'adminAllCategoriesFailed',
        payload: error.response.data.message,
      });
    }


    // return data.categories;


  } catch (error) {
    dispatch({
      type: 'adminAllCategoriesFailed',
      payload: error.response.data.message,
    });
  }
};

// get all Sub categories
export const getAllSubCategories = () => async (dispatch) => {
  const { getApi } = useAPI();
  try {
    dispatch({
      type: 'allSubCategories',
    });

    const { data, error } = await getApi({ endpoint: `/api/v2/category/get-all-sub-categories` });

    if (data) {
      dispatch({
        type: 'allSubCategoriesSuccess',
        payload: data.categories,
      });
    }
    if (error) {
      dispatch({
        type: 'allSubCategoriesFailed',
        payload: error.response.data.message,
      });
    }


    // return data.categories;


  } catch (error) {
    dispatch({
      type: 'allSubCategoriesFailed',
      payload: error.response.data.message,
    });
  }
};

