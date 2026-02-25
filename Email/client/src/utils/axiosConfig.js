import axios from 'axios';

// Set base API URL depending on the environment
const API_URL = process.env.NODE_ENV === 'production' 
  ? '/api'  // In production, use relative path for APIs
  : 'http://localhost:8081/api'; // Use our server port

// Create axios instance with custom config
const instance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to set auth token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle common errors
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with an error status code
      if (error.response.status === 401) {
        // Unauthorized, clear token
        localStorage.removeItem('token');
        // Optionally redirect to login
        // window.location.href = '/login';
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network error, server not responding');
    }
    return Promise.reject(error);
  }
);

export default instance; 