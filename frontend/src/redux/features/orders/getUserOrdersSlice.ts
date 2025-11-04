import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { userOrders } from "../../../services/orderService";

import type { UserOrdersApiResponse } from "../../../interfaces/Orders/UserOrdersInterface";

interface UserOrdersState {
  loading: boolean;
  userOrders: UserOrdersApiResponse | null;
  error: string | null;
}

const initialState: UserOrdersState = {
  loading: false,
  userOrders: null,
  error: null,
};

export const getUserOrdersThunk = createAsyncThunk<
  UserOrdersApiResponse,
  void,
  { rejectValue: string }
>("order/allUserOrder", async (_, { rejectWithValue }) => {
  try {
    const response = await userOrders();
    return response;
  } catch (error: unknown) {
    return rejectWithValue("Failed to fetch user orders");
  }
});

const getUserOrdersSlice = createSlice({
  name: "orders/getUserOrders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserOrdersThunk.pending, (state) => {
        state.loading = true;
        state.userOrders = null;
        state.error = null;
      })
      .addCase(getUserOrdersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.userOrders = action.payload;
        state.error = null;
      })
      .addCase(getUserOrdersThunk.rejected, (state, action) => {
        state.loading = false;
        state.userOrders = null;
        state.error = action.payload as string;
      });
  },
});

export default getUserOrdersSlice.reducer;
