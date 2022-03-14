import {Request, Response} from 'express';
import User from '../models/User';
import Video from '../models/Video';
import Comment, {CommentType} from '../models/Comment';
import {
  returnErrorResponse,
  returnSuccessResponse,
} from '../utils/responseHandler';
import {getCommentSortOptions} from '../utils/mongooseUtils';
import {CommentSortMethodType} from '../@types/sortMethod';
import {PopulateWithPaginationOptions} from '../@types/mongooseTypes';

const COMMENT_FETCH_UNIT = 20;

type GetVideoCommentsParams = {id: string};
type GetVideoCommentsQuery = {
  page: number;
  sortMethod: CommentSortMethodType;
};

export const getVideoComments = async (
  req: Request<GetVideoCommentsParams, {}, {}, GetVideoCommentsQuery>,
  res: Response,
) => {
  try {
    const {
      params: {id: videoId},
      query: {page, sortMethod},
    } = req;
    const video = await Video.findById(videoId).populate({
      path: 'comments',
      options: getCommentWithPaginationPopulateOptions(page, sortMethod),
      populate: {
        path: 'creator',
        model: 'User',
      },
    });
    returnCommentsWithPaginationSuccessResponse(res, video.comments);
    return {
      result: true,
      comments: video.comments,
      hasNextPage: video.comments.length > 0,
    };
  } catch {
    returnErrorResponse(res);
  }
};

const getCommentWithPaginationPopulateOptions = (
  page: number,
  sortMethod?: CommentSortMethodType,
): PopulateWithPaginationOptions<CommentType> => {
  return {
    limit: COMMENT_FETCH_UNIT,
    skip: page * COMMENT_FETCH_UNIT,
    sort: sortMethod ? getCommentSortOptions(sortMethod) : {},
  };
};

const returnCommentsWithPaginationSuccessResponse = (
  res: Response,
  comments: CommentType[],
) => {
  res.status(200).json({
    result: true,
    comments,
    hasNextPage: comments.length > 0,
  });
};

export const addComment = async (req: Request, res: Response) => {
  const {
    body: {text, videoId},
    user,
  } = req;
  try {
    const video = await Video.findById(videoId);
    const newComment = await Comment.create({
      text,
      creator: user._id,
    });
    video.comments.push(newComment.id);
    user.comments.push(newComment.id);
    await video.save();
    await user.save();
    returnSuccessResponse(res);
  } catch (error) {
    returnErrorResponse(res);
  }
};

export const editComment = async (req: Request, res: Response) => {
  const {
    body: {text, id},
    user,
  } = req;
  try {
    const comment = await Comment.findById(id);
    if (comment.creator.id !== user.id) {
      throw Error("User doesn't have rights for the comment");
    }
    await Comment.findByIdAndUpdate(id, {
      text,
      isEdited: true,
    });
    returnSuccessResponse(res);
  } catch (error) {
    returnErrorResponse(res);
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const {
      body: {id},
      user,
    } = req;
    const commentToDelete = await Comment.findById(id);
    if (!commentToDelete) {
      throw Error("Comment doesn't exist");
    }
    if (commentToDelete.creator.id !== id) {
      throw Error("User doesn't have rights for the comment");
    }
    await Comment.findByIdAndDelete(id);
    returnSuccessResponse(res);
  } catch (error) {
    returnErrorResponse(res);
  }
};

export const blockComment = async (req: Request, res: Response) => {
  const {
    body: {commentId},
  } = req;
  try {
    const user = await User.findById(req.user.id);
    user.blockedComments.push(commentId);
    await user.save();
    returnSuccessResponse(res);
  } catch (error) {
    returnErrorResponse(res);
  }
};
