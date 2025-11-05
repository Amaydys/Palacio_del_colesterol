import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext"; // 👈 importa tu ProductProvider

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ProductProvider>
        {" "}
        {/* 👈 envuelve aquí */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ProductProvider>
    </AuthProvider>
  </React.StrictMode>
);
