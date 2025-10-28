import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
// import Cookies from "js-cookie"; // no usar para httpOnly cookies

export const AuthContext = createContext();
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true); // <-- definir loading

  const signup = async (userData) => {
    try {
      const res = await registerRequest(userData);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error.response);
      setErrors(error.response?.data || ["Error en el registro"]);
    }
  };

  const signin = async (credentials) => {
    try {
      await loginRequest(credentials);
      const profileRes = await verifyTokenRequest();
      setUser(profileRes.data);
      setIsAuthenticated(true);
      setErrors([]);
      return profileRes.data;
    } catch (error) {
      console.log(error);
      setIsAuthenticated(false);
      setUser(null);
      if (Array.isArray(error.response?.data)) {
        setErrors(error.response.data);
      } else {
        setErrors([error.response?.data?.message || "Error al iniciar sesión"]);
      }
      throw error;
    }
  };

  const logout = async () => {
    try {
      // opcional: llamar endpoint logout para limpiar cookie en backend
      await fetch("http://localhost:5000/api/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch {}
    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => setErrors([]), 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    async function checklogin() {
      setLoading(true);
      try {
        // verityTokenRequest debe hacer la petición al servidor con credentials
        const res = await verifyTokenRequest(); // no dependa de Cookies.get (httpOnly)
        if (res?.data) {
          setUser(res.data);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }
    checklogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        logout,
        user,
        isAuthenticated,
        errors,
        loading, // <-- exportar loading para controlar render en Navbar
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
