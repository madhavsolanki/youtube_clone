import express from "express";
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from "../controllers/category.controller.js";
import { isUserAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Admmin Specific Routes
router.post("/", isUserAuthenticated, createCategory);
router.put("/:id", isUserAuthenticated, updateCategory);
router.delete("/:id", isUserAuthenticated, deleteCategory);

// Logged in user Routes
router.get("/", isUserAuthenticated, getAllCategories);
router.get("/:id", isUserAuthenticated, getCategoryById);

export default router;