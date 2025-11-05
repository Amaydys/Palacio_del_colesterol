import axios from "axios";

const API_URL = "http://localhost:5000/api";

// ⚙️ Crear instancia de axios para no repetir configuración
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // para enviar cookies (token)
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * 📦 Autenticación y usuario
 */
export const registerRequest = (user) => api.post("/register", user);

export const loginRequest = (user) => api.post("/login", user);

export const verifyTokenRequest = () => api.get("/profile");

export const logoutRequest = () => api.post("/logout");

/**
 * 📦 Productos (CRUD)
 */
export const createProductRequest = (product) => api.post("/products", product);

export const getProductsRequest = () => api.get("/products");

export const getProductRequest = (id) => api.get(`/products/${id}`);

export const updateProductRequest = (id, product) =>
  api.put(`/products/${id}`, product);

export const deleteProductRequest = (id) => api.delete(`/products/${id}`);
