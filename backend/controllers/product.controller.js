import Product from '../models/product.model.js';
import { productSchema } from '../validators/product.validator.js';

export const getProducts = async (req, res) => {
	try {
	const products = await Product.find({});
	res.status(200).json({ success: true, data: products });
	} catch (error) {
		console.error("Server Error: ", error.message);
		res.status(500).json({ success: false, message: 'Server Error' });
	}	
};

export const getUserProducts = async (req, res) => {
	try {
		if (!req.user) {
			return res.status(401).json({ success: false, message: 'Not authenticated' });
		}
		const products = await Product.find({ user: req.user._id });
		res.status(200).json({ success: true, data: products });
	} catch (error) {
		console.error("Server Error: ", error.message);
		res.status(500).json({ success: false, message: 'Server Error' });
	}	
};

export const createProduct = async (req, res) => {
	const product = req.body;

	const result = productSchema.safeParse(req.body);
	if (!result.success) {
		return res.status(400).json({ success: false, message: result.error.issues[0].message });
	}
	
	const newProduct = new Product({ ...product, user: req.user._id });
	try {
		await newProduct.save();
		res.status(201).json({ success: true, data: newProduct });
	} catch (error) {
		console.error("Server Error: ", error.message);
		res.status(500).json({ success: false, message: 'Server Error' });
	}
};

export const updateProduct = async (req, res) => {
	const { id } = req.params;
	const updates = req.body;

	const result = productSchema.safeParse(req.body);
	if (!result.success) {
		return res.status(400).json({ success: false, message: result.error.issues[0].message });
	}

	try {
		const product = await Product.findById(id);
		if (!product) {
			return res.status(404).json({ success: false, message: 'Product not found' });
		}
		if (product.user.toString() !== req.user._id.toString()) {
			return res.status(403).json({ success: false, message: 'Not authorized to update this product' });
		}
		const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true });
		if (!updatedProduct) {
			return res.status(404).json({ success: false, message: 'Product not found' });
		}
		res.status(200).json({ success: true, data: updatedProduct });
	} catch (error) {
		console.error("Server Error: ", error.message);
		res.status(500).json({ success: false, message: 'Server Error' });
	}
};

export const deleteProduct = async (req, res) => {
	const { id } = req.params;
	try {
		const product = await Product.findById(id);
		if (!product) {
			return res.status(404).json({ success: false, message: 'Product not found' });
		}
		if (product.user.toString() !== req.user._id.toString()) {
			return res.status(403).json({ success: false, message: 'Not authorized to delete this product' });
		}
		const deletedProduct = await Product.findByIdAndDelete(id);
		res.status(200).json({ success: true, message: 'Product deleted successfully' });
	} catch (error) {
		console.error("Server Error: ", error.message);
		res.status(500).json({ success: false, message: 'Server Error' });
	}
};




