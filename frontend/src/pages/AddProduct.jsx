import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import "../estilos/productoform.css";
import Footer from "../componentes/Footer";
import HeaderAdmin from "../componentes/HeaderAdmin";

export default function AddProduct() {
  const { register, handleSubmit, setValue, reset } = useForm();
  const { createProduct, getProduct, updateProduct } = useProducts();
  const params = useParams();

  const [mensaje, setMensaje] = useState("");
  const [preview, setPreview] = useState(null); // Previsualización de imagen

  // Si es edición, cargar datos del producto existente
  useEffect(() => {
    async function loadProduct() {
      if (params.id) {
        const producto = await getProduct(params.id);
        if (producto) {
          setValue("nombre_producto", producto.nombre_producto);
          setValue("categoria", producto.categoria);
          setValue("precio", producto.precio);
          setValue("descripcion", producto.descripcion);

          // Mostrar imagen actual si existe
          if (producto.imagen) {
            // Si el backend guarda solo el nombre, agrega la ruta completa:
            const imageUrl = producto.imagen.startsWith("http")
              ? producto.imagen
              : `http://localhost:5000/uploads/${producto.imagen}`;
            setPreview(imageUrl);
          }
        }
      }
    }
    loadProduct();
  }, [params.id, setValue, getProduct]);

  // Manejar vista previa al seleccionar nueva imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  // Enviar formulario (crear o editar)
  const onSubmit = handleSubmit(async (data) => {
    try {
      const formData = new FormData();
      formData.append("nombre_producto", data.nombre_producto);
      formData.append("categoria", data.categoria);
      formData.append("precio", data.precio);
      formData.append("descripcion", data.descripcion);

      if (data.imagen && data.imagen[0]) {
        formData.append("imagen", data.imagen[0]);
      }

      if (params.id) {
        await updateProduct(params.id, formData);
        setMensaje("✅ Producto actualizado con éxito");
      } else {
        await createProduct(formData);
        setMensaje("✅ Producto guardado con éxito");
      }

      reset();
      setPreview(null);

      setTimeout(() => setMensaje(""), 3000);
    } catch (error) {
      console.error("Error al guardar el producto:", error);
      setMensaje("❌ Error al guardar el producto");
      setTimeout(() => setMensaje(""), 4000);
    }
  });

  return (
    <>
      <HeaderAdmin />

      <div className="form-container">
        <form
          className="form-producto"
          onSubmit={onSubmit}
          encType="multipart/form-data"
        >
          {/* Mensaje de éxito o error */}
          {mensaje && <p className="mensaje-exito">{mensaje}</p>}

          {/* 📸 Imagen del producto */}
          <label htmlFor="imagen">Imagen del Producto</label>
          <input
            type="file"
            accept="image/*"
            {...register("imagen")}
            onChange={handleImageChange}
          />

          {preview && (
            <div className="preview-container">
              <img
                src={preview}
                alt="Vista previa"
                className="imagen-preview"
              />
            </div>
          )}

          {/* 🧾 Nombre */}
          <label htmlFor="nombre_producto">Nombre del Producto</label>
          <input
            type="text"
            placeholder="Ingrese el nombre del producto"
            {...register("nombre_producto", { required: true })}
          />

          {/* 📂 Categoría */}
          <label htmlFor="categoria">Categoría</label>
          <input
            type="text"
            placeholder="Ejemplo: Pollo, Hamburguesa..."
            {...register("categoria", { required: true })}
          />

          {/* 💰 Precio */}
          <label htmlFor="precio">Precio</label>
          <input
            type="number"
            step="0.01"
            placeholder="Ingrese el precio"
            {...register("precio", { required: true })}
          />

          {/* 📝 Descripción */}
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            rows="3"
            placeholder="Ingrese una breve descripción"
            {...register("descripcion")}
          ></textarea>

          <button type="submit" className="btn-guardar">
            Guardar Producto
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
}
