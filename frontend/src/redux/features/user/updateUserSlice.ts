import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { UpdateUserResponse } from "../../../interfaces/users/UpdateUserInterface";

import { updateUser } from "../../../services/userService";

interface UpdateUserState {
  loading: boolean;
  updatedUser: UpdateUserResponse | null;
  error: string | null;
}

const initialState: UpdateUserState = {
  loading: false,
  updatedUser: null,
  error: null,
};

export const updateUserThunk = createAsyncThunk<
  UpdateUserResponse,
  { id: string; formData: FormData },
  { rejectValue: string }
>("user/update", async ({ id, formData }, { rejectWithValue }) => {
  try {
    const response = await updateUser(id, formData);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const updateUserSlice = createSlice({
  name: "user/updateUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.updatedUser = null;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.updatedUser = action.payload;
        state.error = null;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.updatedUser = null;
        state.error = action.payload as string;
      });
  },
});

export default updateUserSlice.reducer;
