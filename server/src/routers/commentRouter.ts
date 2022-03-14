import express from 'express';
import {
  blockComment,
  deleteComment,
  editComment,
} from '../controllers/commentController';
import {onlyPrivate} from '../middlewares';
import routes from '../routes';

const commentRouter = express.Router();

commentRouter.post(routes.blockComment, onlyPrivate, blockComment);
commentRouter.patch(routes.commentDetail, onlyPrivate, editComment);
commentRouter.delete(routes.commentDetail, onlyPrivate, deleteComment);

export default commentRouter;
