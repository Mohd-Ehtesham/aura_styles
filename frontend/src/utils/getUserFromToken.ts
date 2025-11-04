import { jwtDecode } from "jwt-decode";

interface DecodeToken {
  id: string;
  role: string;
}

export function getUserFromToken(): DecodeToken | null {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const decoded: DecodeToken = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
}
