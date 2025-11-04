import axios from "axios";

import type { MyWishlistPageResponse } from "../interfaces/wishlist/MyWishlistPageInterface";
import type { FetchWishlistResponse } from "../interfaces/wishlist/GetWishlistProductsInterface";
import type { RemoveWishlistProductResponse } from "../interfaces/wishlist/RemoveWishlistProductInterface";

const BASE_API_URL = "http://localhost:8080/";

async function toggleWishlistProduct(
  productId: string
): Promise<MyWishlistPageResponse> {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${BASE_API_URL}toggleWishlist/${productId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
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

async function fetchWishlistProducts(): Promise<FetchWishlistResponse> {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_API_URL}getUserSpecificWishlist`, {
      headers: { Authorization: `Bearer ${token}` },
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

async function removeWishlistProduct(
  productId: string
): Promise<RemoveWishlistProductResponse> {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(
      `${BASE_API_URL}removeProductFromWishlist/${productId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
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

export { toggleWishlistProduct, fetchWishlistProducts, removeWishlistProduct };
