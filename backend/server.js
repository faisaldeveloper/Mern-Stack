import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import serverless from 'serverless-http';

import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';
import authRoutes from './routes/auth.route.js';

dotenv.config();

console.log("SERVER FILE LOADED");

const app = express();
const __dirname = path.resolve();

// Middleware
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Connect DB (IMPORTANT: do this outside listen)
connectDB();

// Frontend static (only when NOT running on Vercel)
const isVercel = process.env.VERCEL === "1";

if (process.env.NODE_ENV === 'production' && !isVercel) {
	app.use(express.static(path.join(__dirname, 'frontend/dist')));

	app.get(/^(?!\/api).+/, (req, res) => {
		res.sendFile(path.join(__dirname, 'frontend/dist', 'index.html'));
	});
}

// LOCAL DEVELOPMENT ONLY
if (!isVercel) {
	const PORT = process.env.PORT || 5000;

	app.listen(PORT, () => {
		console.log(`Server is running locally on port ${PORT}`);
	});
}

// VERCEL SERVERLESS EXPORT
export default serverless(app);