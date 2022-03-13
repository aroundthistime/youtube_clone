import express from 'express';
import {blockComment, editComment} from '../controllers/commentController';
import routes from '../routes';

const commentRouter = express.Router();

commentRouter.post(routes.blockComment, blockComment);
commentRouter.patch(routes.commentDetail, editComment);
commentRouter.delete(routes.commentDetail, deleteComment);

export default commentRouter;
