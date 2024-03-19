/* eslint-disable no-unused-vars */
import axios from 'axios';
import { server } from '../../server';

import useAPI from '../../customHooks/API/useAPI';
import { message } from 'antd';


// create product
export const createProduct = (formData, images) => async (dispatch) => {

  try {
    dispatch({
      type: 'productCreateRequest',
    });

    const { data } = await axios.post(
      `${server}/product/requested-product`,
      formData
    );
    dispatch({
      type: 'productCreateSuccess',
      payload: data.product,
    });
    message.success("Created Product Successfully")
    dispatch({ type: 'resetSuccessDraft' });
  } catch (error) {
    dispatch({
      type: 'productCreateFail',
      payload: error.response.data.message,
    });
  }
};

// Publish Draft product
export const publishDraftProduct =
  (formData, proId, images, mainImage, colorInputsIndexUpdateImage) =>
    async (dispatch) => {
      try {
        dispatch({
          type: 'productPublishDraftCreateRequest',
        });

        const { data } = await axios.post(
          `${server}/product/draft-publish-product`,
          { formData, proId, images, mainImage, colorInputsIndexUpdateImage }
        );
        dispatch({
          type: 'productPublishDraftCreateSuccess',
          payload: data.product,
        });
        message.success("Created Product Successfully")
        dispatch({ type: 'resetSuccessDraft' });
      } catch (error) {
        dispatch({
          type: 'productPublishDraftCreateFail',
          payload: error.response.data.message,
        });
      }
    };

// Update product
export const updateProduct =
  (formData, proId, images, mainImage, colorInputsIndexUpdateImage) =>
    async (dispatch) => {
      try {
        dispatch({
          type: 'productUpdateCreateRequest',
        });

        const { data } = await axios.put(`${server}/product/update-product`, {
          formData,
          proId,
          images,
          mainImage,
          colorInputsIndexUpdateImage,
        });

        dispatch({
          type: 'productUpdateCreateSuccess',
          payload: data.product,
        });
        message.success("Updated Product Successfully")
        dispatch({ type: 'resetSuccessDraft' });
      } catch (error) {
        dispatch({
          type: 'productUpdateCreateFail',
          payload: error.response.data.message,
        });
      }
    };

// create Draft Product
export const createDraftProduct =
  (formData, images, shopId) =>
    async (dispatch) => {
      try {
        dispatch({
          type: 'productCreateDraftRequest',
        });

        const { data } = await axios.post(
          `${server}/product/create-draft-product`,
          { formData, images, shopId }
        );
        dispatch({
          type: 'productCreateDraftSuccess',
          payload: data.product,
        });
        message.success("Created Draft Product Successfully")
        dispatch({ type: 'resetSuccessDraft' });
      } catch (error) {
        dispatch({
          type: 'productCreateDraftFail',
          payload: error.response.data.message,
        });
      }
    };

// save Draft Product
export const saveDraftProduct =
  (formData, proId, images, mainImage, colorInputsIndexUpdateImage) =>
    async (dispatch) => {
      try {
        dispatch({
          type: 'productSaveDraftRequest',
        });

        const { data } = await axios.post(
          `${server}/product/save-draft-product`,
          {
            formData,
            proId,
            images,
            mainImage,
            colorInputsIndexUpdateImage,
          }
        );

        dispatch({
          type: 'productSaveDraftSuccess',
          payload: data.product,
        });
        message.success("Saved Draft Product Successfully")
        dispatch({ type: 'resetSuccessDraft' });
      } catch (error) {
        dispatch({
          type: 'productSaveDraftFail',
          payload: error.response.data.message,
        });
      }
    };

