import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { productService } from "../services";
import Navbar from "../components/navbar"; // Importa el Navbar
import Footer from "../components/footer";
import "./home.css";

function ProductDetail() {
  const { id } = useParams(); // Obtener el id del producto desde la URL
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await productService.getById(id);
        if (response.success && response.data) {
          setProducto(response.data);
        } else {
          console.log("Producto no encontrado");
        }
      } catch (error) {
        console.error("Error al obtener producto:", error);
      }
    };

    fetchProductDetail();
  }, [id]); // Ejecutar cada vez que el id cambia

  if (!producto) {
    return <div>Cargando...</div>; // Mientras carga el producto
  }

  return (
    <div >
        <Navbar /> 

    <div className="product-detail">
      <div className="product-detail-left">
        <img src={producto.imagenUrl} alt={producto.titulo} className="product-detail-image" />
      </div>
      <div className="product-detail-right">
        <h2>{producto.titulo}</h2>
        <p>{producto.descripcion}</p>
      </div>
    </div>
    <Footer />
    </div>
  );
}

export default ProductDetail;
