import { clearCart } from "../../../services/cartService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ClearCartState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: ClearCartState = {
  loading: false,
  error: null,
  success: false,
};

export const clearCartThunk = createAsyncThunk(
  "cart/cear",
  async (_, { rejectWithValue }) => {
    try {
      const response = await clearCart();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const clearCartSlice = createSlice({
  name: "clearCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(clearCartThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(clearCartThunk.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(clearCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export default clearCartSlice.reducer;
