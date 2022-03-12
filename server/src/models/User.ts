import mongoose, {Types} from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

export interface UserType {
  name: string;
  email: string;
  avatarUrl: string;
  status: string;
  facebookId?: number;
  googleId?: Number;
  comments: Types.ObjectId[];
  blockedComments: Types.ObjectId[];
  videos: Types.ObjectId[];
  history: Types.ObjectId[];
  watchLater: Types.ObjectId[];
  noInterest: Types.ObjectId[];
}

const UserSchema = new mongoose.Schema<UserType>({
  name: String,
  email: String,
  avatarUrl: {
    type: String,
    default:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQuIM2Kwi_1IOCBHfB3z2CZWpjl7igvaMpYZw&usqp=CAU',
  },
  status: {
    type: String,
    default: '',
  },
  facebookId: Number,
  googleId: Number,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
  blockedComments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
  videos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Video',
    },
  ],
  history: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Video',
    },
  ],
  watchLater: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Video',
    },
  ],
  noInterest: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Video',
    },
  ],
  blockedUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

UserSchema.plugin(passportLocalMongoose, {usernameField: 'email'});

const model = mongoose.model('User', UserSchema);

export default model;
