import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js"
import { auth } from "./middleware/auth.js";


import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true
}));


// Routes
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

app.use(notFound);
app.use(auth)

app.use(errorHandler);

// DB + Server
const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  } catch (e) {
    console.error("Failed to start server:", e);
    process.exit(1);
  }
};

start();
