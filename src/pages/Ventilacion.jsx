// src/pages/HomePage.jsx
import React from "react";
import ProductList from "../components/ProductList";
import { Link } from "react-router-dom"; // Importa Link
import Navbar from "../components/navbar"; // Importa el Navbar
import '../components/climatizacion.css'; // Asegúrate de importar el archivo CSS
import '../components/ventilacion.css'; // Asegúrate de importar el archivo CSS
import Footer from "../components/footer";

function HomePage() {
    return (
        <div >
            <Navbar /> {/* Agrega el Navbar en la parte superior */}
            
            
         <div class="img-ventilacion">
  <div class="overlay"></div>
  <div class="contenido">
    <div class="texto">
      <h2></h2>
      
    </div>
  </div>
</div>







<div class="card-ventilacion">
  <div class="card-ventilacion-contenido">
    <h2>Un mañana mejor</h2>
    <p>
     Respira aire puro, vive con bienestar. Sistemas de ventilación que cuidan tu salud y tu entorno.
    </p>
  </div>
</div>


            <div className="flex flex-col my-5">
                <div className="bg-[#12222e] text-white p-5 shadow-lg w-full max-w-[3000px] h-[300px] mx-auto flex justify-center items-center">
                    <p>Ofrecemos soluciones de ventilación mecánica y natural para mejorar la calidad del aire en hogares, oficinas e industrias. Diseñamos e instalamos sistemas que permiten renovar el aire, controlar la humedad y eliminar contaminantes, garantizando ambientes más saludables y seguros.</p>
                    
                </div>
            </div>

            <div class="cards-container">
                <div class="clima-card clima-card-color-1">
                    <h2>Mejora la calidad del aire</h2>
                    <p>Elimina contaminantes, olores y partículas en suspensión, creando espacios más saludables.</p>
                </div>

                <div class="clima-card clima-card-color-2">
                    <h2>Control de humedad</h2>
                    <p>Evita la condensación, hongos y problemas estructurales gracias a una ventilación adecuada.</p>
                </div>

                <div class="clima-card clima-card-color-3">
                    <h2>Cumplimiento normativo</h2>
                    <p>Instalamos sistemas según las normativas de calidad del aire interior y seguridad vigentes.</p>
                </div>

                <div class="clima-card clima-card-color-4">
                    <h2>Soluciones a medida</h2>
                    <p>Diseñamos sistemas de ventilación adaptados al tipo de inmueble y sus necesidades.</p>
                </div>
            </div>
           
            
<div class="card-ventilacion">
  <div class="card-ventilacion-contenido">
    <h2>Trabaja con Nosotros</h2>
   
  </div>
</div>

            <div class="cards-container">
                <div class="clima-card-b">
                    <h2>Sé parte de nuestro equipo</h2>
                    <p>Buscamos personas comprometidas, con ganas de crecer y aportar al desarrollo de soluciones en climatización, ventilación y eficiencia energética. Súmate a un equipo técnico y humano que marca la diferencia.</p>
                </div>

                <div class="clima-card-b">
                    <h2> Crece con nosotros</h2>
                    <p>Ofrecemos oportunidades de formación, desarrollo profesional y participación en proyectos innovadores. Si te apasiona el rubro y quieres construir un futuro sólido, este es tu lugar.</p>
                </div>
                </div>
                <div className="bg-[#cfdde9] w-full md:w-[100%] h-[350px] shadow-lg flex flex-row items-center space-x-5 mx-auto relative top-8">
        <div className="w-full h-full absolute top-0 left-0">
          <img
            src="/assets/t3.jpg"  // Reemplaza con tu ruta de imagen
            alt="Imagen del Card"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
            <Footer /> {/* Agregamos el Footer */}

        </div>
    );
}

export default HomePage;
