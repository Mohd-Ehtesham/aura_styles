import axios from "axios";

const BASE_API_URL = "https://aura-styles-backend-1.onrender.com/";

import type {
  FetchProductResponse,
  FetchProductResponsebyId,
} from "../interfaces/products/ProductInterface";

export async function fetchProducts(
  skip = 0,
  limit = 3
): Promise<FetchProductResponse> {
  try {
    const response = await axios.get(`${BASE_API_URL}allProducts`, {
      params: { skip, limit },
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error("Server Responded with error", error.response.data);
      } else if (error.request) {
        console.error("No Response Recieved", error.request.data);
      } else {
        console.error("Axios error message", error.message);
      }
    } else {
      console.error("Unexpected Error", error);
    }
    throw error;
  }
}

export async function fetchProductById(
  _id: string
): Promise<FetchProductResponsebyId> {
  try {
    const response = await axios.get(`${BASE_API_URL}getProduct/${_id}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error("Server Responded with error", error.response.data);
      } else if (error.request) {
        console.error("No Response Recieved", error.request.data);
      } else {
        console.error("Axios error message", error.message);
      }
    } else {
      console.error("Unexpected Error", error);
    }
    throw error;
  }
}

export async function searchProducts(
  skip = 0,
  limit = 3,
  query: string
): Promise<FetchProductResponse> {
  try {
    const response = await axios.get(
      `${BASE_API_URL}searchProducts?query=${query}`,
      {
        params: { skip, limit },
      }
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error("Server Responded with error", error.response.data);
      } else if (error.request) {
        console.error("No Response Recieved", error.request.data);
      } else {
        console.error("Axios error message", error.message);
      }
    } else {
      console.error("Unexpected Error", error);
    }
    throw error;
  }
}
