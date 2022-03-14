import express from 'express';
import routes from '../routes';
import {
  editUser,
  userDetail,
  join,
  handleLoginSuccess,
  changeUserPassword,
  login,
} from '../controllers/userController';
import {getUserVideos} from '../controllers/videoController';
import {onlyPrivate} from '../middlewares';

const userRouter = express.Router();

userRouter.post(routes.user, join, login);
userRouter.get(routes.loginSuccess, handleLoginSuccess);
userRouter.get(routes.userDetail, userDetail);
userRouter.patch(routes.userDetail, onlyPrivate, editUser);
userRouter.get(routes.userVideo, getUserVideos);
userRouter.patch(routes.userPassword, onlyPrivate, changeUserPassword);

export default userRouter;
