import axios from 'axios';
console.log("Current API URL:", import.meta.env.VITE_API_URL);
// This line forces Vite to check Vercel first, then local
const getBaseURL = () => {
  const url = import.meta.env.VITE_API_URL;
  if (url) {
    return url.endsWith('/') ? `${url}api` : `${url}/api`;
  }
  return 'http://localhost:8080/api';
};

const api = axios.create({
  baseURL: getBaseURL(),
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;