import express from 'express';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/product.controller.js';
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get('/', getProducts);
router.post('/', protect, createProduct);
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);

export default router;