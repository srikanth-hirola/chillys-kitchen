// add to cart
export const addTocart = (data) => async (dispatch, getState) => {
  const cartData = getState().cart.cart;
  const currentData = data;

  const filteredData = await cartData.filter(
    (i) =>
      i._id === currentData._id &&
      i.selectedColor._id === currentData.selectedColor._id
  );

  let exactData = null;


  // if (currentData.selectedColor.haveAttributes) {
  exactData = filteredData.find(
    (value) => value.attrId === currentData.attrId
  );

  if (!exactData) {
    dispatch({
      type: 'addToCart',
      payload: data,
    });
  } else {
    dispatch({
      type: 'updateCartItem',
      payload: data,
    });
  }

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cart));
  return data;
};

//buy now
export const buyNow = (data) => async (dispatch, getState) => {
  dispatch({
    type: 'buyNow',
    payload: data,
  });

  localStorage.setItem('buyNow', JSON.stringify(getState().cart.buyNow));
  return data;
};

// update cart
export const updateCart = (data) => async (dispatch, getState) => {
  dispatch({
    type: 'updateCart',
    payload: data,
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cart));
  return data;
};

// remove from cart
export const removeFromCart = (data) => async (dispatch, getState) => {
  dispatch({
    type: 'removeFromCart',
    payload: data.attrId,
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cart));
  return data;
};

export const removeAllFromCart = () => async (dispatch, getState) => {
  dispatch({
    type: 'removeAllFromCart',
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cart));
  return []
};