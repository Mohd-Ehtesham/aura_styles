import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { toggleWishlistProduct } from "../../../services/myWishlistPageService";

import type { MyWishlistPageResponse } from "../../../interfaces/wishlist/MyWishlistPageInterface";

interface CreateMyWishlistPage {
  myWishlistPage: MyWishlistPageResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: CreateMyWishlistPage = {
  myWishlistPage: null,
  loading: false,
  error: null,
};

export const createMyWishlistPageThunk = createAsyncThunk<
  MyWishlistPageResponse,
  string
>("wishlistPage/toggle", async (productId, { rejectWithValue }) => {
  try {
    const response = await toggleWishlistProduct(productId);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const createWishlistProductsSlice = createSlice({
  name: "createWishlistProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createMyWishlistPageThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMyWishlistPageThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.myWishlistPage = action.payload;
      })
      .addCase(createMyWishlistPageThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default createWishlistProductsSlice.reducer;
