import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchProductById } from "../../../services/productService";
import type { FetchProductResponsebyId } from "../../../interfaces/products/ProductInterface";

interface FetchProductByIdState {
  loading: boolean;
  product: FetchProductResponsebyId | null;
  error: string | null;
}

const initialState: FetchProductByIdState = {
  loading: false,
  product: null,
  error: null,
};

export const fetchProductByIdThunk = createAsyncThunk(
  "products/fetchById",
  async ({ _id }: { _id: string }, { rejectWithValue }) => {
    try {
      const data = await fetchProductById(_id);
      return data;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

const productSliceById = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductByIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default productSliceById.reducer;
