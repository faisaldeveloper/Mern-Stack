import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';
import authRoutes from './routes/auth.route.js';

dotenv.config();

console.log("SERVER FILE LOADED");

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

// Middleware
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, 'frontend/dist')));

	app.get(/^(?!\/api).+/, (req, res) => {
		res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
	});
}



app.listen(PORT, async () => {
	await connectDB();
	console.log(`Server is running locally on port ${PORT}`);
});


