import axios from "axios";
import type { AddToCartResponse } from "../interfaces/carts/AddToCartInterface";
import type { CartsInterfaceResponse } from "../interfaces/carts/CartsInterface";
import type { UpdateCartProductResponse } from "../interfaces/carts/updateCartProductInterface";
import type { RemoveProductFromCartResponse } from "../interfaces/carts/RemoveFromCartInterface";

const BASE_API_URL = "http://localhost:8080/";

export function addProductToCart(
  productId: string,
  size: string,
  quantity: number
): Promise<AddToCartResponse> {
  const token = localStorage.getItem("token");
  return axios
    .post(
      `${BASE_API_URL}addToCart/${productId}`,
      { size, quantity },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data || error.message);
      } else {
        console.error("Unexpected Error:", error);
      }
      throw error;
    });
}

export function productsInCarts(): Promise<CartsInterfaceResponse> {
  const token = localStorage.getItem("token");
  return axios
    .get(`${BASE_API_URL}allProductsFromCart`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data || error.message);
      } else {
        console.error("Unexpected Error:", error);
      }
      throw error;
    });
}

export function removeProductFromCart(
  productId: string
): Promise<RemoveProductFromCartResponse> {
  const token = localStorage.getItem("token");
  return axios
    .delete(`${BASE_API_URL}removeFromCart/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data || error.message);
      } else {
        console.error("Unexpected Error:", error);
      }
      throw error;
    });
}

export function updateCartProductQuantity(
  productId: string,
  quantity: number
): Promise<UpdateCartProductResponse> {
  const token = localStorage.getItem("token");
  return axios
    .put(
      `${BASE_API_URL}updateCartQuantity/${productId}`,
      { quantity },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data || error.message);
      } else {
        console.error("Unexpected Error:", error);
      }
      throw error;
    });
}

export function clearCart() {
  const token = localStorage.getItem("token");
  return axios.delete(`${BASE_API_URL}clearCart`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
