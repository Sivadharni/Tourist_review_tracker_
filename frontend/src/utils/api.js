import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
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

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getUser: () => api.get('/auth/user'),
};

export const attractionsAPI = {
  getAll: (params = {}) => api.get('/attractions', { params }),
  getById: (id) => api.get(`/attractions/${id}`),
  getReviews: (id, params = {}) => api.get(`/attractions/${id}/reviews`, { params }),
  addReview: (id, reviewData) => api.post(`/attractions/${id}/reviews`, reviewData),
  search: (query) => api.get('/attractions/search', { params: { q: query } }),
};

export const usersAPI = {
  getProfile: (id) => api.get(`/users/${id}`),
  getReviews: (id) => api.get(`/users/${id}/reviews`),
  getStats: (id) => api.get(`/users/${id}/stats`),
};

export default api;
