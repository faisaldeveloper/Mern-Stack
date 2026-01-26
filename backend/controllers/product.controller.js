import mongoose from 'mongoose';
import Product from '../models/product.model.js';

export const getProducts = async (req, res) => {
	try {
	const products = await Product.find({});
	res.status(200).json({ success: true, data: products });
	} catch (error) {
		console.error("Server Error: ", error.message);
		res.status(500).json({ success: false, message: 'Server Error' });
	}	
};

export const createProduct = async (req, res) => {
	const product = req.body;
		
	if(!product.name || !product.price || !product.description || !product.image){ 
		return res.status(400).json({ success: false, message: 'All fields are required' });	
	}

	const newProduct = new Product(product);
	try {
		await newProduct.save();
		res.status(201).json({ success: true, data: newProduct });
	} catch (error) {
		console.error("Server Error: ", error.message);
		res.status(500).json({ success: false, message: 'Server Error' });
	}
};

export const updateProduct = async (req, res) => {
	const { productId } = req.params;
	const updates = req.body;

	try {
		const updatedProduct = await Product.findByIdAndUpdate(productId, updates, { new: true });
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
		const deletedProduct = await Product.findByIdAndDelete(id);
		if (!deletedProduct) {
			return res.status(404).json({ success: false, message: 'Product not found' });
		}
		res.status(200).json({ success: true, message: 'Product deleted successfully' });
	} catch (error) {
		console.error("Server Error: ", error.message);
		res.status(500).json({ success: false, message: 'Server Error' });
	}
};




