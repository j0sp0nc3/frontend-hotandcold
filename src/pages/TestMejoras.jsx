import React, { useState } from 'react';
import { useForm, useModal } from '../hooks';
import { Button, Card, Input, Modal } from '../components/ui';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import './TestMejoras.css';

const TestMejoras = () => {
  const [mensaje, setMensaje] = useState('');
  
  // Hook de modal
  const { isOpen, modalData, openModal, closeModal } = useModal();
  
  // Hook de formulario
  const { values, handleChange, handleSubmit, isSubmitting, resetForm } = useForm(
    {
      nombre: '',
      email: '',
      mensaje: ''
    },
    async (data) => {
      // Simular envío
      await new Promise(resolve => setTimeout(resolve, 1500));
      setMensaje('✅ Formulario enviado con éxito!');
      resetForm();
      setTimeout(() => setMensaje(''), 3000);
    }
  );

  return (
    <div className="test-page">
      <Navbar />
      
      <div className="test-container">
        <h1 className="test-title">🚀 Prueba de Mejoras Frontend</h1>
        
        {/* Sección de Botones */}
        <section className="test-section">
          <h2>🔘 Componente Button</h2>
          <div className="button-grid">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="success">Success</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="outline">Outline</Button>
          </div>
          
          <div className="button-grid">
            <Button size="small">Small</Button>
            <Button size="medium">Medium</Button>
            <Button size="large">Large</Button>
            <Button loading>Loading...</Button>
            <Button disabled>Disabled</Button>
          </div>
        </section>

        {/* Sección de Cards */}
        <section className="test-section">
          <h2>🃏 Componente Card</h2>
          <div className="card-grid">
            <Card 
              title="Card con Imagen"
              subtitle="Subtitle del card"
              image="/assets/logo.avif"
              hover
            >
              <p>Este es un card con hover effect</p>
              <Button variant="primary" size="small">Ver más</Button>
            </Card>

            <Card 
              title="Card Clickeable"
              subtitle="Click para abrir modal"
              hover
              onClick={() => openModal('¡Modal abierto desde un Card! 🎉')}
            >
              <p>Haz click en este card completo</p>
            </Card>

            <Card title="Card Simple">
              <p>Card sin imagen ni hover effect</p>
              <Button variant="outline" size="small">Acción</Button>
            </Card>
          </div>
        </section>

        {/* Sección de Modal */}
        <section className="test-section">
          <h2>🪟 Componente Modal</h2>
          <div className="button-grid">
            <Button onClick={() => openModal('Modal pequeño')}>
              Modal Small
            </Button>
            <Button onClick={() => openModal('Modal mediano')} variant="secondary">
              Modal Medium
            </Button>
            <Button onClick={() => openModal('Modal grande')} variant="success">
              Modal Large
            </Button>
          </div>
        </section>

        {/* Sección de Formulario con useForm */}
        <section className="test-section">
          <h2>📝 Hook useForm + Componentes Input</h2>
          
          {mensaje && (
            <div className="alert-success">
              {mensaje}
            </div>
          )}

          <form onSubmit={handleSubmit} className="test-form">
            <Input
              label="Nombre completo"
              name="nombre"
              placeholder="Ingresa tu nombre"
              value={values.nombre}
              onChange={handleChange}
              required
            />

            <Input
              label="Correo electrónico"
              type="email"
              name="email"
              placeholder="tu@email.com"
              value={values.email}
              onChange={handleChange}
              required
            />

            <div className="input-group">
              <label className="input-label">
                Mensaje <span className="input-required">*</span>
              </label>
              <textarea
                name="mensaje"
                placeholder="Escribe tu mensaje aquí..."
                value={values.mensaje}
                onChange={handleChange}
                required
                className="input"
                rows="4"
              />
            </div>

            <div className="form-actions">
              <Button type="submit" loading={isSubmitting} fullWidth>
                {isSubmitting ? 'Enviando...' : 'Enviar Formulario'}
              </Button>
              <Button type="button" variant="outline" onClick={resetForm}>
                Limpiar
              </Button>
            </div>
          </form>
        </section>

        {/* Información */}
        <section className="test-section info-section">
          <h2>✨ Mejoras Implementadas</h2>
          <ul className="features-list">
            <li>✅ Custom Hooks (useForm, useModal, useFetch, useLocalStorage)</li>
            <li>✅ Componentes UI reutilizables (Button, Card, Input, Modal)</li>
            <li>✅ Lazy Loading en rutas</li>
            <li>✅ AuthContext mejorado con JWT</li>
            <li>✅ Capa de servicios API</li>
            <li>✅ Optimización con React.memo y useCallback</li>
          </ul>
        </section>
      </div>

      {/* Modal */}
      <Modal 
        isOpen={isOpen} 
        onClose={closeModal}
        title="Ejemplo de Modal"
        size="medium"
      >
        <div style={{ padding: '1rem' }}>
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
            {modalData || 'Contenido del modal'}
          </p>
          <p>Puedes cerrar este modal con:</p>
          <ul style={{ marginLeft: '2rem', marginTop: '0.5rem' }}>
            <li>El botón X</li>
            <li>Haciendo click fuera</li>
            <li>Presionando ESC</li>
          </ul>
          <Button onClick={closeModal} style={{ marginTop: '1rem' }}>
            Cerrar Modal
          </Button>
        </div>
      </Modal>

      <Footer />
    </div>
  );
};

export default TestMejoras;
