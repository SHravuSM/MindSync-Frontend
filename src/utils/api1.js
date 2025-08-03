// // src/utils/axiosInstance.js
// import axios from "axios";
// import useAuthStore from "../store/authStore";

// const api = axios.create({
//   baseURL: `${import.meta.env.VITE_API_URL}`,
// });

// // 🔐 Attach token to every request
// api.interceptors.request.use(
//   (config) => {
//     const token = useAuthStore.getState().token;
//       if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default api;

import axios from "axios";
import { authStore } from "../store/authStore";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});

api.interceptors.request.use(
  (config) => {
    const token = authStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
