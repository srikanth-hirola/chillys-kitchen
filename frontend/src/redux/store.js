import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducers/user';
// import { sellerReducer } from './reducers/seller';
import { productReducer } from './reducers/product';
// import { eventReducer } from './reducers/event';
import { cartReducer } from './reducers/cart';
import { wishlistReducer } from './reducers/wishlist';
// import { orderReducer } from './reducers/order';
import { categoryReducer } from './reducers/category';
// import { shippingReducer } from './reducers/shipping';
// import { siteConfigReducer } from './reducers/siteConfig';
// import { templateDataReducer } from './reducers/template';
// import { messageReducer } from './reducers/socket';

const Store = configureStore({
  reducer: {
    user: userReducer,
    // seller: sellerReducer,
    products: productReducer,
    // events: eventReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    // order: orderReducer,
    // specification: languageReducerr,
    // shipping: shippingReducer,
    // siteConfig: siteConfigReducer,
    category: categoryReducer,
    // templateData: templateDataReducer,
    // messages: messageReducer,
  },
});


export default Store;
