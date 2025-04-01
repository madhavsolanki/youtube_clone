import express from "express";
import { upload } from "../config/multer.js";
import {
  createChannel,
  deleteChannel,
  getAllChannels,
  getChannelById,
  getUserData,
  updateChannel,
  updateUserProfile,
  uploadProfilePicture,
} from "../controllers/user.controller.js";
import { isUserAuthenticated } from "../middlewares/auth.middleware.js";
import { uploadChannelImage } from "../config/multer.js";

const router = express.Router();

router.put(
  "/upload-profile-picture",
  isUserAuthenticated,
  upload.single("profilePicture"),
  uploadProfilePicture
);

router.put("/update-profile", isUserAuthenticated, updateUserProfile);

router.get("/data", isUserAuthenticated, getUserData);

// --------------------  Channel Routes ----------------------
router.post("/create-channel", isUserAuthenticated, createChannel);

router.put(
  "/update/:channelId",
  isUserAuthenticated,
  uploadChannelImage.fields([  // Handle multiple file uploads
    { name: "channelIcon", maxCount: 1 },
    { name: "bannerImage", maxCount: 1 }
  ]),
  updateChannel
);

router.delete("/delete/:channelId", isUserAuthenticated, deleteChannel);
router.get("/channel", isUserAuthenticated, getAllChannels);
router.get("/channel/:channelId", isUserAuthenticated, getChannelById);

export default router;
