import express from 'express';
import { getProducts, getUserProducts, createProduct, updateProduct, deleteProduct } from '../controllers/product.controller.js';
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get('/', getProducts);
router.get('/user', protect, getUserProducts);
router.post('/', protect, createProduct);
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);

export default router;