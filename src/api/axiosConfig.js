import axios from 'axios';

// Forcing the live Render URL
const api = axios.create({
  baseURL: "https://indianheritage-backend-final.onrender.com/api",
});

// Interceptor to add the token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;