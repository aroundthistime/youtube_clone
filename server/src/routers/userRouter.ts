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

const userRouter = express.Router();

userRouter.post(routes.user, join, login);
userRouter.get(routes.loginSuccess, handleLoginSuccess);
userRouter.get(routes.userDetail, userDetail);
userRouter.patch(routes.userDetail, editUser);
userRouter.get(routes.userVideo, getUserVideos);
userRouter.patch(routes.userPassword, changeUserPassword);

export default userRouter;
