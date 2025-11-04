import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { loginUser } from "../../../services/userService";

import type {
  LoginUser,
  UserLoginResponse,
} from "../../../interfaces/users/LoginUserInterface";

interface LoginUserState {
  loading: boolean;
  token: string | null;
  error: string | null;
  user: UserLoginResponse | null;
}

const initialState: LoginUserState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  token: localStorage.getItem("token"),
  error: null,
  loading: false,
};

export const loginUserThunk = createAsyncThunk<UserLoginResponse, LoginUser>(
  "users/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await loginUser(credentials);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUseSlicer = createSlice({
  name: "user/login",
  initialState,
  reducers: {
    logoutUser(state) {
      state.user = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logoutUser } = loginUseSlicer.actions;
export default loginUseSlicer.reducer;
