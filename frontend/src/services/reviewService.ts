import axios from "axios";

import type {
  ReviewInterface,
  ReviewApiResponse,
  CreateReviewApiResponse,
} from "../interfaces/reviews/ReviewsInterface";
import type { DeleteReviewApiResponse } from "../interfaces/reviews/DeleteReviewInterface";

const BASE_API_URL = "http://localhost:8080/";

async function fetchAllReviews(
  skip = 0,
  limit = 3,
  productId?: string
): Promise<ReviewApiResponse> {
  try {
    const response = await axios.get(`${BASE_API_URL}allReviews`, {
      params: { skip, limit, productId },
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error("Server responded with error:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Axios error message:", error.message);
      }
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
}

async function createReview(
  data: ReviewInterface
): Promise<CreateReviewApiResponse> {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${BASE_API_URL}registerReview`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error("Server responded with error:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Axios error message:", error.message);
      }
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
}

async function updateReview(
  data: ReviewInterface,
  reviewId: string
): Promise<CreateReviewApiResponse> {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${BASE_API_URL}updateReview/${reviewId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error("Server responded with error:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Axios error message:", error.message);
      }
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
}

async function deleteReview(
  reviewId: string
): Promise<DeleteReviewApiResponse> {
  try {
    const response = await axios.delete(
      `${BASE_API_URL}deleteReview/${reviewId}`
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error("Server responded with error:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Axios error message:", error.message);
      }
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
}

export { fetchAllReviews, createReview, updateReview, deleteReview };