// requested product
export const requestedProduct =
  (
    rejected,
    approved,
    eventPrice,
    name,
    description,
    category,
    subCatgory,
    subSubCategory,
    tags,
    originalPrice,
    discountPrice,
    stock,
    shopId,
    images,
    specs,
    specs2,
    attributes,
    showInputs,
    colorInputs
  ) =>
    async (dispatch) => {
      try {
        dispatch({
          type: 'productCreateRequest',
        });

        const { data } = await axios.post(
          `${server}/product/requested-product`,
          rejected,
          approved,
          eventPrice,
          name,
          description,
          category,
          subCatgory,
          subSubCategory,
          tags,
          originalPrice,
          discountPrice,
          stock,
          shopId,
          images,
          specs,
          specs2,
          attributes,
          showInputs,
          colorInputs
        );
        dispatch({
          type: 'productCreateSuccess',
          payload: data.product,
        });
        message.success("Created Product Successfully")
        dispatch({ type: 'resetSuccessDraft' });
      } catch (error) {
        dispatch({
          type: 'productCreateFail',
          payload: error.response.data.message,
        });
      }
    };

// get All Products of a shop
export const getAllProductsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: 'getAllProductsShopRequest',
    });

    const { data } = await axios.get(
      `${server}/product/get-all-products-shop/${id}`
    );
    dispatch({
      type: 'getAllProductsShopSuccess',
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: 'getAllProductsShopFailed',
      payload: error.response.data.message,
    });
  }
};

export const getRequestedProductsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: 'getRequestedProductsShopRequest',
    });

    const { data } = await axios.get(
      `${server}/product/get-requested-products-shop/${id}`
    );
    dispatch({
      type: 'getRequestedProductsShopSuccess',
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: 'getRequestedProductsShopFailed',
      payload: error.response.data.message,
    });
  }
};

export const getPublishedProducts = () => async (dispatch) => {
  const { getApi } = useAPI();
  try {
    dispatch({
      type: 'getPublishedProductsShopRequest',
    });
    const { data, error } = await getApi({ endpoint: `/api/v2/product/get-published-products` });

    if (data) {
      console.log(data)
      dispatch({
        type: 'getPubllishedProductsShopSuccess',
        payload: data.products,
      });
    }
    if (error) {
      dispatch({
        type: 'getPublishedProductsShopFailed',
        payload: error.response.data.message,
      });
    }

  } catch (error) {
    dispatch({
      type: 'getPublishedProductsShopFailed',
      payload: error.response.data.message,
    });
  }
};

// get a Producta of a shop
export const getAProductsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: 'getAllProductsShopRequest',
    });

    const { data } = await axios.get(
      `${server}/product/get-a-product-shop/${id}`
    );
    dispatch({
      type: 'getAllProductsShopSuccess',
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: 'getAllProductsShopFailed',
      payload: error.response.data.message,
    });
  }
};


// get a Products for preview
export const getAProductsPreview = (id) => async (dispatch) => {
  try {
    dispatch({
      type: 'getAProductsPreviewRequest',
    });

    const { data } = await axios.get(
      `${server}/product/get-a-product-shop/${id}`
    );
    return data;
    // dispatch({
    //   type: 'getAProductsPreviewSuccess',
    //   payload: data.products,
    // });
  } catch (error) {
    dispatch({
      type: 'getAProductsPreviewFailed',
      payload: error.response.data.message,
    });
  }
};

// delete product of a shop
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: 'deleteProductRequest',
    });

    const { data } = await axios.delete(
      `${server}/product/delete-shop-product/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: 'deleteProductSuccess',
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: 'deleteProductFailed',
      payload: error.response.data.message,
    });
  }
};

// Approve product of a shop
export const approveProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: 'approveProductRequest',
    });

    const { data } = await axios.put(
      `${server}/product/approve-shop-product/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: 'approveProductSuccess',
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: 'approveProductFailed',
      payload: error.response.data.message,
    });
  }
};

// get all products
export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: 'getAllProductsRequest',
    });

    const { data } = await axios.get(`${server}/product/get-all-products`);
    dispatch({
      type: 'getAllProductsSuccess',
      payload: data.products,
    });

    // Listen for messages from the worker
    dispatch({
      type: 'getAllProductsSuccess',
      payload: data.products,
    });


  } catch (error) {
    // Handle errors from the worker

    dispatch({
      type: 'getAllProductsFailed',
      payload: error.response.data.message,
    });
  }
};

