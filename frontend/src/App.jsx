import { Routes, Route, BrowserRouter } from "react-router-dom";
import Tienda from "./componentes/Tienda";
import "uikit/dist/css/uikit.min.css";
import Empanadas from "./pages/Empanadas";
import Hamburguesa from "./pages/Hamburguesa";
import Papas from "./pages/Papas";
import Pasteles from "./pages/Pasteles";
import Caliente from "./pages/Caliente";
import Picada from "./pages/Picada";
import Pollo from "./pages/Pollo";
import Relleno from "./pages/Relleno";
import Inicio from "./componentes/Inicio";
import Login from "./componentes/login";
import Register from "./componentes/register";
import Navbar from "./componentes/Navbar";
import Admin from "./componentes/Admin";
import AddProduct from "./pages/AddProduct";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/empanadas" element={<Empanadas />} />
      <Route path="/hamburguesa" element={<Hamburguesa />} />
      <Route path="/papas" element={<Papas />} />
      <Route path="/pasteles" element={<Pasteles />} />
      <Route path="/caliente" element={<Caliente />} />
      <Route path="/picada" element={<Picada />} />
      <Route path="/pollo" element={<Pollo />} />
      <Route path="/relleno" element={<Relleno />} />
      <Route path="/tienda" element={<Tienda />} />
      <Route path="/Navbar" element={<Navbar />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/add-product" element={<AddProduct />} />
    </Routes>
  );
}

export default App;
