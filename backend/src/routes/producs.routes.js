import * as productsCtrl from "../controllers/products.controller.js";
import { authRequired, isAdmin } from "../middlewares/valideteToken.js"; // ojo: corrige el nombre del archivo
import { Router } from "express";
import upload from "../middlewares/upload.js";

const router = Router();

router.get("/products", productsCtrl.getProducts);
router.get("/products/:id", productsCtrl.getProductById);
router.post(
  "/products",
  authRequired,
  isAdmin,
  upload.single("imagen"),
  productsCtrl.createProduct
);

// actualizar - imagen opcional
router.put(
  "/products/:id",
  authRequired,
  isAdmin,
  upload.single("imagen"),
  productsCtrl.updateProduct
);
router.delete(
  "/products/:id",
  authRequired,
  isAdmin,
  productsCtrl.deleteProduct
);

export default router;
