import api from './api';
import { API_ENDPOINTS } from '../config/apiConfig';

/**
 * Servicio de contacto
 */
export const contactService = {
  /**
   * Enviar mensaje de contacto
   * @param {Object} formData - Datos del formulario
   */
  sendMessage: async (formData) => {
    try {
      const response = await api.post(API_ENDPOINTS.CONTACT, formData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al enviar mensaje');
    }
  }
};
