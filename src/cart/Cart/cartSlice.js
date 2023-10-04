import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchItems,AddItems,DeleteItems,UpdateItems } from './cartAPI';

const initialState = {
  items:[],
  status: 'idle',
};

export const updateAsync = createAsyncThunk(
  'cart/UpdateItems',
  async ({ id, inputQuantity }) => {
    const response = await UpdateItems(id, { quantity: +inputQuantity }); // Update only the quantity
    return response.data;
  }
);
export const fetchAsync = createAsyncThunk(
  'cart/fetchItems',
  async () => {
    const response = await fetchItems();
    console.log(response.data);
    return response.data;
  }
);
export const AddAsync = createAsyncThunk(
  'cart/AddItems',
  async (item) => {
    const {id,title,brand,thumbnail,price}=item
    const response = await AddItems({id,title,brand,thumbnail,price,quantity:1});
    //console.log(response.data);
   return response.data;
  }
);
export const DeleteAsync = createAsyncThunk(
  'cart/DeleteItems',
  async (id) => {
    await DeleteItems(id);
 //   console.log(response.data);
    return id
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(fetchAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(AddAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })
      .addCase(DeleteAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index=state.items.findIndex(item=>item.id===action.payload)
        state.items.splice(index,1);
      })
      .addCase(updateAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index=state.items.findIndex(item=>item.id===action.payload.id)
        state.items.splice(index,1,action.payload);
      })
  },
});

//export const { increment, decrement, incrementByAmount } = Itemslice.actions;

export const selectCount = (state) => state.counter.value;


export default cartSlice.reducer;
