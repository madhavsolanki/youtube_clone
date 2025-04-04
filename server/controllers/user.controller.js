import User from "../models/user.model.js";
import Channel from "../models/channel.model.js";
import cloudinary from "../config/cloudinary.js";
import bcrypt from "bcryptjs";
import fs from "fs";

export const uploadProfilePicture = async (req, res) => {
  try {
    const { userId } = req.user;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // if user has an old profile picture, delete it from cloudinary
    if (user.profilePicture.publicId) {
      await cloudinary.uploader.destroy(user.profilePicture.publicId);
    }

    // Upload new image to Cloudinary
    const uploadedImage = await cloudinary.uploader.upload_stream(
      { folder: "profile_pictures" },
      async (error, result) => {
        if (error) {
          return res
            .status(500)
            .json({ message: "Cloudinary upload failed", error });
        }
        // Update user profile picture in the database
        user.profilePicture = {
          imageUrl: result.secure_url,
          publicId: result.public_id,
        };

        await user.save();

        res.status(200).json({
          message: "Profile picture updated successfully",
          profilePicture: user.profilePicture,
        });
      }
    );

    uploadedImage.end(file.buffer);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.user;
    const { firstName, lastName, username, password, phoneNumber } = req.body;

    // Fetch the user from the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // check if the username is already taken by another user
    if (username && username !== user.username) {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: "Username already taken" });
      }
    }

    // check if the phone number is already taken by another user
    if (phoneNumber && phoneNumber !== user.phoneNumber) {
      const existingUser = await User.findOne({ phoneNumber });
      if (existingUser) {
        return res.status(400).json({ message: "Phone number already taken" });
      }
    }

    // If password is updated , hash the new password
    let hashedPassword = user.password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Update only the provided fields
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.username = username || user.username;
    user.password = hashedPassword;
    user.phoneNumber = phoneNumber || user.phoneNumber;

    // Save the updated userdata
    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        phoneNumber: user.phoneNumber,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getUserData = async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ success: true, userData: user });
  } catch (error) {}
};


// ------------------------------------------------ Channel Managmement ------------------------------------------------

/**
 * @desc Creates a new channel for a user
 * @access Private (Only users can create a channel)
 */
export const createChannel = async (req, res) => {
  try {
    const { userId, role } = req.user;
    const { name, description } = req.body;

    if (role !== "user") {
      return res
        .status(403)
        .json({ message: "Admins cannot create a channel" });
    }

     // Check if user already has a channel
     const existingChannel = await Channel.findOne({ owner: userId });
     if (existingChannel) {
       return res.status(400).json({
         success: false,
         message: "You already have a channel",
       });
     }

    // Check if the user already has a channel
    const existingUser = await User.findById(userId).populate("channel");
    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    if (existingUser.channel) {
      return res
        .status(400)
        .json({ success: false, message: "User already owns a channel" });
    }

    // Create new Channel
    const newChannel = await Channel.create({
      name,
      description,
      owner: userId,
    });

    await newChannel.save();

    // Update the user's channel reference
    existingUser.channel = Channel._id;
    await existingUser.save();

    return res
      .status(201)
      .json({
        success: true,
        message: "Channel created successfully",
        channel: newChannel,
      });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to create channel" });
  }
};


/**
 * @desc Updates a channel for a user
 * @access Private (Only users can create a channel)
 */
