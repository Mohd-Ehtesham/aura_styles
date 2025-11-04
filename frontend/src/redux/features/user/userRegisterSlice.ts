import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { registerUser } from "../../../services/userService";

import type { userRegisterApiResponse } from "../../../interfaces/users/RegisterUserInterface";

interface RegisterUserState {
  user: userRegisterApiResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: RegisterUserState = {
  user: null,
  loading: false,
  error: null,
};

export const createNewUser = createAsyncThunk(
  "users/register",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const data = await registerUser(formData);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(createNewUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
