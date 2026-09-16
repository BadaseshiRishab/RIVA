import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from './cartReducer';
import currentProduct from './currentProduct';
import userReducer from './userReducer';
import wishlistReducer from './wishlistReducer';
import orderReducer from './orderReducer';

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    currentProduct: currentProduct,
    orders: orderReducer,
});

export default rootReducer;