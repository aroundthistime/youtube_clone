import express from 'express';
import routes from '../routes';
import {editUser, userDetail, join} from '../controllers/userController';
import {onlyPrivate, uploadAvatar} from '../middlewares';

const userRouter = express.Router();

userRouter.post(routes.user, join);
userRouter.get(routes.userDetail, userDetail);
userRouter.put(routes.userDetail, editUser);

export default userRouter;
