import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Login con servicio de autenticación
   */
  const login = useCallback(async (credentials) => {
    try {
      setError(null);
      const userData = await authService.login(credentials);
      
      // Guardar usuario y token
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      
      return { success: true, data: userData };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  }, []);

  /**
   * Logout con limpieza completa
   */
  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error('Error en logout:', err);
    } finally {
      setUser(null);
      localStorage.removeItem('user');
      setError(null);
    }
  }, []);

  /**
   * Verificar token al cargar la aplicación
   */
  const verifyAuth = useCallback(async () => {
    try {
      const storedUser = localStorage.getItem('user');
      
      if (!storedUser) {
        setLoading(false);
        return;
      }

      const userData = JSON.parse(storedUser);
      
      // Verificar si el token es válido
      if (userData.token) {
        try {
          await authService.verifyToken();
          setUser(userData);
        } catch (err) {
          // Token inválido, limpiar
          localStorage.removeItem('user');
          setUser(null);
        }
      } else {
        setUser(userData);
      }
    } catch (err) {
      console.error('Error verificando autenticación:', err);
      localStorage.removeItem('user');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Actualizar datos del usuario
   */
  const updateUser = useCallback((newUserData) => {
    setUser(prev => {
      const updated = { ...prev, ...newUserData };
      localStorage.setItem('user', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Verificar autenticación al montar
  useEffect(() => {
    verifyAuth();
  }, [verifyAuth]);

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook personalizado para usar contexto fácilmente
 */
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};
