import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { productsInCarts } from "../../../services/cartService";

import type { CartsInterfaceResponse } from "../../../interfaces/carts/CartsInterface";

interface CartProducts {
  carts: CartsInterfaceResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: CartProducts = {
  carts: null,
  loading: false,
  error: null,
};

export const cartPageThunk = createAsyncThunk<CartsInterfaceResponse>(
  "cart/products",
  async (_, { rejectWithValue }) => {
    try {
      const response = await productsInCarts();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const cartProducts = createSlice({
  name: "cart/carts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(cartPageThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cartPageThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.carts = action.payload;
      })
      .addCase(cartPageThunk.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload as string;
      });
  },
});

export default cartProducts.reducer;
