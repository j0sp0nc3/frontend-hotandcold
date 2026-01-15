import api from './api';

/**
 * Servicio de autenticación
 */
export const authService = {
  /**
   * Login de usuario
   * @param {Object} credentials - { email, password }
   */
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
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
      const response = await api.post('/auth/register', userData);
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
      await api.post('/auth/logout');
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
      const response = await api.get('/auth/verify');
      return response.data;
    } catch (error) {
      throw new Error('Token inválido');
    }
  }
};
