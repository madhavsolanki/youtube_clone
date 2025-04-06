import express from "express";
import { isUserAuthenticated } from "../middlewares/auth.middleware.js";
import { uploadVideoFiles } from "../config/multer.js";
import { getAllVideos, getVideoById, updateVideo, uploadVideo } from "../controllers/video.controller.js";

const router = express.Router();

router.post("/upload", isUserAuthenticated, uploadVideoFiles, uploadVideo);

router.put("/update/:id", isUserAuthenticated, uploadVideoFiles, updateVideo);

router.get("/all", isUserAuthenticated, getAllVideos);
router.get("/:id", isUserAuthenticated, getVideoById);

export default router;