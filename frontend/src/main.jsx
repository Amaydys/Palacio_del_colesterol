import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // <-- asegúrate de importar esto
import "uikit/dist/css/uikit.min.css";
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
UIkit.use(Icons);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
