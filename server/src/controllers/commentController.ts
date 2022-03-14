import {Request, Response} from 'express';
import User from '../models/User';
import Video from '../models/Video';
import Comment from '../models/Comment';
import {
  returnErrorResponse,
  returnSuccessResponse,
} from '../utils/responseHandler';

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
