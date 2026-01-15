import React, { useEffect } from 'react';
import Navbar from "../components/navbar"; // Importa el Navbar
import Footer from "../components/footer";
import '../components/climatizacion.css';

const Climatizacion = () => {
  useEffect(() => {
    // Navbar reference not needed for this effect
  }, []);

  document.addEventListener("scroll", function () {
    const imageContainers = document.querySelectorAll(".image-card, .image-card-1, .image-card-2");

    imageContainers.forEach((container) => {
      let scrollY = window.scrollY; // Captura el scroll actual
      let speed = 0.2; // Ajusta la velocidad de desplazamiento

      container.style.backgroundPosition = `center calc(100% + ${scrollY * speed}px)`;
    });
  });

  document.addEventListener("scroll", function () {
    const imageContainers = document.querySelectorAll(" .image-card-1, .image-card-2");

    imageContainers.forEach((container) => {
      let scrollY = window.scrollY; // Captura el scroll actual
      let speed = 0.2; // Ajusta la velocidad de desplazamiento

      container.style.backgroundPosition = `center calc(20% + ${scrollY * speed}px)`;
    });
  });

  return (
    <div>
      <Navbar />

  
  <div class="img-climatizacion">
  <div class="contenido">
    <div class="texto">
      <h2>Proyectos y Servicios de Climatización</h2>
      <p>Soluciones modernas y eficientes para tu confort térmico.</p>
    </div>
  </div>
</div>
      {/* Card Principal */}
<div class="card-calefaccion">
  <div class="card-contenido">
    <h2>¿Por que elegir a Hot And Cold?</h2>
  </div>
</div>
      {/* Cards */}
      <div class="cards-container">
        <div class="clima-card clima-card-color-1">
          <h2>Atención personalizada y asesoría técnica experta</h2>
          <p>Evaluación del espacio y recomendaciones personalizadas según el uso, tipo de inmueble y eficiencia energética.</p>
        </div>

        <div class="clima-card clima-card-color-2">
          <h2>Certificación y cumplimiento normativo</h2>
          <p>Técnicos certificados y cumplimiento con todas las normativas chilenas e internacionales de instalación y seguridad.</p>
        </div>

        <div class="clima-card clima-card-color-3">
          <h2>Garantía extendida y mantenimiento preventivo</h2>
          <p> Servicios con garantía prolongada y planes de mantención periódica para alargar la vida útil de los equipos.</p>
        </div>

        <div class="clima-card clima-card-color-4">
          <h2>Eficiencia energética y tecnología de punta</h2>
          <p>Uso de equipos de última generación con bajo consumo eléctrico y soluciones sostenibles que reducen la huella ambiental del cliente.</p>
        </div>
      </div>



      {/* Card largo horizontal con imagen */}
      <div className="bg-[#cfdde9] w-full md:w-[100%] h-[350px] shadow-lg flex flex-row items-center space-x-5 mx-auto relative top-8">
        <div className="w-full h-full absolute top-0 left-0">
          <img
            src="/assets/t2.jpg"  // Reemplaza con tu ruta de imagen
            alt="Imagen del Card"
            className="object-cover w-full h-full"
          />
        </div>
      </div>

     
<div class="card-calefaccion">
  <div class="card-contenido">
    <h2>¿Cómo realizamos nuestro trabajo?</h2>
  </div>
</div>

      {/* Más Cards */}
      <div className="flex flex-col my-5">
        <div className="bg-[#12222e] text-white p-5 shadow-lg w-full max-w-[3000px] h-[300px] mx-auto flex justify-center items-center">
          <p>Evaluamos el espacio, recomendamos el equipo ideal y agendamos la instalación con técnicos certificados. Tras la instalación, verificamos su correcto funcionamiento y ofrecemos soporte y mantenimiento postventa.</p>
         
        </div>
      </div>


      {/* Cards adicionales */}
      <div class="cards-grid">
        <div class="clima-card bg-img1">
          <div>
            <h2>Evaluación Ambiental</h2>
            <p>Revisamos el entorno antes de la instalación.</p>
          </div>
        </div>

        <div class="clima-card-1 bg-celeste">
          <h2>Elegibilidad del Sitio</h2>
          <p>Confirmamos que el lugar cumple los requisitos técnicos.</p>
        </div>

        <div class="clima-card-1 bg-celeste2">
          <h2>Permisos de Instalación</h2>
          <p>Tramitamos todos los permisos necesarios para climatización.</p>
        </div>

        <div class="clima-card-1 bg-oscuro">
          <h2>Conexión a Servicios</h2>
          <p>Realizamos las conexiones necesarias con el suministro eléctrico.</p>
        </div>

        <div class="clima-card-1 bg-naranja">
          <h2>Climatización Activa</h2>
          <p>Encendemos tu sistema y hacemos pruebas finales.</p>
        </div>

        <div class="clima-card bg-img2">
          <div>
            <h2>Monitoreo Inteligente</h2>
            <p>Supervisamos el rendimiento del sistema instalado.</p>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default Climatizacion;
