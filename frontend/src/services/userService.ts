import axios from "axios";

import type { LoggedUserResponse } from "../interfaces/users/LoggedUserInterface";
import type { userRegisterApiResponse } from "../interfaces/users/RegisterUserInterface";
import type {
  LoginUser,
  UserLoginResponse,
} from "../interfaces/users/LoginUserInterface";

const BASE_API_URL = "https://aura-styles-backend-1.onrender.com/";

async function registerUser(
  formData: FormData
): Promise<userRegisterApiResponse> {
  try {
    const response = await axios.post(`${BASE_API_URL}registerUser`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
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

async function loginUser(credentials: LoginUser): Promise<UserLoginResponse> {
  try {
    const response = await axios.post(`${BASE_API_URL}loginUser`, credentials, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error("Server responded with error", error.response.data);
      } else if (error.request) {
        console.error("No Response Recieved", error.request.data);
      } else {
        console.error("Unexpected Error", error);
      }
    } else {
      console.error("Unexpected Error", error);
    }
    throw error;
  }
}

async function getLoggedUser(): Promise<LoggedUserResponse> {
  try {
    const response = await axios.get(`${BASE_API_URL}getLoggedUser`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error("Server responded with error", error.response.data);
      } else if (error.request) {
        console.error("No Response Recieved", error.request.data);
      } else {
        console.error("Unexpected Error", error);
      }
    } else {
      console.error("Unexpected Error", error);
    }
    throw error;
  }
}

export { registerUser, loginUser, getLoggedUser };
