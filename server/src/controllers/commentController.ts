import {Request, Response} from 'express';
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
  } catch (error) {
    res.status(400).json({
      result: false,
    });
  } finally {
    res.status(200).json({
      result: true,
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
      throw Error;
    }
    await Comment.findByIdAndUpdate(id, {
      text,
      isEdited: true,
    });
  } catch (error) {
    res.status(400).json({
      result: false,
    });
  } finally {
    res.status(200).json({
      result: true,
    });
  }
};

export const postDeleteComment = async (req, res) => {
  const {
    params: {id},
    body: {commentId},
    user,
  } = req;
  await user.populate('comments');
  try {
    const video = await Video.findById(id);
    if (!isNaN(commentId) && commentId < 0) {
      // if the comment is just created, not by pug but by javascript create element function => so it doesnt have id
      // in this case, user.comments.length + commentId means the index number of the comment to delete in user.comments array
      const commentIdToDelete =
        user.comments[user.comments.length + commentId]._id;
      user.comments.splice(user.comments.length + commentId, 1);
      await Comment.findByIdAndRemove(commentIdToDelete);
      const videoIndex = video.comments.indexOf(commentIdToDelete);
      if (videoIndex > -1) {
        video.comments.splice(videoIndex, 1);
      }
    } else {
      // when the comment is created before loading the page, and has its id in html
      await Comment.findByIdAndRemove(commentId);
      const filteredVideoComments = await video.comments.filter(
        (comment) => comment._id != commentId,
      );
      video.comments = filteredVideoComments;
      const userIndex = user.comments.indexOf(commentId);
      if (userIndex > -1) {
        user.comments.splice(userIndex, 1);
      }
    }
    user.save();
    video.save();
  } catch (error) {
    console.log(error);
    res.status(400);
  } finally {
    res.end();
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
    currentUser.save();
  } catch (error) {
    res.status(400).json({
      result: false,
    });
  } finally {
    res.status(200).json({
      result: true,
    });
  }
};
