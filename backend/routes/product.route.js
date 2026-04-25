import express from 'express';
import { getUserProducts, createProduct, updateProduct, deleteProduct, getAllProducts, updateAnyProduct, deleteAnyProduct } from '../controllers/product.controller.js';
import { protect, adminOnly } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/user', protect, getUserProducts);
router.post('/', protect, createProduct);
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);
router.get('/admin', protect, adminOnly, getAllProducts);
router.put('/admin/:id', protect, adminOnly, updateAnyProduct);
router.delete('/admin/:id', protect, adminOnly, deleteAnyProduct);

export default router;