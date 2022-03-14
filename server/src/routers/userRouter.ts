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

const userRouter = express.Router();

userRouter.post(routes.user, join, login);
userRouter.get(routes.loginSuccess, handleLoginSuccess);
userRouter.get(routes.userDetail, userDetail);
userRouter.patch(routes.userDetail, editUser);
userRouter.patch(routes.userPassword, changeUserPassword);

export default userRouter;
