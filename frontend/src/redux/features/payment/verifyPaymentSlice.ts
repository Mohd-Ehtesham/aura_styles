import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type {
  PaymentVerificationData,
  PaymentVerificationResponse,
} from "../../../interfaces/PaymentInterface";
import { verifyPayment } from "../../../services/paymentService";

interface VerifyPaymentState {
  loading: boolean;
  paymentData: PaymentVerificationResponse | null;
  error: string | null;
}

const initialState: VerifyPaymentState = {
  loading: false,
  paymentData: null,
  error: null,
};

export const verifyPaymentAsyncThunk = createAsyncThunk<
  PaymentVerificationResponse,
  PaymentVerificationData,
  { rejectValue: string }
>("payment/verifyPayment", async (verificationData, { rejectWithValue }) => {
  try {
    const response = await verifyPayment(verificationData);
    return response;
  } catch (error: unknown) {
    return rejectWithValue("Failed to verify the payment");
  }
});

export const verifyPaymentSlice = createSlice({
  name: "payment/verify",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(verifyPaymentAsyncThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyPaymentAsyncThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentData = action.payload;
        state.error = null;
      })
      .addCase(verifyPaymentAsyncThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default verifyPaymentSlice.reducer;
