// frontend/lib/axios.ts
import axios from "axios";

export const api = axios.create({
  baseURL: "/api",

  timeout: 30000,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Axios error:", error.message);
    if (error.response?.status === 401) {
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

export default api;
