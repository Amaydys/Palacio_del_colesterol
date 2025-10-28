import User from "../models/user.js";
import bcrypt from "bcrypt";
import { createAccessToken } from "../libs/jwt.js";

/**
 * Registrar usuario
 */
export const register = async (req, res) => {
  console.log("Datos recibidos del frontend:", req.body);
  const { email, password, confirmPassword, username, phone, rol } = req.body;

  if (!email || !password || !confirmPassword || !username || !phone) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Las contraseñas no coinciden" });
  }
  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Usuario ya existe" });

    // Encriptar contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    // Crear usuario
    const newUser = new User({
      username,
      email,
      password: passwordHash,
      phone,
      rol: rol || "usuario",
    });

    const savedUser = await newUser.save();

    // Generar token
    const token = await createAccessToken({
      id: savedUser._id,
      rol: savedUser.rol,
    });

    // Guardar token en cookie
    res.cookie("token", token, { httpOnly: true, sameSite: "lax" });

    // Respuesta con datos del usuario
    res.status(201).json({
      id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      phone: savedUser.phone,
      rol: savedUser.rol,
      message: "Usuario registrado exitosamente",
    });
  } catch (error) {
    console.error("❌ Error detallado al registrar usuario:", error);
    res
      .status(500)
      .json({ message: "Error al registrar usuario", error: error.message });
  }
};

/**
 * Login usuario
 */
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (!userFound)
      return res.status(400).json({ message: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch)
      return res.status(400).json({ message: "Contraseña incorrecta" });

    // Generar token (incluye rol si lo tienes en el modelo)
    const token = await createAccessToken({
      id: userFound._id,
      rol: userFound.rol,
    });

    // Guardar token en cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 día
    });

    // Respuesta con datos del usuario
    res.json({
      message: "Inicio de sesión exitoso",
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      phone: userFound.phone,
      rol: userFound.rol,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el login" });
  }
};

/**
 * Logout usuario (frontend elimina la cookie)
 */
export const logout = async (req, res) => {
  res.cookie("token", "", { expires: new Date(0), httpOnly: true });
  res.status(200).json({ message: "Sesión cerrada correctamente" });
};

/**
 * Perfil protegido
 */
export const profile = async (req, res) => {
  try {
    const userFound = await User.findById(req.user.id);
    if (!userFound)
      return res.status(400).json({ message: "Usuario no encontrado" });

    // Solo muestra los datos, no genera token
    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      phone: userFound.phone,
      rol: userFound.rol,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener perfil" });
  }
};
