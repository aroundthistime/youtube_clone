import mongoose, {
  Document,
  PassportLocalDocument,
  PassportLocalModel,
  PassportLocalSchema,
  Types,
  PopulatedDoc,
} from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import bcrypt from 'bcrypt';
import {CommentType} from './Comment';
import {VideoType} from './Video';

export interface UserType extends PassportLocalDocument {
  name: string;
  email: string;
  password: string;
  status: string;
  avatarUrl: string;
  facebookId?: number;
  googleId?: Number;
  comments: PopulatedDoc<CommentType>[];
  blockedComments: PopulatedDoc<CommentType>[];
  videos: PopulatedDoc<VideoType>[];
  liked: PopulatedDoc<VideoType>[];
  history: PopulatedDoc<VideoType>[];
  watchLater: PopulatedDoc<VideoType>[];
  noInterest: PopulatedDoc<VideoType>[];
}

const UserSchema = new mongoose.Schema({
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
  liked: [
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
}) as PassportLocalSchema;

export interface UserModel<T extends Document> extends PassportLocalModel<T> {}

UserSchema.plugin(passportLocalMongoose, {usernameField: 'email'});

UserSchema.pre<UserType>('save', async function () {
  this.password = await bcrypt.hash(this.password, process.env.SALT_ROUNDS);
});

const model: UserModel<UserType> = mongoose.model<UserType>('User', UserSchema);

export default model;
