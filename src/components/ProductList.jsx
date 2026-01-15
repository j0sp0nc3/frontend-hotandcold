import { useState, useEffect } from "react";
import { productService } from "../services";
import { Link } from "react-router-dom";
import "./home.css";

function ProductList() {
  const [productos, setProductos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await productService.getAll();
        console.log("Productos recibidos:", response);
        const productosList = response.data || [];
        setProductos(productosList);
      } catch (error) {
        console.error("Error al obtener productos:", error);
        setProductos([]);
      }
    };

    fetchProductos();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? productos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === productos.length - 1 ? 0 : prev + 1));
  };

  // Auto-avance cada 5 segundos
  useEffect(() => {
    if (productos.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === productos.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [productos.length]);

  if (productos.length === 0) {
    return (
      <div className="product-container">
        <h2 style={{ 
          fontSize: '2rem', 
          fontWeight: '700', 
          textAlign: 'center', 
          marginBottom: '2rem',
          color: '#333'
        }}>
          Nuestros Productos
        </h2>
        <p style={{ 
          textAlign: 'center', 
          fontSize: '1.1rem', 
          color: '#666',
          padding: '2rem' 
        }}>
          No hay productos disponibles en este momento.
        </p>
      </div>
    );
  }

  return (
    <div className="product-container">
      <h2 style={{ 
        fontSize: '2rem', 
        fontWeight: '700', 
        textAlign: 'center', 
        marginBottom: '2rem',
        color: '#333'
      }}>
        Nuestros Productos
      </h2>
      
      <div className="carousel-container">
        {productos.length > 1 && (
          <button 
            onClick={handlePrev} 
            className="carousel-btn carousel-btn-prev"
          >
            ‹
          </button>
        )}

        <div className="carousel-wrapper">
          <div 
            className="carousel-track"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`
            }}
          >
            {productos.map((producto, index) => (
              <div key={producto.id || index} className="carousel-item-full">
                <Link to={`/producto/${producto.id}`} className="product-card">
                  <img src={producto.imagenUrl} alt={producto.titulo} className="product-image" />
                  <h3>{producto.titulo}</h3>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {productos.length > 1 && (
          <button 
            onClick={handleNext} 
            className="carousel-btn carousel-btn-next"
          >
            ›
          </button>
        )}
      </div>

      {/* Indicadores */}
      {productos.length > 1 && (
        <div className="carousel-indicators">
          {productos.map((_, idx) => (
            <button
              key={idx}
              className={`carousel-indicator ${currentIndex === idx ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
