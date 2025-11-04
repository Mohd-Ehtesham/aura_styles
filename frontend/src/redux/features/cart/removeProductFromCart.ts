import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { removeProductFromCart } from "../../../services/cartService";

import type { RemoveProductFromCartResponse } from "../../../interfaces/carts/RemoveFromCartInterface";

interface RemoveFromCart {
  removeFromCart: RemoveProductFromCartResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: RemoveFromCart = {
  removeFromCart: null,
  loading: false,
  error: null,
};

export const removeFromCartPageThunk = createAsyncThunk<
  RemoveProductFromCartResponse,
  string
>("cart/removeProduct", async (productId, { rejectWithValue }) => {
  try {
    const response = await removeProductFromCart(productId);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const removeFromCart = createSlice({
  name: "removeFromCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(removeFromCartPageThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCartPageThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.removeFromCart = action.payload;
      })
      .addCase(removeFromCartPageThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default removeFromCart.reducer;
