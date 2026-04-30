import axios from "axios";

export const api = axios.create({
  baseURL: "/api",
  timeout: 30000,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// Флаг для предотвращения множественных редиректов
let isRedirecting = false;

api.interceptors.request.use(
  (config) => {
    // Добавляем флаг, чтобы не обрабатывать запрос на корневой маршрут
    if (config.url === "/" && config.method === "get") {
      config.headers["X-Skip-Auth"] = "true";
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;

    console.error("Axios error:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url,
    });

    // Проверяем, не идет ли запрос на страницу логина
    const isLoginPage = window.location.pathname === "/" || window.location.pathname === "/login";

    // Если 401 и это не запрос на логин и мы еще не редиректим
    if (error.response?.status === 401 && !originalRequest._isRetry && !isLoginPage && !isRedirecting) {
      isRedirecting = true;

      // Очищаем куки и localStorage если есть
      document.cookie.split(";").forEach((cookie) => {
        document.cookie = cookie.replace(/^ +/, "").replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
      });
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Используем replace вместо href, чтобы не сохранять в истории
      window.location.replace("/");

      // Сбрасываем флаг через небольшую задержку
      setTimeout(() => {
        isRedirecting = false;
      }, 1000);
    }

    return Promise.reject(error);
  },
);

export default api;
