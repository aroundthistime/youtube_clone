import mongoose, {Types} from 'mongoose';

export interface VideoType {
  fileUrl: string;
  thumbnailUrl: string;
  title: string;
  description?: string;
  category: string;
  views: number;
  uploadTime: Date;
  comments: Types.ObjectId[];
  creator: Types.ObjectId;
}

const VideoSchema = new mongoose.Schema<VideoType>({
  fileUrl: {
    type: String,
    required: 'File URL is required',
  },
  thumbnailUrl: String,
  title: {
    type: String,
    required: 'Title is required',
  },
  description: String, //It seems like if you only want to specity the type, you don't need to create an object and just write it.
  category: {
    type: String,
    required: 'Category is required',
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
      ref: 'Comment',
    },
  ],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const model = mongoose.model('Video', VideoSchema);
export default model;
