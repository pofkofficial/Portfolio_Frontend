import axios from 'axios';

// Access the Vite environment variable
const BASE_URL = import.meta.env.VITE_BACKEND_LINK;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Crucial for your @login_required Flask routes
  headers: {
    'Content-Type': 'application/json',
  },
});

// You can also add interceptors here later for global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;