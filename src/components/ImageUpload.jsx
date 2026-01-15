import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios';
import "./admin.css";
import { productService } from "../services";
import Navbar from "../components/navbar";
import Swal from 'sweetalert2';

const ImageUpload = () => {
  const editFormRef = useRef(null);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productos, setProductos] = useState([]);
  const [productoEditando, setProductoEditando] = useState(null);
  const [editFile, setEditFile] = useState(null);
  const [editLoading, setEditLoading] = useState(false);
  const [editImageUrl, setEditImageUrl] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [mensaje, setMensaje] = useState({ texto: "", tipo: "" });

  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleEditFileChange = (e) => setEditFile(e.target.files[0]);

  const mostrarMensaje = (texto, tipo = "success") => {
    setMensaje({ texto, tipo });
    setTimeout(() => {
      setMensaje({ texto: "", tipo: "" });
    }, 3000);
  };

  const fetchProductos = async () => {
    try {
      const response = await productService.getAll();
      const productosData = response.data || [];
      setProductos(productosData);
    } catch (error) {
      console.error("Error al obtener productos:", error);
      mostrarMensaje("Error al cargar productos.", "error");
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Selecciona una imagen");
    if (!title || !description) return alert("Título y descripción son obligatorios");
    
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "my_custom_preset");

    try {
      // Subir imagen a Cloudinary
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/dmmlobp9k/image/upload`,
        formData
      );

      const uploadedImageUrl = res.data.secure_url;

      // Crear producto en backend
      await productService.create({
        titulo: title,
        descripcion: description,
        imagenUrl: uploadedImageUrl,
      });

      setTitle("");
      setDescription("");
      setFile(null);
      setImageUrl("");
      mostrarMensaje("Producto agregado correctamente.", "success");
      fetchProductos();
    } catch (err) {
      console.error("Error al subir la imagen:", err);
      mostrarMensaje("Error al subir la imagen.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: '¿Estás seguro?',
    text: "¡No podrás revertir esto!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
  });

  if (result.isConfirmed) {
    try {
      await productService.delete(id);
      mostrarMensaje("Producto eliminado correctamente.", "success");
      fetchProductos();
      Swal.fire(
        'Eliminado',
        'El producto ha sido eliminado.',
        'success'
      );
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      mostrarMensaje("Error al eliminar el producto.", "error");
      Swal.fire(
        'Error',
        'No se pudo eliminar el producto.',
        'error'
      );
    }
  }
};

 const handleEditInit = (producto) => {
  setProductoEditando(producto);
  setEditImageUrl(producto.imagenUrl);
  setEditFile(null);
  setShowForm(false);

  setTimeout(() => {
    if (editFormRef.current) {
      editFormRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, 100);
};


  const handleEditSave = async () => {
    if (!productoEditando.titulo || !productoEditando.descripcion) {
      return alert("Título y descripción son obligatorios");
    }

    setEditLoading(true);
    let newImageUrl = editImageUrl;

    try {
      // Si hay nueva imagen, subirla a Cloudinary
      if (editFile) {
        const formData = new FormData();
        formData.append("file", editFile);
        formData.append("upload_preset", "my_custom_preset");

        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/dmmlobp9k/image/upload`,
          formData
        );
        newImageUrl = res.data.secure_url;
      }

      // Actualizar producto en backend
      await productService.update(productoEditando.id, {
        titulo: productoEditando.titulo,
        descripcion: productoEditando.descripcion,
        imagenUrl: newImageUrl,
      });

      setProductoEditando(null);
      mostrarMensaje("Producto actualizado correctamente.", "success");
      fetchProductos();
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      mostrarMensaje("Error al actualizar el producto.", "error");
    } finally {
      setEditLoading(false);
    }
  };

  const handleEditCancel = () => {
    setProductoEditando(null);
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  useEffect(() => {
    const resultado = productos.filter((producto) =>
      producto.titulo?.toLowerCase().includes(busqueda.toLowerCase())
    );
    setProductosFiltrados(resultado);
  }, [busqueda, productos]);

  return (
    <div>
      <Navbar />

      {mensaje.texto && (
        <div className={`admin-alert ${mensaje.tipo}`}>
          {mensaje.texto}
        </div>
      )}

      <div className="admin-buscador-contenedor">
        <input
          type="text"
          placeholder="Buscar productos..."
          className="admin-buscador-input"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <button
          onClick={() => setShowForm(!showForm)}
          className="admin-form-toggle-btn"
        >
          {showForm ? "Ocultar formulario" : "Agregar nuevo producto"}
        </button>
      </div>

      {showForm && !productoEditando && (
        <div className="admin-product-form"  >
          <h2 className="admin-form-title">Agregar producto</h2>

          <div className="admin-form-input">
            <label htmlFor="title">Título del producto</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="admin-form-input">
            <label htmlFor="description">Descripción del producto</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="admin-form-input">
            <label htmlFor="image">Subir imagen</label>
            <input
              id="image"
              type="file"
              onChange={handleFileChange}
            />
          </div>

          <button
            onClick={handleUpload}
            className="admin-submit-btn"
            disabled={loading}
          >
            {loading ? "Subiendo..." : "Subir Imagen"}
          </button>
        </div>
      )}

      {productoEditando && (
        <div className="admin-product-form" ref={editFormRef}>
          <h2 className="admin-form-title">Editar producto</h2>

          <div className="admin-form-input">
            <label htmlFor="editTitle">Título</label>
            <input
              id="editTitle"
              type="text"
              value={productoEditando.titulo}
              onChange={(e) =>
                setProductoEditando({ ...productoEditando, titulo: e.target.value })
              }
            />
          </div>

          <div className="admin-form-input">
            <label htmlFor="editDescription">Descripción</label>
            <textarea
              id="editDescription"
              value={productoEditando.descripcion}
              onChange={(e) =>
                setProductoEditando({ ...productoEditando, descripcion: e.target.value })
              }
            />
          </div>

          <div className="admin-form-input">
            <label htmlFor="editImage">Cambiar imagen</label>
            <input
              id="editImage"
              type="file"
              onChange={handleEditFileChange}
            />
          </div>

          <div className="admin-image-preview">
            <h3>Imagen actual:</h3>
            <img src={editFile ? URL.createObjectURL(editFile) : editImageUrl} alt="preview" />
          </div>

          <button
            onClick={handleEditSave}
            className="admin-submit-btn"
            disabled={editLoading}
          >
            {editLoading ? "Guardando..." : "Guardar cambios"}
          </button>

          <button
            onClick={handleEditCancel}
            className="admin-cancel-btn"
          >
            Cancelar
          </button>
        </div>
      )}

      <div className="admin-productos-list">
        <h2>Listado de productos</h2>
        {productosFiltrados.length === 0 ? (
          <p>No se encontraron productos.</p>
        ) : (
          productosFiltrados.map(producto => (
            <div key={producto.id} className="admin-producto-card">
              <img
                src={producto.imagenUrl}
                alt={producto.titulo}
                className="admin-producto-img"
              />
              <div>
                <h3 className="admin-producto-title">{producto.titulo}</h3>
                <p className="admin-producto-description">{producto.descripcion}</p>
                <button onClick={() => handleEditInit(producto)} className="admin-btn edit-btn">Editar</button>
                <button onClick={() => handleDelete(producto.id)} className="admin-btn delete-btn">Eliminar</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
