import axios from "axios";
import { server } from "../../server";

// get all sellers --- admin
export const getAllSellers = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllSellersRequest",
    });

    const { data } = await axios.get(`${server}/shop/admin-all-sellers`, {
      withCredentials: true,
    });

    dispatch({
      type: "getAllSellersSuccess",
      payload: data.sellers,
    });
  } catch (error) {
    dispatch({
      type: "getAllSellerFailed",
      payload: error.response.data.message,
    });
  }
};

// Approve Seller of a shop
// export const approveSeller = (id) => async (dispatch) => {
//   try {
//     dispatch({
//       type: 'approveSellerRequest',
//     });

//     const { data } = await axios.put(`${server}/shop/approve-shop/${id}`, {
//       withCredentials: true,
//     });

//     dispatch({
//       type: 'approveSellerSuccess',
//       payload: data.message,
//     });
//   } catch (error) {
//     dispatch({
//       type: 'approveSellerFailed',
//       payload: error.response.data.message,
//     });
//   }
// };
