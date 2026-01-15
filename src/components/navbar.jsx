import React, { useState, useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUserCircle } from 'react-icons/fa';

import './navbar.css';

const Navbar = React.memo(() => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    logout();
    setMenuOpen(false);
    navigate('/login');
  }, [logout, navigate]);

  const toggleMenu = useCallback(() => {
    setMenuOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  // Memoizar los links del menú
  const menuLinks = useMemo(() => (
    !user ? (
      <>
        <li><Link to="/tienda" onClick={closeMenu}>Tienda</Link></li>
        <li><Link to="/climatizacion" onClick={closeMenu}>Climatización</Link></li>
        <li><Link to="/calefaccion" onClick={closeMenu}>Calefacción y Centralizada</Link></li>
        <li><Link to="/ventilacion" onClick={closeMenu}>Ventilación</Link></li>
      </>
    ) : (
      <li><button onClick={handleLogout} className="navbar-logout-button">Logout</button></li>
    )
  ), [user, closeMenu, handleLogout]);

  return (
    <nav className="navbar">
      {/* Si NO hay usuario, mostrar logo y nombre */}
      {!user ? (
        <Link to="/" className="navbar-brand-link" onClick={closeMenu}>
          <div className="navbar-brand">
            <img src="/assets/logo.avif" alt="Logo" className="navbar-logo" />
            <div className="brand-text">
              <span>Hot and Cold</span>
              <p className="brand-subtext">Services</p>
            </div>
          </div>
        </Link>
      ) : (
        // Si hay usuario, mostrar saludo y icono
        <div className="navbar-user-info" onClick={closeMenu} style={{ cursor: 'pointer' }}>
          <FaUserCircle size={30} style={{ marginRight: '8px' }} />
          <span>Hola, {user.username}</span>
        </div>
      )}

      {/* Botón hamburguesa */}
      <button className="navbar-toggle" onClick={toggleMenu}>
        &#9776;
      </button>

      {/* Links del menú */}
      <ul className={`navbar-links ${menuOpen ? 'show' : ''}`}>
        {menuLinks}
      </ul>
    </nav>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;
