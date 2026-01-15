import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import '../components/login.css';
import { useAuth } from '../context/AuthContext';
import { API_ENDPOINTS } from '../config/apiConfig';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const { login } = useAuth(); // ✅ Obtener función login desde contexto

  // Limpiar formulario al cargar la página
  useEffect(() => {
    setUsername('');
    setPassword('');
    setError('');
    setSuccess('');
  }, []);

  useEffect(() => {
    document.body.classList.add('login-page');
    return () => {
      document.body.classList.remove('login-page');
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Usar la función login del contexto que maneja todo
      const result = await login({ username, password });

      if (result.success) {
        setSuccess(`Bienvenido, ${result.data.username}`);
        setUsername('');
        setPassword('');

        // Redirigir tras login exitoso
        setTimeout(() => {
          navigate('/image');
        }, 500);
      } else {
        setError(result.error || 'Error en login');
      }
    } catch (err) {
      setError(err.message || 'Error en login');
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-page">
        <div className="login-content">
          <h1>Bienvenido</h1>
          <p>Accede a tu cuenta para continuar</p>

          <form onSubmit={handleSubmit} className="login-form" autoComplete="off">
            <div className="login-input-group">
              <FaUser className="login-icon" />
              <input
                type="text"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="login-input underline"
                autoComplete="off"
                name="username-field"
              />
            </div>
            <div className="login-input-group">
              <FaLock className="login-icon" />
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="login-input underline"
                autoComplete="new-password"
                name="password-field"
              />
            </div>

            {error && <div className="login-error">{error}</div>}
            {success && <div className="login-success">{success}</div>}

            <button type="submit" className="login-button">Ingresar</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
