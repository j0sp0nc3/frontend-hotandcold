import axios from 'axios';
import { API_ENDPOINTS } from '../config/apiConfig';

// API Key para autenticar la aplicación frontend - debe estar en .env
const API_KEY = import.meta.env.VITE_API_KEY;

/**
 * Instancia de Axios con configuración base
 */
const api = axios.create({
  baseURL: API_ENDPOINTS.BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': API_KEY
  }
});

/**
 * Interceptor para requests - agregar token y API key automáticamente
 */
api.interceptors.request.use(
  (config) => {
    // Agregar API Key si no está presente
    if (!config.headers['X-API-Key']) {
      config.headers['X-API-Key'] = API_KEY;
    }
    
    // Agregar token de usuario si está logueado
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Interceptor para responses - manejar errores globalmente
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado - logout automático
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
