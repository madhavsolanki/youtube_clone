import Video from "../models/video.model.js";
import cloudinary from "../config/cloudinary.js";
import fs, { existsSync } from "fs";
import ffmpeg from "fluent-ffmpeg";
import Category from "../models/category.model.js";


// Assign cahhhel to Video and manage the db linking
export const uploadVideo = async (req, res) => {
  try {
    const { title, description, category, tags } = req.body;
    const { userId } = req.user;

    if (!title || !description || !category || !tags) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 2. Check category existence
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(404).json({
        success: false,
        message: "Invalid category ID. Category not found.",
      });
    }

    if (!req.files || !req.files.video || !req.files.thumbnail) {
      return res.status(400).json({
        success: false,
        message: "Video and Thumbnail are required",
      });
    }

    const videoPath = req.files.video[0].path;
    const thumbnailPath = req.files.thumbnail[0].path;

    // 1. Get Video Duration
    const duration = await new Promise((resolve, reject) => {
      ffmpeg.ffprobe(videoPath, (err, metadata) => {
        if (err) reject(err);
        else resolve(metadata.format.duration);
      });
    });

    // 2. Upload to Cloudinary
    const uploadedVideo = await cloudinary.uploader.upload(videoPath, {
      resource_type: "video",
      folder: "videos",
    });

    const uploadedThumbnail = await cloudinary.uploader.upload(thumbnailPath, {
      folder: "thumbnails",
    });

    // 3. Clean up local files
    fs.unlinkSync(videoPath);
    fs.unlinkSync(thumbnailPath);

    // 4. Save to DB
    const video = new Video({
      title,
      description,
      category,
      tags: tags ? tags.split(",") : [],
      uploader: userId,
      duration,
      video: {
        url: uploadedVideo.secure_url,
        publicId: uploadedVideo.public_id,
      },
      thumbnail: {
        url: uploadedThumbnail.secure_url,
        publicId: uploadedThumbnail.public_id,
      },
    });

    await video.save();

    return res.status(200).json({
      success: true,
      message: "Video uploaded successfully",
      video,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const updateVideo = async (req, res) => {
  try {
    const videoId = req.params.id;
    const { title, description, category, tags } = req.body;
    const { userId } = req.user;

    // 1. Find existing video
    const existingVideo = await Video.findById(videoId);
    if (!existingVideo) {
      return res
        .status(404)
        .json({ success: false, message: "Video not found" });
    }

    // 2. Optional: check if current user is uploader
    if (existingVideo.uploader.toString() !== userId) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized to update this video" });
    }

    // 3. Optional: if new category is provided, validate it
    if (category) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return res
          .status(404)
          .json({ success: false, message: "Invalid category ID" });
      }
      existingVideo.category = category;
    }

    // 4. Update simple fields if provided
    if (title) existingVideo.title = title;
    if (description) existingVideo.description = description;
    if (tags) existingVideo.tags = tags.split(",");

    // 5. Handle new file uploads if available
    if (req.files?.video?.length > 0) {
      const newVideoPath = req.files.video[0].path;

      // Get new duration
      const duration = await new Promise((resolve, reject) => {
        ffmpeg.ffprobe(newVideoPath, (err, metadata) => {
          if (err) reject(err);
          else resolve(metadata.format.duration);
        });
      });

      // Upload new video
      const uploadedVideo = await cloudinary.uploader.upload(newVideoPath, {
        resource_type: "video",
        folder: "videos",
      });

      // Remove old video from Cloudinary
      await cloudinary.uploader.destroy(existingVideo.video.publicId, {
        resource_type: "video",
      });

      // Clean local file
      fs.unlinkSync(newVideoPath);

      // Update DB video data
      existingVideo.video = {
        url: uploadedVideo.secure_url,
        publicId: uploadedVideo.public_id,
      };
      existingVideo.duration = duration;
    }

    if (req.files?.thumbnail?.length > 0) {
      const newThumbPath = req.files.thumbnail[0].path;

      const uploadedThumb = await cloudinary.uploader.upload(newThumbPath, {
        folder: "thumbnails",
      });

      // Remove old thumbnail
      await cloudinary.uploader.destroy(existingVideo.thumbnail.publicId);

      fs.unlinkSync(newThumbPath);

      existingVideo.thumbnail = {
        url: uploadedThumb.secure_url,
        publicId: uploadedThumb.public_id,
      };
    }

    await existingVideo.save();

    return res.status(200).json({
      success: true,
      message: "Video updated successfully",
      video: existingVideo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find({})
      .populate("uploader")
      .populate("category")
      // .populate("comments")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "All videos fetched successfully",
      videos,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const getVideoById = async (req, res) => {
  try {
   
    const videoId = req.params.id;
    const video = await Video.findById(videoId).populate("uploader").populate("category");

    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }
  
    return res.status(200).json({
      success: true,
      message: "Video fetched successfully",
      video, 
    })
  
  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  } 
}