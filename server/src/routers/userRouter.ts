import express from 'express';
import routes from '../routes';
import {
  editUser,
  join,
  changeUserPassword,
  login,
  getMyProfile,
  getUserDetail,
} from '../controllers/userController';
import {getMyVideos, getUserVideos} from '../controllers/videoController';
import {onlyPrivate} from '../middlewares';

const userRouter = express.Router();

userRouter.post('/', join, login);
userRouter.patch('/', onlyPrivate, editUser);
userRouter.get(routes.myProfile, onlyPrivate, getMyProfile);
userRouter.get(routes.myVideos, onlyPrivate, getMyVideos);
userRouter.get(routes.userDetail, getUserDetail);
userRouter.get(routes.userVideo, getUserVideos);
userRouter.patch(routes.userPassword, onlyPrivate, changeUserPassword);

// social-logins
// globalRouter.get(routes.google, googleLogin);
// globalRouter.get(
//   routes.googleCallback,
//   passport.authenticate('google', {failureRedirect: routes.login}),
//   postGoogleLogin,
// );
// globalRouter.get(routes.facebook, facebookLogin);
// globalRouter.get(
//   routes.facebookCallback,
//   passport.authenticate('facebook', {failureRedirect: routes.login}),
//   handleLoginSuccess,
// );

export default userRouter;
