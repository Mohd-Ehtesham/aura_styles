import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { updateCartProductQuantity } from "../../../services/cartService";

import type { UpdateCartProductResponse } from "../../../interfaces/carts/updateCartProductInterface";

interface UpdateProductQuantityState {
  updatedProduct: UpdateCartProductResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: UpdateProductQuantityState = {
  updatedProduct: null,
  loading: false,
  error: null,
};

export const updateCartProductQuantityThunk = createAsyncThunk<
  UpdateCartProductResponse,
  { productId: string; quantity: number },
  { rejectValue: string }
>(
  "cart/updateQuantity",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await updateCartProductQuantity(productId, quantity);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const updateCartProduct = createSlice({
  name: "updateCartProductQuantity",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateCartProductQuantityThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartProductQuantityThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.updatedProduct = action.payload;
      })
      .addCase(updateCartProductQuantityThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default updateCartProduct.reducer;
