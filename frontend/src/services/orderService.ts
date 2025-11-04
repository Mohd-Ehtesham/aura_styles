import axios from "axios";
import type {
  CreateOrderApiResponse,
  Order,
} from "../interfaces/Orders/CreateOrderInterface";
import type { FetchOrderApiResponse } from "../interfaces/Orders/fetchOrderInterface";
import type { UserOrdersApiResponse } from "../interfaces/Orders/UserOrdersInterface";

const BASE_API_URL = "http://localhost:8080/";

async function createOrder(data: Order): Promise<CreateOrderApiResponse> {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${BASE_API_URL}registerOrder`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
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

async function fetchOrder(orderId: string): Promise<FetchOrderApiResponse> {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found in localStorage");
    }
    const response = await axios.get(`${BASE_API_URL}order/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
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

async function userOrders(): Promise<UserOrdersApiResponse> {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_API_URL}getUserOrders`, {
      headers: {
        Authorization: `Bearer ${token}`,
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

export { createOrder, fetchOrder, userOrders };
