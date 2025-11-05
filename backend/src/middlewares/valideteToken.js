import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

const getToken = (req) =>
  req.cookies?.token ||
  (req.headers.authorization ? req.headers.authorization.split(" ")[1] : null);

export const authRequired = (req, res, next) => {
  const token = getToken(req);
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided" });
  try {
    const payload = jwt.verify(token, TOKEN_SECRET);
    req.user = payload; // debe contener rol, _id, username...
    return next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

export const isAdmin = (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: "Not authenticated" });
  if (req.user.rol !== "admin")
    return res
      .status(403)
      .json({ message: "Acceso denegado: se requiere rol de administrador." });
  next();
};
