import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type {
  MakePaymentApiResponse,
  Payment,
} from "../../../interfaces/PaymentInterface";

import { makePayment } from "../../../services/paymentService";

interface MakePaymentState {
  loading: boolean;
  paymentData: MakePaymentApiResponse | null;
  error: string | null;
}

const initialState: MakePaymentState = {
  loading: false,
  paymentData: null,
  error: null,
};

export const makePaymentThunk = createAsyncThunk<
  MakePaymentApiResponse,
  { orderId: string; data: Payment },
  { rejectValue: string }
>("payment/makePayment", async ({ orderId, data }, { rejectWithValue }) => {
  try {
    const response = await makePayment(orderId, data);
    return response;
  } catch (error: unknown) {
    return rejectWithValue("Failed to initiate the payment");
  }
});

export const makePaymentSlice = createSlice({
  name: "payment/create",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(makePaymentThunk.pending, (state) => {
        state.loading = true;
        state.paymentData = null;
        state.error = null;
      })
      .addCase(makePaymentThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentData = action.payload;
        state.error = null;
      })
      .addCase(makePaymentThunk.rejected, (state, action) => {
        state.loading = false;
        state.paymentData = null;
        state.error = action.payload as string;
      });
  },
});

export default makePaymentSlice.reducer;
