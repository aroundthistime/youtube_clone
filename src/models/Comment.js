import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: 'Text is required',
  },
  uploadTime: {
    type: Date,
    default: Date.now,
  }, // ,
  // video : {
  //     type : mongoose.Schema.Types.ObjectId,
  //     ref : "Video"
  // }
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  isEdited: {
    type: Boolean,
    default: false,
  },
});

const model = mongoose.model('Comment', CommentSchema);
export default model;
