import "../estilos/Inicio.css";
import "uikit/dist/css/uikit.min.css";
import Footer from "../componentes/Footer";
import UIkit from "uikit";
import { Link } from "react-router-dom";
import "../estilos/Tienda.css";
import logo from "../img/Palaciodelcolesterollogogrande1Iniciarsesion.png";
import plato from "../img/Heroimage.jpg";
import ingredientes from "../img/Card1image.jpg";
import especias from "../img/Card2image.jpg";
import carnes from "../img/Card3.jpg";
import prod1 from "../img/Destacados1.jpg";
import prod2 from "../img/Destacados2.jpg";
import prod3 from "../img/Destacados3.jpg";
import prod4 from "../img/Destacados4.jpg";
import prod5 from "../img/Destacados5.jpg";
import prod6 from "../img/Destacados6.jpg";
import prod7 from "../img/Destacados7.jpg";
import prod8 from "../img/Destacados8.jpg";
import pagos from "../img/formas_pago.jpg";
import domicilio from "../img/domicilio.jpg";
import servicio from "../img/atencion_cliente.jpg";
import fondoComida from "../img/comida_rapida.png";
import Header from "./Header";
const productos = [
  { nombre: "Empanadas", imagen: prod1 },
  { nombre: "Calzone", imagen: prod2 },
  { nombre: "Buñuelos", imagen: prod3 },
  { nombre: "Pasteles", imagen: prod4 },
  { nombre: "Papa Rellena", imagen: prod5 },
  { nombre: "Arepa de huevo", imagen: prod6 },
  { nombre: "Dedos", imagen: prod7 },
  { nombre: "Pollo a la broaster", imagen: prod8 },
];

export default function Inicio() {
  return (
    <>
      <Header />
      <main>
        <section
          className="uk-section uk-section-default"
          style={{
            backgroundImage: `linear-gradient(
      rgba(255, 255, 255, 0.6), 
      rgba(255, 255, 255, 0.6)
    ), url(${fondoComida})`,
            backgroundSize: "cover",
            backgroundPosition: "center right",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed", // efecto elegante al hacer scroll
            padding: "80px 0",
            color: "#2b2b2b",
          }}
        >
          <div className="uk-container">
            <div
              className="uk-grid-large uk-child-width-1-2@m uk-flex-middle uk-flex-center"
              uk-grid=""
            >
              <div>
                <h1 className="uk-heading-medium">
                  ¿Ya decidiste que te vas a{" "}
                  <span className="uk-text-danger">comer hoy?</span>
                </h1>
                <p>
                  <b>
                    ¡Date un gusto hoy! Disfruta nuestras comidas rápidas recién
                    preparadas, con el sabor que tanto te gusta y domicilio
                    incluido.
                  </b>
                </p>
                <a href="/Tienda">
                  <button className="uk-button uk-button-primary uk-border-pill">
                    Compra Ahora
                  </button>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="uk-section uk-section-muted">
          <div className="uk-container">
            <h2 className="uk-text-center">
              Solo usamos lo <span style={{ color: "#5f259f" }}>mejor</span>!
            </h2>
            <div
              className="uk-grid-match uk-child-width-1-3@m uk-margin"
              uk-grid="true"
            >
              <a
                href="/login"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div
                  className="uk-card uk-card-default uk-card-body uk-text-center uk-border-rounded"
                  style={{ cursor: "pointer" }}
                >
                  <h3>Ingredientes orgánicos</h3>
                  <img
                    src={ingredientes}
                    style={{
                      width: "100%",
                      height: "250px",
                      objectFit: "cover",
                    }}
                    alt="Ingredientes"
                    className="uk-border-rounded"
                  />
                </div>
              </a>

              <a
                href="/login"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div
                  className="uk-card uk-card-default uk-card-body uk-text-center uk-border-rounded"
                  style={{ cursor: "pointer" }}
                >
                  <h3>Mejores especias</h3>
                  <img
                    src={especias}
                    style={{
                      width: "100%",
                      height: "250px",
                      objectFit: "cover",
                    }}
                    alt="Especias"
                    className="uk-border-rounded"
                  />
                </div>
              </a>

              <a
                href="/login"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div
                  className="uk-card uk-card-default uk-card-body uk-text-center uk-border-rounded"
                  style={{ cursor: "pointer" }}
                >
                  <h3>Carnes frescas</h3>
                  <img
                    src={carnes}
                    style={{
                      width: "100%",
                      height: "250px",
                      objectFit: "cover",
                    }}
                    alt="Carnes"
                    className="uk-border-rounded"
                  />
                </div>
              </a>
            </div>
          </div>
        </section>
        <section className="uk-section" style={{ backgroundColor: "#FFF5E6" }}>
          <div className="uk-container">
            <h2 className="uk-text-center">Destacados</h2>

            <div
              className="uk-child-width-1-4@m uk-grid-small uk-flex-center"
              uk-grid="true"
            >
              {productos.map((producto, idx) => (
                <div key={idx}>
                  <Link to="/Tienda">
                    <div className="uk-card uk-card-default uk-card-body uk-text-center uk-border-rounded uk-transition-toggle">
                      <div
                        style={{
                          backgroundColor: "#fff",
                          padding: "8px",
                          borderRadius: "80%",
                          display: "inline-block",
                          marginBottom: "10px",
                        }}
                      >
                        <img
                          src={producto.imagen}
                          alt={producto.nombre}
                          className="uk-border-circle"
                          style={{
                            width: "150px",
                            height: "150px",
                            objectFit: "cover",
                            cursor: "pointer",
                            borderRadius: "50%",
                          }}
                        />
                      </div>
                      <h4 className="uk-text-bold" style={{ color: "#5f259f" }}>
                        {producto.nombre}
                      </h4>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="uk-section uk-section-muted">
          <div className="uk-container">
            <h2 className="uk-text-center">
              Elegibilidad para domicilio,{" "}
              <span style={{ color: "#5f259f" }}>métodos de pago</span>, etc..
            </h2>
            <div
              className="uk-grid-match uk-child-width-1-3@m uk-margin-top"
              uk-grid="true"
            >
              <div>
                <div className="uk-card uk-card-default uk-card-body uk-text-center">
                  <h3>Domicilio</h3>
                  <p>Elegibilidad domicilio para todo Neiva y el Huila</p>
                  <a href="/login" className="image-link">
                    <img
                      style={{
                        width: "100%",
                        height: "250px",
                        objectFit: "cover",
                      }}
                      src={domicilio}
                      alt="Domicilio"
                    />
                  </a>
                </div>
              </div>
              <div>
                <div className="uk-card uk-card-default uk-card-body uk-text-center">
                  <h3>Métodos de pago</h3>
                  <p>
                    Aceptamos todos los medios de pago. Tarjeta de credito,
                    debito, efectivo, etc.
                  </p>
                  <a href="/login" className="image-link">
                    <img
                      style={{
                        width: "100%",
                        height: "250px",
                        objectFit: "cover",
                      }}
                      src={pagos}
                      alt="Pagos"
                    />
                  </a>
                </div>
              </div>
              <div>
                <div className="uk-card uk-card-default uk-card-body uk-text-center">
                  <h3>Servicio al cliente</h3>
                  <p>
                    Si necesitas ayuda sobre un pedido grande, con gusto te
                    ayudaremos.
                  </p>
                  <a href="/login" className="image-link">
                    <img
                      style={{
                        width: "100%",
                        height: "250px",
                        objectFit: "cover",
                      }}
                      src={servicio}
                      alt="Servicio"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
