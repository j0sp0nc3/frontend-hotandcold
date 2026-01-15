import api from './api';

/**
 * Servicio de autenticación
 */
export const authService = {
  /**
   * Login de usuario
   * @param {Object} credentials - { username, password }
   */
  login: async (credentials) => {
    try {
      const response = await api.post('/api/login', credentials);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al iniciar sesión');
    }
  },

  /**
   * Registro de usuario
   * @param {Object} userData - Datos del usuario
   */
  register: async (userData) => {
    try {
      const response = await api.post('/api/register', userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al registrar usuario');
    }
  },

  /**
   * Logout de usuario
   */
  logout: async () => {
    try {
      // No hay endpoint de logout en backend, solo limpiar localStorage
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Error en logout:', error);
    }
  },

  /**
   * Verificar token actual
   */
  verifyToken: async () => {
    try {
      // Por ahora no hay endpoint de verificación, simplemente verificar que existe el token
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user.token) {
        return { valid: true };
      }
      throw new Error('Token no encontrado');
    } catch (error) {
      throw new Error('Token inválido');
    }
  }
};
