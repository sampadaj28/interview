// src/api/auth.js
import API from "../utils/api";

export const login = async ({ email, password }) => {
  try {
    const response = await API.post("/login", { email, password });
    return response.data; // contains token and user info
  } catch (error) {
    throw error.response?.data?.message || "Login failed";
  }
};
