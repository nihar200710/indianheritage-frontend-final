import axios from 'axios';

const api = axios.create({
  // Vite looks for the VITE_API_URL variable. If it fails, it defaults to localhost.
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api', 
});

// The "Interceptor": This automatically adds your JWT to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response Interceptor: If the session expires, kick user to login
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