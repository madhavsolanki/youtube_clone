import mongoose from "mongoose";

const channelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    channelIcon: {
      imageUrl: { type: String },
      publicId: { type: String },
    },
    bannerImage: {
      imageUrl: { type: String },
      publicId: { type: String },
    },
    subscribersCount: {
      type: Number,
      default: 0,
    },
    subscribers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    uploadedVideos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Channel = mongoose.model("Channel", channelSchema);
export default Channel;
