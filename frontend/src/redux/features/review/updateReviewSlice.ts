import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type {
  CreateReviewApiResponse,
  ReviewInterface,
} from "../../../interfaces/reviews/ReviewsInterface";

import { updateReview } from "../../../services/reviewService";

interface UpdateReviewState {
  loading: boolean;
  updatedReview: ReviewInterface | null;
  error: string | null;
}

const initialState: UpdateReviewState = {
  loading: false,
  updatedReview: null,
  error: null,
};

export const updateReviewThunk = createAsyncThunk<
  CreateReviewApiResponse,
  { data: ReviewInterface; reviewId: string },
  { rejectValue: string }
>("review/update", async ({ data, reviewId }, { rejectWithValue }) => {
  try {
    const response = await updateReview(data, reviewId);
    return response;
  } catch (error: unknown) {
    return rejectWithValue("failed to update the review");
  }
});

export const updateReviewSlice = createSlice({
  name: "updateReview",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateReviewThunk.pending, (state) => {
        state.loading = true;
        state.updatedReview = null;
        state.error = null;
      })
      .addCase(updateReviewThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.updatedReview = action.payload.data;
        state.error = null;
      })
      .addCase(updateReviewThunk.rejected, (state, action) => {
        state.loading = true;
        state.updatedReview = null;
        state.error = action.payload as string;
      });
  },
});

export default updateReviewSlice.reducer;
