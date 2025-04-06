import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import videoRoutes from "./routes/video.routes.js";

// Load environment variables from.env file
dotenv.config();

const app = express();
const port = process.env.PORT || 5500;

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173', // Your React app's URL
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Database connection
connectDB();

// Basic route
app.get('/', (req, res) => {
  res.send('YouTube Clone API is running');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/video", videoRoutes);