// ...existing code...
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import coldImg from "../img/Logopropio.jpg";
import Footer from "../componentes/Footer";

export default function Navbar() {
  const { isAuthenticated, logout, user, loading } = useAuth();
  const navigate = useNavigate();
  console.log("Navbar auth:", { isAuthenticated, user });

  if (loading) return null; // evita parpadeo hasta confirmar sesión
  const handleLogout = async () => {
    try {
      await logout(); // espera si logout hace peticiones
    } catch (e) {
      // opcional: manejar error
    }
    navigate("/"); // redirige al inicio después de cerrar sesión
  };
  return (
    // ...existing JSX...
    <>
      {/* Header */}
      <header className="flex items-center justify-between bg-zinc-700 px-8 py-4 rounded-lg my-3">
        {/* Logo y nombre */}
        <div className="flex items-center space-x-3">
          <Link to={isAuthenticated ? "/admin" : "/"}>
            <img
              src={coldImg}
              alt="Logo"
              className="rounded-full"
              height="50px"
              width="50px"
            />
          </Link>
          <span className="text-white text-2xl font-bold custom-font">
            PaCo
          </span>
        </div>

        {/* Navegación */}
        <nav>
          <ul className="flex items-center gap-x-4 text-white">
            {isAuthenticated ? (
              <>
                <li>
                  <span className="text-gray-300">
                    Bienvenido {user?.username}
                    {user?.rol === "admin" ? " (Admin)" : ""}
                  </span>
                </li>
                {user?.rol === "admin" && (
                  <li>
                    <Link
                      to="/"
                      className="hover:text-indigo-400 transition-colors"
                    >
                      Ver Productos
                    </Link>
                  </li>
                )}

                {user?.rol === "admin" && (
                  <li>
                    <Link
                      to="/add-product"
                      className="bg-indigo-500 hover:bg-indigo-600 px-4 py-1 rounded-md"
                    >
                      Agregar Productos
                    </Link>
                  </li>
                )}
                <li>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded-md"
                  >
                    Cerrar sesión
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  to="/login"
                  className="bg-indigo-500 hover:bg-indigo-600 px-4 py-1 rounded-md"
                >
                  Iniciar sesión
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </header>

      <main className="min-h-[70vh]"></main>
    </>
  );
}
