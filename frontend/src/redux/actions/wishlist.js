import toast from "react-hot-toast";

// add to wishlist
export const addToWishlist = (data) => async (dispatch, getState) => {
  dispatch({
    type: "addToWishlist",
    payload: data,
  });
  toast.success("Added Product to wishlist")

  localStorage.setItem("wishlistItems", JSON.stringify(getState().wishlist.wishlist));
  return data;
};

// remove from wishlist
export const removeFromWishlist = (data) => async (dispatch, getState) => {
  dispatch({
    type: "removeFromWishlist",
    payload: data._id,
  });
  localStorage.setItem("wishlistItems", JSON.stringify(getState().wishlist.wishlist));
  return data;
};

//remove all from wishlist
export const removeAllFromWishlist = () => async (dispatch, getState) => {
  dispatch({
    type: 'removeAllFromWishlist',
  });

  localStorage.setItem('wishlistItems', JSON.stringify(getState().wishlist.wishlist));
  return []
};
