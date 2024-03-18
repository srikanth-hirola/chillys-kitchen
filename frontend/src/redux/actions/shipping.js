import axios from 'axios';
import { server } from '../../server';

export const getAllShipmentOrders = (shopId) => async (dispatch) => {
  try {
    dispatch({
      type: 'getAllShippingOrdersShopRequest',
    });

    const { data } = await axios.get(
      `${server}/shipping/seller-shipment-orders/${shopId}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: 'getAllShippingOrdersShopSuccess',
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: 'getAllShippingOrdersShopFailed',
      payload: error.response.data.message,
    });
  }
};

export const getAllReturnShipmentOrders = (shopId) => async (dispatch) => {
  try {
    dispatch({
      type: 'getAllReturnShippingOrdersShopRequest',
    });

    const { data } = await axios.get(
      `${server}/shipping/seller-return-shipment-orders/${shopId}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: 'getAllReturnShippingOrdersShopSuccess',
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: 'getAllReturnShippingOrdersShopFailed',
      payload: error.response.data.message,
    });
  }
};
