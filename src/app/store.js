import { configureStore } from '@reduxjs/toolkit';
import ProductReducer from '../features/product/productSlice';
import CartReducer from '../cart/Cart/cartSlice';
export const store = configureStore({
  reducer: {
    product: ProductReducer, 
    cart:CartReducer,
  },
});
