/**
 * API Configuration
 * Centraliza las URLs y endpoints de la API
 */

// Detectar ambiente: desarrollo o producción
const isDevelopment = import.meta.env.MODE === 'development';

// URL base de la API
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (isDevelopment ? 'http://localhost:3000' : 'https://backend-hotandcold.onrender.com');

console.log(`🌐 API_BASE_URL: ${API_BASE_URL}`);

/**
 * Endpoints de la API
 */
export const API_ENDPOINTS = {
  // Autenticación
  REGISTER: `${API_BASE_URL}/api/register`,
  LOGIN: `${API_BASE_URL}/api/login`,
  
  // Contacto y cotizaciones
  CONTACT: `${API_BASE_URL}/api/contact`,
  CONTACT_FOOTER: `${API_BASE_URL}/api/contact-footer`,
  
  // Health check
  HEALTH: `${API_BASE_URL}/health`
};

export default {
  API_BASE_URL,
  API_ENDPOINTS
};
