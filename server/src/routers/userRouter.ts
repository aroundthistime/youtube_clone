import express from 'express';
import routes from '../routes';
import {
  editUser,
  userDetail,
  join,
  postLogin,
} from '../controllers/userController';

const userRouter = express.Router();

userRouter.post(routes.user, join, postLogin);
userRouter.get(routes.userDetail, userDetail);
userRouter.put(routes.userDetail, editUser);

export default userRouter;
