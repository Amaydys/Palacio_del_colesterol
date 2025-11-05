import Product from "../models/product.js";
import path from "path";
import fs from "fs";

// 🟢 Obtener todos los productos
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos", error });
  }
};

// 🟢 Obtener un producto por ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Producto no encontrado" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener producto", error });
  }
};

// 🟢 Crear un nuevo producto (con imagen)
export const createProduct = async (req, res) => {
  try {
    const { nombre_producto, categoria, descripcion, precio } = req.body;

    let imagen = null;
    if (req.file) {
      // Guardamos la ruta relativa de la imagen
      imagen = `/uploads/${req.file.filename}`;
    }

    const newProduct = new Product({
      nombre_producto,
      categoria,
      descripcion,
      precio,
      imagen,
      creadoPor: req.user?.id || null,
    });

    await newProduct.save();
    res
      .status(201)
      .json({ message: "Producto creado exitosamente", newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear producto", error });
  }
};

// 🟢 Actualizar un producto (imagen opcional)
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio } = req.body;

    const product = await Product.findById(id);
    if (!product)
      return res.status(404).json({ message: "Producto no encontrado" });

    // Si se subió una nueva imagen, eliminamos la anterior
    if (req.file) {
      if (product.imagen) {
        const oldImagePath = path.join(process.cwd(), "public", product.imagen);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath); // elimina la imagen anterior
        }
      }
      product.imagen = `/uploads/${req.file.filename}`;
    }

    // Actualizamos los demás campos
    product.nombre = nombre || product.nombre;
    product.descripcion = descripcion || product.descripcion;
    product.precio = precio || product.precio;

    await product.save();
    res.json({ message: "Producto actualizado correctamente", product });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar producto", error });
  }
};

// 🟢 Eliminar un producto
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Producto no encontrado" });

    // Eliminar la imagen del servidor si existe
    if (product.imagen) {
      const imagePath = path.join(process.cwd(), "public", product.imagen);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar producto", error });
  }
};
