import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Cargar productos
  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/products");
      setProducts(res.data || []);
    } catch (error) {
      console.error("Error loading products:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // 🔹 Crear producto (con imagen)
  const createProduct = async (formData) => {
    try {
      const res = await api.post("/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProducts((prev) => [res.data, ...prev]);
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  };

  // 🔹 Obtener producto por ID
  const getProduct = async (id) => {
    try {
      const res = await api.get(`/products/${id}`);
      return res.data;
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error;
    }
  };

  // 🔹 Actualizar producto (con o sin nueva imagen)
  const updateProduct = async (id, formData) => {
    try {
      const res = await api.put(`/products/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProducts((prev) => prev.map((p) => (p._id === id ? res.data : p)));
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  };

  // 🔹 Eliminar producto
  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        loadProducts,
        createProduct,
        getProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
