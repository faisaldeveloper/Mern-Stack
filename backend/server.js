import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';
//const authRoutes = require("./routes/auth.route.js");
import authRoutes from './routes/auth.route.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use('/api/products', productRoutes);

app.listen(PORT, () => {
	connectDB();
	console.log(`Server is running on port ${PORT}`);
});


