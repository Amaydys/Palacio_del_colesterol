import React from "react";
import HeaderAdmin from "../componentes/HeaderAdmin";
import Footer from "../componentes/Footer";
import "../estilos/admin.css";
export default function Navbar() {
  return (
    <>
      <div className="page-layout">
        <HeaderAdmin />
        <main className="content-space"></main>
        <Footer />
      </div>
    </>
  );
}
