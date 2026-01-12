import React, { useState } from "react";
import './navbar.css';
import axios from "axios";
import { API_ENDPOINTS } from "../config/apiConfig";

const Footer = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    mensaje: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
const [mensaje, setMensaje] = useState({ texto: "", tipo: "" });
const mostrarMensaje = (texto, tipo = "success") => {
  setMensaje({ texto, tipo });
  setTimeout(() => {
    setMensaje({ texto: "", tipo: "" });
  }, 3000);
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
  await axios.post(API_ENDPOINTS.CONTACT_FOOTER, formData);
  mostrarMensaje("Mensaje enviado correctamente", "success");
  setFormData({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    mensaje: ""
  });
} catch (error) {
  console.error("Error al enviar el formulario:", error);
  mostrarMensaje("Error al enviar el formulario", "error");
}

  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Sección de información */}
        <div className="footer-info">
          <h2>Hot and Cold <br /> Services</h2>
          <ul className="footer-list">
            <li>info@hotandcoldservice.cl</li>
            <li>123-456-7890</li>
            <li>El Libertador 10972, Santiago, Chile</li>
            <li><button className="footer-button">Tienda</button></li>
            <li><button className="footer-button">Climatización</button></li>
            <li><button className="footer-button">Calefacción Centralizada</button></li>
            <li><button className="footer-button">Ventilación</button></li>
            <li><button className="footer-button">Contacto</button></li>
          </ul>
        </div>

        {/* Sección del formulario */}
        {mensaje.texto && (
  <div className={`admin-alert ${mensaje.tipo}`}>
    {mensaje.texto}
  </div>
)}

        <div className="footer-form">
          <h2>Contact Info</h2>
          <p>
            Nuestro equipo de servicio al cliente está aquí para responder cualquier pregunta. Utilice este formulario o contáctenos directamente por correo electrónico o por teléfono.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input 
                type="text" 
                placeholder="Nombre" 
                name="nombre" 
                value={formData.nombre} 
                onChange={handleChange} 
                required 
              />
              <input 
                type="text" 
                placeholder="Apellido" 
                name="apellido" 
                value={formData.apellido} 
                onChange={handleChange} 
                required 
              />
            </div>
             
            <input 
              type="text" 
              placeholder="Teléfono" 
              name="telefono" 
              value={formData.telefono} 
              onChange={handleChange} 
              required 
            />
            <input 
              type="email" 
              placeholder="Correo Electrónico" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
            <textarea 
              placeholder="Mensaje" 
              name="mensaje" 
              value={formData.mensaje} 
              onChange={handleChange} 
              required 
            ></textarea>
            <button type="submit" className="footer-submit-btn">Enviar</button>

          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
