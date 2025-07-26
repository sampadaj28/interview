// src/utils/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://reactinterviewtask.codetentaclestechnologies.in/api/api",
});

// Automatically attach token if it exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
