import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchWishlistProducts } from "../../../services/myWishlistPageService";

import type { FetchWishlistResponse } from "../../../interfaces/wishlist/GetWishlistProductsInterface";

interface MyWishlistProductPage {
  loading: boolean;
  wishlistProducts: FetchWishlistResponse | null;
  error: string | null;
}

const initialState: MyWishlistProductPage = {
  loading: false,
  wishlistProducts: null,
  error: null,
};

export const fetchWishlistProductsThunk =
  createAsyncThunk<FetchWishlistResponse>(
    "wishlistPage/get",
    async (_, { rejectWithValue }) => {
      try {
        const response = await fetchWishlistProducts();
        return response;
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );

const getWishlistProductsSlice = createSlice({
  name: "fetchWishlistProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlistProductsThunk.pending, (state) => {
        state.loading = true;
        state.wishlistProducts = null;
        state.error = null;
      })
      .addCase(fetchWishlistProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlistProducts = action.payload;
        state.error = null;
      })
      .addCase(fetchWishlistProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.wishlistProducts = null;
        state.error = action.payload as string;
      });
  },
});

export default getWishlistProductsSlice.reducer;
