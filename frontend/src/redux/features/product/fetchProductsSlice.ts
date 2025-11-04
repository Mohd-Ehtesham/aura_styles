import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { FetchProductResponse } from "../../../interfaces/products/ProductInterface";

import {
  fetchProducts,
  searchProducts,
} from "../../../services/productService";

interface FetchProductState {
  loading: boolean;
  products: FetchProductResponse | null;
  error: string | null;
}

const initialState: FetchProductState = {
  loading: false,
  products: null,
  error: null,
};

export const fetchProductsThunk = createAsyncThunk(
  "products/fetchAll",
  async (
    {
      skip = 0,
      limit = 3,
      query,
    }: { skip?: number; limit?: number; query?: string },
    { rejectWithValue }
  ) => {
    try {
      let data;
      if (!query) {
        data = await fetchProducts(skip, limit);
      } else {
        data = await searchProducts(skip, limit, query);
      }
      return data;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (
          action.meta.arg.query === "" &&
          state.products &&
          action.meta.arg.skip !== 0
        ) {
          state.products = {
            ...state.products,
            data: [...state.products.data, ...action.payload.data],
          };
        } else {
          state.products = action.payload;
        }
      })
      .addCase(fetchProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default productSlice.reducer;
