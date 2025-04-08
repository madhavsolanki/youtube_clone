import multer from "multer";
import path from "path";
import fs from "fs";

// Configure the storage to store file temporarily imnm memory
const storage = multer.memoryStorage();

// Validate the file type
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

  if(allowedTypes.includes(file.mimetype)){
    cb(null, true);
  }
  else{
    cb(new Error("Invalid file type. Only JPEG, PNG, and JPG are allowed."), false);
  }
}

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

//---------------------------------- Channel Image Handling --------------------------------

// Function to create folder if not exists
const createFolderIfNotExists = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};

// Storage Configurations
const channelStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath;

    if(file.fieldname == "channelIcon"){
      uploadPath = "uploads/channel_logo/";
    }else if(file.fieldname == "bannerImage"){
      uploadPath = "uploads/banner_images/";
    }

    createFolderIfNotExists(uploadPath);

    cb(null, uploadPath);
  },
  filename : (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
    cb(null, fileName);
  }
});

// File filter (restrict file types)
const fileFilterForChannel = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

  if(allowedTypes.includes(file.mimetype)){
    cb(null, true);
  }
  else{
    cb(new Error("Invalid file type. Only JPEG, PNG, and JPG are allowed."), false);
  }
};

// Multer upload middleware
export const uploadChannelImage = multer({storage: channelStorage, fileFilter: fileFilterForChannel });


// ------------------------------------------ Video Handling -----------------------------------------
// Allowed MIME types
const videoMimeTypes = ["video/mp4", "video/x-matroska", "video/mkv", "video/webm", "video/avi"];
const imageMimeTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

// Unified disk storage with dynamic folder selection
const mediaStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder;

    if (file.fieldname === "video") {
      folder = "uploads/videos/";
    } else if (file.fieldname === "thumbnail") {
      folder = "uploads/thumbnails/";
    } else {
      return cb(new Error("Invalid field name"), false);
    }

    if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });
    cb(null, folder);
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  },
});

// File filter
const mediaFileFilter = (req, file, cb) => {
  if (file.fieldname === "video" && videoMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else if (file.fieldname === "thumbnail" && imageMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};

// Multer middleware
export const uploadVideoFiles = multer({
  storage: mediaStorage,
  limits: {
    fileSize: 1000 * 1000 * 500, // 500MB limit
  },
  fileFilter: mediaFileFilter,
}).fields([
  { name: "video", maxCount: 1 },
  { name: "thumbnail", maxCount: 1 },
]);
