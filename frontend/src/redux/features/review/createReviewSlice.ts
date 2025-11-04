import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type {
  CreateReviewApiResponse,
  ReviewInterface,
} from "../../../interfaces/reviews/ReviewsInterface";
import { createReview } from "../../../services/reviewService";

interface CreateReviewState {
  loading: boolean;
  review: ReviewInterface | null;
  error: string | null;
}

const initialState: CreateReviewState = {
  loading: false,
  review: null,
  error: null,
};

export const createReviewThunk = createAsyncThunk<
  CreateReviewApiResponse,
  ReviewInterface,
  { rejectValue: string }
>("review/create", async (data, { rejectWithValue }) => {
  try {
    const response = await createReview(data);
    return response;
  } catch (error: unknown) {
    return rejectWithValue("Failed to create review");
  }
});

export const createReviewSlice = createSlice({
  name: "createReview",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createReviewThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.review = null;
      })
      .addCase(createReviewThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.review = action.payload.data;
        state.error = null;
      })
      .addCase(createReviewThunk.rejected, (state, action) => {
        state.loading = false;
        state.review = null;
        state.error = action.payload || "Failed to create review";
      });
  },
});

export default createReviewSlice.reducer;
