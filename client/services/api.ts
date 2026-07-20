import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      console.log("========== API REQUEST ==========");
      console.log("URL:", config.url);
      console.log("TOKEN:", token);

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      console.log("HEADERS:", config.headers);
      console.log("================================");
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("========== API ERROR ==========");
    console.log("Status:", error.response?.status);
    console.log("Data:", error.response?.data);
    console.log("===============================");

    return Promise.reject(error);
  }
);

export default api;