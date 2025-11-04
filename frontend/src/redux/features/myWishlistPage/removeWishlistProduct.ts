import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { removeWishlistProduct } from "../../../services/myWishlistPageService";

import type { RemoveWishlistProductResponse } from "../../../interfaces/wishlist/RemoveWishlistProductInterface";

interface RemoveProductFromWishlist {
  loading: boolean;
  removeProductResponse: RemoveWishlistProductResponse | null;
  error: string | null;
}

const initialState: RemoveProductFromWishlist = {
  loading: false,
  removeProductResponse: null,
  error: null,
};

export const removeProductFromWishlistThunk = createAsyncThunk<
  RemoveWishlistProductResponse,
  string
>("wishlistPage/toggle", async (productId, { rejectWithValue }) => {
  try {
    const response = await removeWishlistProduct(productId);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const removeWishlistProductSlice = createSlice({
  name: "removeWishlistProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(removeProductFromWishlistThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeProductFromWishlistThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.removeProductResponse = action.payload;
        state.error = null;
      })
      .addCase(removeProductFromWishlistThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default removeWishlistProductSlice.reducer;
