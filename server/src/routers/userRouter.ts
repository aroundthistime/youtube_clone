import express from 'express';
import routes from '../routes';
import {
  editUser,
  userDetail,
  join,
  changeUserPassword,
  login,
} from '../controllers/userController';
import {getUserVideos} from '../controllers/videoController';
import {onlyPrivate} from '../middlewares';

const userRouter = express.Router();

userRouter.post('/', join, login);
userRouter.patch('/', onlyPrivate, editUser);
userRouter.get(routes.userDetail, userDetail);
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
