import mongoose, {PopulatedDoc} from 'mongoose';
import {UserType} from './User';

export interface CommentType extends mongoose.Document {
  text: string;
  uploadTime: Date;
  creator: PopulatedDoc<UserType>;
  isEdited: boolean;
}

const CommentSchema = new mongoose.Schema<CommentType>({
  text: {
    type: String,
    required: true,
  },
  uploadTime: {
    type: Date,
    default: Date.now,
  },
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
