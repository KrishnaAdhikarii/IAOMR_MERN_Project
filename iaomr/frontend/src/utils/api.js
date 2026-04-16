import axios from "axios";

// const API_URL = 'http://localhost:5000' ;
const API_URL= import.meta.env.VITE_API_URL; 

// Example: https://your-backend.onrender.com

/* =========================
   AXIOS INSTANCE
========================= */
const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

/* =========================
   REQUEST INTERCEPTOR
   Attach JWT token automatically
========================= */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("iaomr_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/* =========================
   RESPONSE INTERCEPTOR
   Global error handling
========================= */
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response?.status;

    // Unauthorized → auto logout
    if (status === 401) {
      localStorage.removeItem("iaomr_token");

      // remove default header
      delete api.defaults.headers.common["Authorization"];

      // redirect to login page
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

/* =========================
   OPTIONAL HELPERS (clean usage)
========================= */

// GET helper
export const get = (url, config = {}) => api.get(url, config);

// POST helper
export const post = (url, data, config = {}) => api.post(url, data, config);

// PUT helper
export const put = (url, data, config = {}) => api.put(url, data, config);

// DELETE helper
export const del = (url, config = {}) => api.delete(url, config);

/* =========================
   EXPORT DEFAULT INSTANCE
========================= */
export default api;