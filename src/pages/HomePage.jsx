import React, { useState, useEffect } from "react";
import ProductList from "../components/ProductList";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { API_ENDPOINTS } from "../config/apiConfig";

function HomePage() {
  // Evitar añadir event listener en cada render
  useEffect(() => {
    const handleScroll = () => {
      const imageContainers = document.querySelectorAll(".image-card-4");
      imageContainers.forEach((container) => {
        let scrollY = window.scrollY;
        let speed = 0.4;
        container.style.backgroundPosition = `center calc(50% + ${scrollY * speed}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [selectedImage, setSelectedImage] = useState(null);
  const [currentCategoryImages, setCurrentCategoryImages] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const categorias = [
    {
      categoria: "Calderas y Piso Mural",
      imagenes: ['/assets/c2.webp', '/assets/c1.webp', '/assets/c3.webp', '/assets/c4.webp']
    },
    {
      categoria: "Calderas Instaladas",
      imagenes: ['/assets/a1.webp', '/assets/a2.webp', '/assets/a3.webp', '/assets/a4.webp']
    },
    {
      categoria: "Loza y Piso Radiante",
      imagenes: ['/assets/e1.webp', '/assets/e2.webp', '/assets/e3.webp', '/assets/e4.webp']
    },
    {
      categoria: "Calefacción Central con Radiadores",
      imagenes: ['/assets/o1.webp', '/assets/o2.webp', '/assets/o3.webp', '/assets/o4.webp']
    },
    {
      categoria: "Instalaciones de Gas",
      imagenes: ['/assets/u1.webp', '/assets/u2.webp', '/assets/u3.webp', '/assets/u4.webp']
    }
  ];

  // Modal functions
  const openModal = (imagen, imagenes, index) => {
    setSelectedImage(imagen);
    setCurrentCategoryImages(imagenes);
    setSelectedIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setCurrentCategoryImages([]);
    setSelectedIndex(0);
  };

  const showPrev = () => {
    const newIndex = (selectedIndex - 1 + currentCategoryImages.length) % currentCategoryImages.length;
    setSelectedImage(currentCategoryImages[newIndex]);
    setSelectedIndex(newIndex);
  };

  const showNext = () => {
    const newIndex = (selectedIndex + 1) % currentCategoryImages.length;
    setSelectedImage(currentCategoryImages[newIndex]);
    setSelectedIndex(newIndex);
  };

  // Form state
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    direccion: "",
    rol: "",
    mensaje: ""
  });

  // Message state
  const [mensaje, setMensaje] = useState({ texto: "", tipo: "" });

  // Controla cambios en inputs
  function handleChange(e) {
    const { id, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        rol: checked ? (id === "dueno-casa" ? "Dueño de Casa" : "Dueño de Negocio") : "",
      }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  }

  // Mostrar mensaje con timeout para ocultar después
  const mostrarMensaje = (texto, tipo = "success") => {
    setMensaje({ texto, tipo });
    setTimeout(() => {
      setMensaje({ texto: "", tipo: "" });
    }, 3000);
  };

  // Manejo de envío del formulario
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(API_ENDPOINTS.CONTACT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        mostrarMensaje("Mensaje enviado correctamente", "success");
        setFormData({
          nombre: "",
          apellido: "",
          email: "",
          telefono: "",
          direccion: "",
          rol: "",
          mensaje: "" // Asegurarse que este campo también se limpie
        });
      } else {
        mostrarMensaje("Error: " + data.message, "error");
      }
    } catch (error) {
      mostrarMensaje("Error al enviar el formulario", "error");
      console.error(error);
    }
  }

  return (
    <div>
      <Navbar />

      <ProductList />

      <div className="home-banner-calefaccion">
        <div className="home-banner-overlay">
          <div className="home-banner-content">
            <div className="home-banner-texto">
              <h2>Proyectos y Servicios de Climatización</h2>
            </div>
            <img src="/assets/logo.avif" alt="Logo" className="home-banner-logo" />
          </div>
        </div>
      </div>

      <br />

      {mensaje.texto && (
        <div className={`mensaje ${mensaje.tipo}`}>
          {mensaje.texto}
        </div>
      )}

      <div className="bg-[#8ad1da] mt-6 w-full mx-auto p-4 rounded-lg shadow-lg flex flex-col items-center text-white">
        <h2 className="text-xl font-light mb-4">¡Obtenga una cotización sin compromiso hoy!</h2>

        <form onSubmit={handleSubmit} className="flex gap-3 mb-6 w-full flex-row flex-wrap">

          <div className="w-1/5">
            <label htmlFor="nombre" className="block">Nombre</label>
            <input
              type="text"
              id="nombre"
              placeholder="Ingrese su nombre"
              required
              value={formData.nombre}
              onChange={handleChange}
              className="w-full p-3 border border-white bg-transparent text-white rounded-md"
            />
          </div>
          <div className="w-1/5">
            <label htmlFor="apellido" className="block">Apellido</label>
            <input
              type="text"
              id="apellido"
              placeholder="Ingrese su apellido"
              required
              value={formData.apellido}
              onChange={handleChange}
              className="w-full p-3 border border-white bg-transparent text-white rounded-md"
            />
          </div>
          <div className="w-1/5">
            <label htmlFor="email" className="block">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Ingrese su email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-white bg-transparent text-white rounded-md"
            />
          </div>
          <div className="w-1/6">
            <label htmlFor="telefono" className="block">Teléfono</label>
            <input
              type="tel"
              id="telefono"
              placeholder="Ingrese su teléfono"
              required
              value={formData.telefono}
              onChange={handleChange}
              className="w-full p-3 border border-white bg-transparent text-white rounded-md"
            />
          </div>
          <div className="w-1/6">
            <label htmlFor="direccion" className="block">Dirección</label>
            <input
              type="text"
              id="direccion"
              placeholder="Ingrese su dirección"
              required
              value={formData.direccion}
              onChange={handleChange}
              className="w-full p-3 border border-white bg-transparent text-white rounded-md"
            />
          </div>

          <div className="flex gap-4 justify-center w-full mt-4">
            <div>
              <input
                type="checkbox"
                id="dueno-casa"
                checked={formData.rol === "Dueño de Casa"}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="dueno-casa">Dueño de Casa</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="dueno-negocio"
                checked={formData.rol === "Dueño de Negocio"}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="dueno-negocio">Dueño de Negocio</label>
            </div>
          </div>

          <div className="mt-4 w-full flex justify-center">
            <button
              type="submit"
              className="bg-[#b45c3d] text-white px-4 py-2 rounded-full transition-colors duration-300"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>

      <div className="mt-4">
        <div className="flex flex-wrap justify-center gap-4">

          <div className="card-custom">
            <div className="bg-cover bg-center bg-no-repeat h-2/3 bg-[url('/assets/h2.avif')]"></div>
            <div className="bg-white px-4 py-6 h-1/3">
              <h3 className="font-bold text-lg text-black mt-4">Climatización Residencial</h3>
              <p className="font-bold text-base text-black">Disfrutá el confort con nuestros climatizadores y nuestra amplia línea de equipos residenciales de aire acondicionado.</p>
            </div>
          </div>

          <div className="card-custom">
            <div className="bg-cover bg-center bg-no-repeat h-2/3 bg-[url('/assets/h3.avif')]"></div>
            <div className="bg-white px-4 py-6 h-1/3">
              <h3 className="font-bold text-xl text-black mt-4 mb-2">Calderas y Circuitos de Calefacción</h3>
              <p className="font-bold text-base text-black">Ponemos a punto calderas y circuitos de calefacción para que el funcionamiento sea correcto y la evacuación de los gases se realice de forma adecuada.</p>
            </div>
          </div>

          <div className="card-custom">
            <div className="bg-cover bg-center bg-no-repeat h-2/3 bg-[url('/assets/hh6.jpg')]"></div>
            <div className="bg-white px-4 py-6 h-1/3">
              <h3 className="font-bold text-xl text-black mt-4">Eficiencia Energética - Paneles Solares</h3>
              <p className="font-bold text-base text-black">Optimizamos la energía que consumen los procesos productivos, mejorando los hábitos de consumo y el empleo de energías limpias.</p>
            </div>
          </div>

          <div className="card-custom">
            <div className="bg-cover bg-center bg-no-repeat h-2/3 bg-[url('/assets/hh4.webp')]"></div>
            <div className="bg-white px-4 py-6 h-1/3">
              <h3 className="font-bold text-xl text-black mt-4 mb-2">Bombas de Calor para Piscinas</h3>
              <p className="font-bold text-base text-black">El equipo es económico, ya que calienta el agua con el calor del propio aire, pudiendo reducir hasta 5 veces el costo.</p>
            </div>
          </div>

        </div>
      </div>



      <div>
        <div className="card-trabajos">
          <div className="card-trabajos-contenido">
            <h2>Nuestros trabajos</h2>
            <p>
              Proyectos que hablan por nosotros. Calidad, precisión y compromiso en cada instalación.
            </p>
          </div>
        </div>


        {/* Contenedor de categorías con imágenes */}
        <div className="categorias-container">
          {categorias.map((categoriaData, index) => (
            <div key={index} className="categoria-card">
              <h3 className="categoria-title">
                {categoriaData.categoria}
              </h3>
              <div className="categoria-images-container">
                {categoriaData.imagenes.map((imagen, imgIndex) => (
                  <div
                    key={imgIndex}
                    className="categoria-image"
                    style={{ backgroundImage: `url(${imagen})` }}
                    onClick={() => openModal(imagen, categoriaData.imagenes, imgIndex)} // Abre el modal al hacer clic
                  ></div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Modal para la imagen seleccionada */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
            <button
              onClick={closeModal} // Cierra el modal
              className="absolute top-6 right-8 text-white text-2xl font-light hover:scale-110 transition bg-transparent"
            >
              ✕
            </button>

            {/* Botón anterior */}
            <button
              onClick={showPrev}
              className="absolute left-6 text-white text-[100px] font-extralight hover:scale-125 transition bg-transparent border-none"
              style={{ top: '50%', transform: 'translateY(-50%)' }}
            >
              ❮
            </button>

            {/* Imagen principal */}
            <img
              src={selectedImage}
              alt="Imagen seleccionada"
              className="max-w-[80%] max-h-[80%] rounded-lg"
            />

            {/* Botón siguiente */}
            <button
              onClick={showNext}
              className="absolute right-6 text-white text-[100px] font-extralight hover:scale-125 transition bg-transparent border-none"
              style={{ top: '50%', transform: 'translateY(-50%)' }}
            >
              ❯
            </button>
          </div>
        )}
      </div>

      <div className="card-container-home">
        <div className="overlay"></div>
        <div className="card-text">
          <h3>El papel de la energía solar en la eficiencia energética</h3>
          <p>
            En términos más profesionales o técnicos, podemos decir que la eficiencia energética es la ciencia o técnica que estudia el consumo inteligente de energía. Es decir, usar sólo lo que necesitas, ni más ni menos, y todos los mecanismos asociados que ayudan a conseguir una optimización. Una eficiencia energética y una calefacción o climatización inteligentes, que se traducen en un ahorro sobre cualquier sistema o instalación que nos podamos encontrar.
          </p>
        </div>
      </div>





      <div className="card-trabajos">
        <div className="card-trabajos-contenido">
          <h2>Nuestro Sello Diferenciador</h2>

        </div>
      </div>



      <div className="flex gap-4 mt-8 justify-between w-full md:w-[48%] h-[350px] px-4">
        <div className="bg-[#b45c3d] rounded-[20px] shadow-md flex-1 h-72 flex items-center">
          <div className="text-left px-4 py-6 w-full">
            <h3 className="font-bold text-xl text-white mb-4">Puntualidad</h3>
            <p className="text-sm text-white">
              Hacemos que la Climatización, aire acondicionado y energía solar sea fácil, por lo que obtendrá un mejor servicio de energía a un mejor precio.
            </p>
          </div>
        </div>

        <div className="bg-[#12222e] rounded-[20px] shadow-md flex-1 h-72 flex items-center">
          <div className="text-left px-4 py-6 w-full">
            <h3 className="font-bold text-xl text-white mb-4">Experiencia en el rubro</h3>
            <p className="text-sm text-white">
              Aportamos soluciones de eficiencia energética con sistemas innovadores, adaptados a las necesidades de cada cliente.
            </p>
          </div>
        </div>

        <div className="bg-[#cfdde9] rounded-[20px] shadow-md flex-1 h-72 flex items-center">
          <div className="text-left px-4 py-6 w-full">
            <h3 className="font-bold text-xl text-black mb-4">Manejo de proyectos bajo presión</h3>
            <p className="text-sm text-black">
              Brindamos servicios de instalación y mantenimiento de sistemas de calefacción central con tecnologías avanzadas.
            </p>
          </div>
        </div>
      </div>


      <Footer />
    </div>
  );
}

export default HomePage;
