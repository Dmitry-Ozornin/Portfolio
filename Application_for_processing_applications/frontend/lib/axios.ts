// lib/axios.ts
import axios from "axios";

export const api = axios.create({
  baseURL: "/api",
  timeout: 10000,
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});

// Обработка ошибок авторизации
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Не авторизован — редирект на логин
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default api;
