import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { deleteReview } from "../../../services/reviewService";

import type { ReviewInterface } from "../../../interfaces/reviews/ReviewsInterface";
import type { DeleteReviewApiResponse } from "../../../interfaces/reviews/DeleteReviewInterface";

interface DeleteReviewState {
  loading: boolean;
  deletedReview: ReviewInterface | null;
  error: string | null;
}

const initialState: DeleteReviewState = {
  loading: false,
  deletedReview: null,
  error: null,
};

export const deleteReviewThunk = createAsyncThunk<
  DeleteReviewApiResponse,
  string,
  { rejectValue: string }
>("review/delete", async (reviewId: string, { rejectWithValue }) => {
  try {
    const response = await deleteReview(reviewId);
    return response;
  } catch (error: unknown) {
    return rejectWithValue("Failed to delete review");
  }
});

export const deleteReviewSlice = createSlice({
  name: "deleteReview",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteReviewThunk.pending, (state) => {
        state.loading = true;
        state.deletedReview = null;
        state.error = null;
      })
      .addCase(deleteReviewThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.deletedReview = action.payload.data;
        state.error = null;
      })
      .addCase(deleteReviewThunk.rejected, (state, action) => {
        state.loading = false;
        state.deletedReview = null;
        state.error = action.payload as string;
      });
  },
});

export default deleteReviewSlice.reducer;
