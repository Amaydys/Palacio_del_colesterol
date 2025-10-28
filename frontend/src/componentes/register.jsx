import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { registerRequest } from "../api/Auth";

function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("⚠️ Las contraseñas no coinciden");
      return;
    }

    try {
      // ✅ Enviar los datos al backend
      const res = await registerRequest({
        username: form.username,
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword,
        phone: form.phone,
      });
      const data = res.data;

      if (data.token) {
        alert("✅ Cuenta creada exitosamente");
        console.log("Token recibido:", data.token);
      } else {
        alert(
          "❌ Error al registrar: " + (data.message || "Intenta nuevamente")
        );
      }
    } catch (error) {
      console.error(
        "Error en el registro:",
        error.response?.data || error.message
      );
      alert(
        "❌ Error al registrar: " +
          (error.response?.data?.message ||
            "Verifica los campos e intenta nuevamente")
      );
    }
  };
  return (
    <>
      <Header />
      <main
        className="uk-section uk-flex uk-flex-center uk-flex-middle"
        style={{ minHeight: "calc(100vh - 200px)", background: "#f7f7f7" }}
      >
        <div
          className="uk-card uk-card-default uk-card-body uk-border-rounded"
          style={{ width: 400 }}
        >
          <div className="uk-text-center">
            <Link to="/">
              <img src="/logo.png" alt="Logo" width="100" />
            </Link>
            <h3>Crear Cuenta</h3>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="uk-margin">
              <input
                className="uk-input"
                type="email"
                name="email"
                placeholder="Correo electrónico"
                required
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
                onChange={handleChange}
              />
            </div>

            <div className="uk-margin">
              <input
                className="uk-input"
                type="password"
                name="confirmPassword"
                placeholder="Repetir contraseña"
                required
                value={form.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <div className="uk-margin">
              <input
                className="uk-input"
                type="text"
                name="username"
                placeholder="Nombre de usuario"
                required
                onChange={handleChange}
              />
            </div>

            <div className="uk-margin">
              <input
                className="uk-input"
                type="tel"
                name="phone"
                placeholder="Teléfono"
                required
                onChange={handleChange}
              />
            </div>

            <div className="uk-margin">
              <label>
                <input className="uk-checkbox" type="checkbox" required />{" "}
                Acepto los <a href="#">términos y condiciones</a>
              </label>
            </div>

            <div className="uk-margin">
              <button className="uk-button uk-button-primary uk-width-1-1">
                Crear Cuenta
              </button>
            </div>

            <p className="uk-text-small uk-text-center">
              ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Register;
