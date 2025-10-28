import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const authRequired = (req, res, next) => {
  const token =
    req.cookies?.token ||
    (req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : null);
  if (!token)
    return res
      .status(401)
      .json({ message: " Access denied. No token provided " });
  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};
