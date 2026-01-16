import api from './api';
import { API_ENDPOINTS } from '../config/apiConfig';

/**
 * Servicio de productos
 */
export const productService = {
  /**
   * Obtener todos los productos
   * @param {Object} params - Parámetros de consulta (categoria, limit, etc.)
   */
  getAll: async (params = {}) => {
    try {
      const response = await api.get(API_ENDPOINTS.PRODUCTS, { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener productos');
    }
  },

  /**
   * Obtener un producto por ID
   * @param {string} id - ID del producto
   */
  getById: async (id) => {
    try {
      const response = await api.get(`${API_ENDPOINTS.PRODUCTS}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener producto');
    }
  },

  /**
   * Crear un nuevo producto
   * @param {Object} productData - Datos del producto
   */
  create: async (productData) => {
    try {
      const response = await api.post(API_ENDPOINTS.PRODUCTS, productData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al crear producto');
    }
  },

  /**
   * Actualizar un producto
   * @param {string} id - ID del producto
   * @param {Object} productData - Datos actualizados
   */
  update: async (id, productData) => {
    try {
      const response = await api.put(`${API_ENDPOINTS.PRODUCTS}/${id}`, productData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al actualizar producto');
    }
  },

  /**
   * Eliminar un producto
   * @param {string} id - ID del producto
   */
  delete: async (id) => {
    try {
      const response = await api.delete(`${API_ENDPOINTS.PRODUCTS}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al eliminar producto');
    }
  },

  /**
   * Subir imagen de producto
   * @param {File} file - Archivo de imagen
   */
  uploadImage: async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await api.post(`${API_ENDPOINTS.PRODUCTS}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al subir imagen');
    }
  }
};
