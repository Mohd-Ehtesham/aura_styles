import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchOrder } from "../../../services/orderService";

import type { FetchOrderApiResponse } from "../../../interfaces/Orders/fetchOrderInterface";

interface GetOrderState {
  loading: boolean;
  order: FetchOrderApiResponse | null;
  error: string | null;
}

const initialState: GetOrderState = {
  loading: false,
  order: null,
  error: null,
};

export const getOrderThunk = createAsyncThunk<
  FetchOrderApiResponse,
  { orderId: string },
  { rejectValue: string }
>("orders/getSpecificOrder", async ({ orderId }, { rejectWithValue }) => {
  try {
    const response = await fetchOrder(orderId);
    return response;
  } catch (error: unknown) {
    return rejectWithValue("Failed to fetch order");
  }
});

const orderSlice = createSlice({
  name: "orders/getSpecificOrder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrderThunk.pending, (state) => {
        state.loading = true;
        state.order = null;
        state.error = null;
      })
      .addCase(getOrderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
        state.error = null;
      })
      .addCase(getOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.order = null;
        state.error = action.payload as string;
      });
  },
});

export default orderSlice.reducer;
