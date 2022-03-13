import {Request, Response} from 'express';
import User from '../models/User';
import Video from '../models/Video';
import Comment from '../models/Comment';

export const addComment = async (req: Request, res: Response) => {
  const {
    body: {text, videoId},
    user,
  } = req;
  try {
    const video = await Video.findById(videoId);
    const newComment = await Comment.create({
      text,
      creator: user.id,
    });
    video.comments.push(newComment.id);
    user.comments.push(newComment.id);
    video.save();
    user.save();
    res.status(200).json({
      result: true,
    });
  } catch (error) {
    res.status(400).json({
      result: false,
    });
  }
};

export const editComment = async (req: Request, res: Response) => {
  const {
    body: {text, id},
    user,
  } = req;
  try {
    const comment = await Comment.findById(id);
    if (comment.creator._id !== user.id) {
      throw Error("User doesn't have rights for the comment");
    }
    await Comment.findByIdAndUpdate(id, {
      text,
      isEdited: true,
    });
    res.status(200).json({
      result: true,
    });
  } catch (error) {
    res.status(400).json({
      result: false,
    });
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
    if (commentToDelete.creator._id !== id) {
      throw Error("User doesn't have rights for the comment");
    }
    await Comment.findByIdAndDelete(id);
    res.status(200).json({
      result: true,
    });
  } catch (error) {
    res.status(400).json({
      result: false,
    });
  }
};

export const blockComment = async (req: Request, res: Response) => {
  const {
    body: {commentId},
    user,
  } = req;
  try {
    const currentUser = await User.findById(user.id);
    currentUser.blockedComments.push(commentId);
    await currentUser.save();
    res.status(200).json({
      result: true,
    });
  } catch (error) {
    res.status(400).json({
      result: false,
    });
  }
};
