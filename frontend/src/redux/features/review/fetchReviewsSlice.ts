import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchAllReviews } from "../../../services/reviewService";
import type { ReviewData } from "../../../interfaces/reviews/ReviewsInterface";

interface ReviewState {
  loading: boolean;
  count: number;
  reviews: ReviewData[];
  error: string | null;
}

const initialState: ReviewState = {
  loading: false,
  count: 0,
  reviews: [],
  error: null,
};

export const fetchReviewThunk = createAsyncThunk(
  "review/fetchAll",
  async (
    {
      skip = 0,
      limit = 3,
      productId,
    }: { skip?: number; limit?: number; productId?: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await fetchAllReviews(skip, limit, productId);
      return data;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviewThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviewThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (action.meta.arg.skip === 0) {
          state.reviews = action.payload.data;
          state.count = action.payload.count;
        } else {
          state.reviews = [...state.reviews, ...action.payload.data];
        }
      })
      .addCase(fetchReviewThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default reviewSlice.reducer;
