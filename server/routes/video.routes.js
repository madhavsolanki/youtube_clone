import express from "express";
import { isUserAuthenticated } from "../middlewares/auth.middleware.js";
import { uploadVideoFiles } from "../config/multer.js";
import {
  getAllVideos,
  getVideoById,
  getVideosByCategory,
  getVideosByChannel,
  updateVideo,
  uploadVideo,
} from "../controllers/video.controller.js";

const router = express.Router();

router.post(
  "/upload/:channelId",
  isUserAuthenticated,
  uploadVideoFiles,
  uploadVideo
);

router.put("/update/:id", isUserAuthenticated, uploadVideoFiles, updateVideo);

router.get("/all", isUserAuthenticated, getAllVideos);
router.get("/:id", isUserAuthenticated, getVideoById);

router.get("/category/:categoryId", isUserAuthenticated, getVideosByCategory);
router.get("/channel/:channelId", isUserAuthenticated, getVideosByChannel);

export default router;
