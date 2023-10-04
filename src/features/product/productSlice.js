import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from './productsAPI';

const initialState = {
  products:[],
  status: 'idle',
};

export const fetchAsync = createAsyncThunk(
  'products/fetchProduct',
  async () => {
    const response = await fetchProducts();
    console.log(response.data);
    return response.data;
  }
);

export const productSlice = createSlice({
  name: 'products',
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(fetchAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      });
  },
});

//export const { increment, decrement, incrementByAmount } = productSlice.actions;

export const selectCount = (state) => state.counter.value;


export default productSlice.reducer;
