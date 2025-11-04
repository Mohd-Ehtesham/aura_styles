import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { addProductToCart } from "../../../services/cartService";

import type { AddToCartResponse } from "../../../interfaces/carts/AddToCartInterface";

interface AddToCart {
  addToCart: AddToCartResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: AddToCart = {
  addToCart: null,
  loading: false,
  error: null,
};

export const addToCartPageThunk = createAsyncThunk<
  AddToCartResponse,
  { productId: string; size: string; quantity: number }
>(
  "cart/addProduct",
  async ({ productId, size, quantity }, { rejectWithValue }) => {
    try {
      const response = await addProductToCart(productId, size, quantity);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const addToCartProduct = createSlice({
  name: "addToCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCartPageThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCartPageThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.addToCart = action.payload;
      })
      .addCase(addToCartPageThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default addToCartProduct.reducer;