export const updateChannel = async (req, res) => {
  try {
    const { userId, role } = req.user;
    const { channelId } = req.params;
    const { name, description } = req.body;

    if (role !== "user") {
      return res.status(403).json({ message: "Admins cannot update a channel" });
    }

    // Check if channel exists
    const channel = await Channel.findById(channelId);
    if (!channel) {
      return res.status(404).json({ success: false, message: "Channel not found" });
    }

    // Ensure the logged-in user is the owner of the channel
    if (channel.owner.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, message: "You are not authorized to update this channel" });
    }

    // Preserve old data if new values are not provided
    channel.name = name || channel.name;
    channel.description = description || channel.description;

    // Handle Channel Logo (profile picture)
    if (req.files && req.files["channelIcon"]) {
      // Delete old logo if exists
      if (channel.channelIcon?.publicId) {
        // Destroy old image using publicId
        await cloudinary.uploader.destroy(channel.channelIcon.publicId);
        console.log("Old logo image deleted from Cloudinary");
      }

      // Upload new logo to Cloudinary
      const channelIconUpload = await cloudinary.uploader.upload(req.files["channelIcon"][0].path, {
        folder: 'channel_logos', // Optional: specify a folder on Cloudinary
        public_id: `${Date.now()}-${Math.round(Math.random() * 1E9)}`, // Custom public ID
      });

      // Update new logo
      channel.channelIcon = {
        imageUrl: channelIconUpload.secure_url, // Cloudinary URL
        publicId: channelIconUpload.public_id, // Cloudinary public ID
      };
    }

    // Handle banner image upload
    if (req.files && req.files["bannerImage"]) {
      // Delete old banner image if exists
      if (channel.bannerImage?.publicId) {
        // Destroy old image using publicId
        await cloudinary.uploader.destroy(channel.bannerImage.publicId);
        console.log("Old banner image deleted from Cloudinary");
      }

      // Upload new banner image to Cloudinary
      const bannerImageUpload = await cloudinary.uploader.upload(req.files["bannerImage"][0].path, {
        folder: 'banner_images', // Optional: specify a folder on Cloudinary
        public_id: `${Date.now()}-${Math.round(Math.random() * 1E9)}`, // Custom public ID
      });

      // Update new banner image
      channel.bannerImage = {
        imageUrl: bannerImageUpload.secure_url, // Cloudinary URL
        publicId: bannerImageUpload.public_id, // Cloudinary public ID
      };
    }

    // Save the updated channel
    await channel.save();

    return res.status(200).json({
      success: true,
      message: "Channel updated successfully",
      channel,
    });
  } catch (error) {
    console.log(error); // Log any error for debugging
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

/**
 * @desc Deletes a channel for a user
 * @access Private (Only users can create a channel)
 */
export const deleteChannel = async (req, res) => {
  try {
    const {userId, role} = req.user;
    const {channelId} = req.params;

    if (role !== "user") {
      return res.status(403).json({ message: "Admins cannot update a channel" });
    }

    // check id the channel exists
    const channel = await Channel.findById(channelId);
    if(!channel){
      return res.status(404).json({
        success: false,
        message: "Channel not found",
      });
    }

    // Ensure the logged-in user is the owner of the channel
    if(channel.owner.toString() !== userId.toString()){
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this channel",
      });
    }

    // Remove the asociated images from the cloudinary 
    if(channel.channelIcon?.publicId){
      await cloudinary.uploader.destroy(channel.channelIcon.publicId);
    }

    if(channel.bannerImage?.publicId){
      await cloudinary.uploader.destroy(channel.bannerImage.publicId);  
    }

    // Remove the channel reference from the user's channels list
    await User.updateOne(
      {_id: userId},
      {$pull: {channels: channelId}}
    );

    // Delete the channel from the database
    await channel.deleteOne({channelId});

    return res.status(200).json({
      success: true,
      message: "Channel deleted successfully", 
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while deleting the channel",
      error: error.message,
    });
  }
}

/**
 * @desc Get All the channells 
 * @access Private (Only users can create a channel)
 */
export const getAllChannels = async (req, res) => {
  try {
    const channels = await Channel.find();
    return res.status(200).json({
      success: true,
      message: "Channels fetched successfully",
      channels,
    }); 
  }
  catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching the channels",
      error: error.message,
    }); 
  }
}

/**`
 * @desc Get Channel By Id
 * @access Private (Only users can create a channel)
 */
export const getChannelById = async (req, res) => {
 
  try {
    const { channelId } = req.params;
    const channel = await Channel.findById(channelId);
    if(!channel){
      return res.status(404).json({
        success: false,
        message: "Channel not found",
      }); 
    }
    return res.status(200).json({
      success: true,
      message: "Channel fetched successfully",
      channel,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching the channel",
      error: error.message,
    });
  }
}

