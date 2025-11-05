import React from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import "../estilos/ProductCard.css";

function ProductCard({ product }) {
  const { deleteProduct } = useProducts();
  const navigate = useNavigate();

  if (!product) {
    return <div className="loading">Cargando producto...</div>;
  }

  const handleEdit = (id) => {
    navigate(`/products/${id}`);
  };
  const imageUrl = product.imagen
    ? `http://localhost:5000${product.imagen}`
    : "https://via.placeholder.com/200x200?text=Sin+imagen";
  return (
    <div className="product-card">
      <div className="image-container">
        <img
          src={imageUrl}
          alt={product.nombre_producto}
          className="product-image"
        />
      </div>
      <h2 className="product-name">{product.nombre_producto}</h2>

      <p>
        <strong>Categoría:</strong> {product.categoria || "Sin categoría"}
      </p>
      <p>
        <strong>Precio:</strong> ${product.precio?.toLocaleString("es-CO")}
      </p>
      <p>
        <strong>Descripción:</strong> {product.descripcion || "Sin descripción"}
      </p>

      <div className="button-container">
        <button
          className="btn-delete"
          onClick={() => deleteProduct(product._id)}
        >
          Eliminar
        </button>
        <button className="btn-edit" onClick={() => handleEdit(product._id)}>
          Editar
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
