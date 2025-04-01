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