import axios from "axios";

import type { AdminSettingApiResponse } from "../interfaces/AdminSettingInterface";

const BASE_API_URL = "https://aura-styles-backend-1.onrender.com/";

async function fetchAllAdminSettings(): Promise<AdminSettingApiResponse> {
  try {
    const response = await axios.get(`${BASE_API_URL}allAdminSettings`);
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

export { fetchAllAdminSettings };
