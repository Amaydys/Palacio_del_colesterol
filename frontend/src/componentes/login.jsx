import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "../componentes/Footer";
import { useAuth } from "../context/AuthContext";
function Login() {
  const navigate = useNavigate();
  const { signin } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const user = await signin(form); // espera a que el contexto actualice el estado
      // user puede venir como retorno de signin o usar el estado desde useAuth
      const role = user?.rol ?? window.localStorage.getItem("rol") ?? null;
      alert("✅ Inicio de sesión exitoso");
      if (role === "admin") navigate("/admin");
      else navigate("/perfil");
    } catch (err) {
      console.error("Error en el login:", err);
      setError(err.response?.data?.message || "No se pudo iniciar sesión");
    }
  };

  return (
    <>
      <Header />
      <div
        className="uk-container uk-flex uk-flex-center uk-flex-middle"
        style={{ height: "100vh", background: "#f7f7f7" }}
      >
        <div
          className="uk-card uk-card-default uk-card-body uk-border-rounded"
          style={{ width: 350 }}
        >
          <div className="uk-text-center">
            <Link to="/">
              <img src="/logo.png" alt="Logo" width="100" />
            </Link>
            <h3>Iniciar Sesión</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="uk-margin">
              <input
                className="uk-input"
                type="email"
                name="email"
                placeholder="Correo electrónico"
                required
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div className="uk-margin">
              <input
                className="uk-input"
                type="password"
                name="password"
                placeholder="Contraseña"
                required
                value={form.password}
                onChange={handleChange}
              />
            </div>
            {error && (
              <div
                className="uk-alert-danger uk-text-center"
                uk-alert="true"
                style={{ padding: "10px", borderRadius: "8px" }}
              >
                <p>{error}</p>
              </div>
            )}

            <div className="uk-margin">
              <button className="uk-button uk-button-primary uk-width-1-1">
                Iniciar Sesión
              </button>
            </div>
            <p className="uk-text-small uk-text-center">
              ¿No tienes cuenta? <Link to="/register">Crea una</Link>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
