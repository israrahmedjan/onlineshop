


"use client";
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slice';  // Import the reducer, not the slice
import ProductsSlice from './ProductsSlice';
import CartSlice from './CartSlice';
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    Product:ProductsSlice,
    cart:CartSlice  // Use the reducer here
  },
});
