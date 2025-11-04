import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type {
  CreateOrderApiResponse,
  Order,
} from "../../../interfaces/Orders/CreateOrderInterface";
import { createOrder } from "../../../services/orderService";

interface CreateOrderState {
  loading: boolean;
  order: CreateOrderApiResponse | null;
  error: string | null;
}

const initialState: CreateOrderState = {
  loading: false,
  order: null,
  error: null,
};

export const createOrderThunk = createAsyncThunk<
  CreateOrderApiResponse,
  Order,
  { rejectValue: string }
>("orders/create", async (data, { rejectWithValue }) => {
  try {
    const response = await createOrder(data);
    return response;
  } catch (error: unknown) {
    return rejectWithValue("Failed to create review");
  }
});

const createOrderSlice = createSlice({
  name: "orders/create",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrderThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.order = null;
      })
      .addCase(createOrderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.order = action.payload;
      })
      .addCase(createOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to create order";
        state.order = null;
      });
  },
});

export default createOrderSlice.reducer;
