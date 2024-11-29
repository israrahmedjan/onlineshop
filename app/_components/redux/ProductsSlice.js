// redux/ProductsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
//import { FetchProductsAPI, FetchFiltperProductsAPI } from './API/API';
import  {FetchProductsAPI}  from './API/API';


export const fetchProducts = createAsyncThunk('fetch/products', async () => {
  try {
    const data = await FetchProductsAPI();
    //console.log("Async data:",data)
    return data.data;
  } catch (error) {
    throw error;
  }
});

// export const fetchFilterProducts = createAsyncThunk('fetch/filterproducts', async (filter) => {
//   let queryString = Object.entries(filter)
//     .map(([key, values]) => values.map(value => `${key}=${encodeURIComponent(value)}`).join('&'))
//     .join('&');

//   try {
//     const data = await FetchFiltperProductsAPI(queryString);
//     return data;
//   } catch (error) {
//     throw error;
//   }
// });

const ProductSlice = createSlice({
  name: 'Product',
  initialState: {
    items: [],
    testitems:["israr"],
    status: '',
    FilterItems: '',
    error: null, // Ensure error state is defined
  },
  reducers: {
    FilterItemsAC: (state, action) => {
      state.FilterItems = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
       // console.log("Products")
        state.items = action.payload;
       // state.items = ["data2","data3"]
        //console.log("After Succeded:",state.items);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // .addCase(fetchFilterProducts.pending, (state) => {
      //   state.status = 'loading';
      // })
      // .addCase(fetchFilterProducts.fulfilled, (state, action) => {
      //   state.status = 'succeeded';
      //   //state.items = action.payload;
      // })
      // .addCase(fetchFilterProducts.rejected, (state, action) => {
      //   state.status = 'failed';
      //   state.error = action.error.message;
      // });
  },
});

export const { FilterItemsAC } = ProductSlice.actions;
export default ProductSlice.reducer;
