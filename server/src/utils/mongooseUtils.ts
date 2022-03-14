import mongoose from 'mongoose';
import {
  CommentSortMethodType,
  SortOptionType,
  VideoSortMethodType,
} from '../@types/sortMethod';
import {CommentType} from '../models/Comment';
import {VideoType} from '../models/Video';

export const getObjectIdFromString = (str: string) => {
  return mongoose.Types.ObjectId(str);
};

export const getCommentSortOptionsFromSortMethod = (
  sortMethod: CommentSortMethodType,
): SortOptionType<CommentType> => {
  if (sortMethod === 'Newest') {
    return {
      uploadTime: -1,
    };
  } else if (sortMethod === 'Oldest') {
    return {
      uploadTime: 1,
    };
  }
};

export const getVideoSortOptionsFromSortMethod = (
  sortMethod: VideoSortMethodType,
): SortOptionType<VideoType> => {
  if (sortMethod === 'Newest') {
    return {
      uploadTime: -1,
    };
  } else if (sortMethod === 'Oldest') {
    return {
      uploadTime: 1,
    };
  } else if (sortMethod === 'Most popular') {
    return {
      views: -1,
    };
  }
};
