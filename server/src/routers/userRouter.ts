import express from 'express';
import routes from '../routes';
import {
  editUser,
  userDetail,
  join,
  postLogin,
  handleLoginSuccess,
  handleAuthFail,
  changeUserPassword,
} from '../controllers/userController';

const userRouter = express.Router();

userRouter.post(routes.user, join, postLogin);
userRouter.get(routes.loginSuccess, handleLoginSuccess);
userRouter.get(routes.userDetail, userDetail);
userRouter.patch(routes.userDetail, editUser);
userRouter.patch(routes.userPassword, changeUserPassword);

export default userRouter;
