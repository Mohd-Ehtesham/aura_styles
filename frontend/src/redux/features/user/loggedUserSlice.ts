import { createAsyncThunk } from "@reduxjs/toolkit";
import type { LoggedUserResponse } from "../../../interfaces/users/LoggedUserInterface";
import { getLoggedUser } from "../../../services/userService";
import { createSlice } from "@reduxjs/toolkit";

interface LoggedUserState {
  loading: boolean;
  user: LoggedUserResponse | null;
  error: string | null;
}

const initialState: LoggedUserState = {
  loading: false,
  user: null,
  error: null,
};

export const loggedUserThunk = createAsyncThunk<LoggedUserResponse>(
  "user/loggedUSer",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getLoggedUser();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const loggedUserSlice = createSlice({
  name: "user/loggedUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loggedUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.user = null;
      })
      .addCase(loggedUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loggedUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload as string;
      });
  },
});

export default loggedUserSlice.reducer;
