import React, { useEffect } from 'react';
import Navbar from "../components/navbar"; // Importa el Navbar
import Footer from "../components/footer";
import '../components/calefaccion.css';

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

      {/* Imagen de fondo */}
      <div class="img-calefaccion">
  <div class="contenido">
    <div class="texto">
      <h2>Calefacción y climatización centralizada para todo tipo de espacios</h2>
    
    </div>
  </div>
</div>
<div class="card-calefaccion">
  <div class="card-contenido">
    <h2>Soluciones eficientes y sostenibles para el confort térmico de hogares, oficinas y espacios comerciales</h2>
  </div>
</div>

      

     <div className="contenedor-cards-calefaccion">
  <div className="card-info-calefaccion">
    <p>
      En Hot and Cold, nos especializamos en el diseño e instalación de sistemas de calefacción y climatización centralizada, adaptados a las necesidades específicas de cada cliente. Nuestro enfoque está en la eficiencia energética, el confort y la tecnología de punta.
      <br /><br />
Ofrecemos soluciones integrales tanto para inmuebles nuevos como para remodelaciones, utilizando equipos modernos que permiten un consumo responsable de energía y un control preciso de la temperatura. Trabajamos con marcas reconocidas y cumplimos con todas las normativas nacionales e internacionales de seguridad e instalación.
   <br /><br />
   Nuestro equipo técnico está capacitado para acompañarte en cada etapa del proyecto: desde la evaluación inicial hasta la puesta en marcha y el mantenimiento preventivo.
    </p>
  </div>
</div>


<div className="cards-container-calefaccion">
  <div className="calefaccion-card calefaccion-card-color-1">
    <h2>¿Por qué calefacción centralizada?</h2>
    <p>Mejora la calidad del aire, elimina puntos fríos y reduce el consumo energético. Un solo sistema controla todo tu ambiente.</p>
  </div>

  <div className="calefaccion-card calefaccion-card-color-2">
    <h2>Ideal para inmuebles exigentes</h2>
    <p>Perfecta para casas de más de un piso, oficinas, clínicas, colegios o centros comerciales. Control zonificado disponible.</p>
  </div>

  <div className="calefaccion-card calefaccion-card-color-3">
    <h2>Compatibilidad con energía solar y bombas de calor</h2>
    <p>Nuestros sistemas permiten integración con fuentes renovables, lo que disminuye costos operativos y el impacto ambiental.</p>
  </div>

  <div className="calefaccion-card calefaccion-card-color-4">
    <h2>Instalación limpia y planificada</h2>
    <p>Nos adaptamos a las etapas de tu proyecto, ya sea en obra gris o terminado, con mínima intervención estética.</p>
  </div>

  <div className="calefaccion-card calefaccion-card-color-5">
    <h2>¿Cuánto puedes ahorrar?</h2>
    <p>Un sistema bien diseñado puede reducir hasta un 30% en gastos de calefacción en comparación con métodos tradicionales.</p>
  </div>
</div>



    
<div class="card-calefaccion">
  <div class="card-contenido">
    <h2>Calor inteligente, confort todo el año</h2>
  </div>
</div>

           


     <div className="contenedor-cards-calefaccion">
  <div className="card-info-calefaccion">
     <h2>Compromiso con el medio ambiente</h2>
     <h3>Tecnología eficiente, futuro sostenible</h3>
    <p>

  Nuestros sistemas reducen la huella de carbono de los espacios donde se instalan. Promovemos soluciones que integran energías renovables, automatización inteligente y bajo consumo. Porque climatizar no debe ser sinónimo de contaminar.
    </p>
  </div>
</div>

      {/* Card largo horizontal con imagen */}
      <div className="bg-[#cfdde9] w-full md:w-[100%] h-[350px] shadow-lg flex flex-row items-center space-x-5 mx-auto relative top-8">
        <div className="w-full h-full absolute top-0 left-0">
          <img
            src="/assets/cal2.avif"  // Reemplaza con tu ruta de imagen
            alt="Imagen del Card"
            className="object-cover w-full h-full"
          />
        </div>
      </div>

    


      
 

      <Footer />
    </div>
  );
};

export default Climatizacion;
