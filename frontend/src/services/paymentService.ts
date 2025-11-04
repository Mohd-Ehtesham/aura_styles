import axios from "axios";

import type {
  Payment,
  MakePaymentApiResponse,
  PaymentVerificationData,
  PaymentVerificationResponse,
} from "../interfaces/PaymentInterface";

const BASE_API_URL = "http://localhost:8080/";

async function makePayment(
  orderId: string,
  paymentData: Payment
): Promise<MakePaymentApiResponse> {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("User is not authenticated");
    const response = await axios.post(
      `${BASE_API_URL}registerPayment/${orderId}`,
      { provider: paymentData.provider, amount: paymentData.amount },
      { headers: { Authorization: `Bearer ${token}` } }
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

async function verifyPayment(
  verficationData: PaymentVerificationData
): Promise<PaymentVerificationResponse> {
  try {
    const response = await axios.post(`${BASE_API_URL}verify`, verficationData);
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

export { makePayment, verifyPayment };
