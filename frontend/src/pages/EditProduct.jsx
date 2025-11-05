import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import "../estilos/EditProduct.css";
import HeaderAdmin from "../componentes/HeaderAdmin";
import Footer from "../componentes/Footer";

export default function EditProduct() {
  const { id } = useParams(); // ID desde la URL
  const navigate = useNavigate();
  const { getProduct, updateProduct } = useProducts(); // funciones del contexto

  const [product, setProduct] = useState({
    nombre_producto: "",
    categoria: "",
    precio: "",
    descripcion: "",
  });

  const [preview, setPreview] = useState(null); // vista previa
  const [newImage, setNewImage] = useState(null); // imagen seleccionada

  // 🟢 Cargar producto existente
  useEffect(() => {
    const loadProduct = async () => {
      const data = await getProduct(id);
      if (data) {
        setProduct({
          nombre_producto: data.nombre_producto || "",
          categoria: data.categoria || "",
          precio: data.precio || "",
          descripcion: data.descripcion || "",
        });
        if (data.imagen) {
          setPreview(`http://localhost:5000${data.imagen}`);
        }
      }
    };
    loadProduct();
  }, [id, getProduct]);

  // 🟢 Manejar cambios en campos
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // 🟢 Manejar cambio de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // 🟢 Enviar formulario con FormData
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("nombre_producto", product.nombre_producto);
      formData.append("categoria", product.categoria);
      formData.append("precio", product.precio);
      formData.append("descripcion", product.descripcion);
      if (newImage) {
        formData.append("imagen", newImage);
      }

      await updateProduct(id, formData);
      navigate("/product-list");
    } catch (error) {
      console.error("Error al actualizar producto:", error);
    }
  };

  return (
    <>
      <HeaderAdmin />
      <div className="edit-container">
        <h1 className="edit-title">Editar Producto</h1>

        <form
          className="edit-form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          {/* 🖼️ Imagen actual o nueva */}
          <label htmlFor="imagen">Imagen del Producto</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />

          {preview && (
            <div className="preview-container">
              <img
                src={preview}
                alt="Vista previa"
                className="imagen-preview"
              />
            </div>
          )}

          <label>Nombre del producto</label>
          <input
            type="text"
            name="nombre_producto"
            value={product.nombre_producto}
            onChange={handleChange}
            required
          />

          <label>Categoría</label>
          <input
            type="text"
            name="categoria"
            value={product.categoria}
            onChange={handleChange}
          />

          <label>Precio</label>
          <input
            type="number"
            name="precio"
            value={product.precio}
            onChange={handleChange}
            required
          />

          <label>Descripción</label>
          <textarea
            name="descripcion"
            value={product.descripcion}
            onChange={handleChange}
          />

          <div className="edit-buttons">
            <button type="submit" className="btn-save">
              Guardar cambios
            </button>
            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate("/product-list")}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
