import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  fileUrl: {
    type: String,
    required: "File URL is required",
  },
  title: {
    type: String,
    required: "Title is required",
  },
  description: String, //It seems like if you only want to specity the type, you don't need to create an object and just write it.
  category: {
    type: String,
    required: "Category is required",
  },
  views: {
    type: Number,
    default: 0,
  },
  uploadTime: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

const model = mongoose.model("Video", VideoSchema);
export default model;
