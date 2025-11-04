import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { AdminSettingApiResponse } from "../../../interfaces/AdminSettingInterface";

import { fetchAllAdminSettings } from "../../../services/adminSettingService";

interface AdminSettingState {
  settings: AdminSettingApiResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: AdminSettingState = {
  settings: null,
  loading: false,
  error: null,
};

export const fetchAdminSettings = createAsyncThunk(
  "adminSettings/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchAllAdminSettings();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const adminSettingSlice = createSlice({
  name: "adminSettings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.settings = action.payload;
      })
      .addCase(fetchAdminSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default adminSettingSlice.reducer;
