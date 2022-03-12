import express from 'express';
import passport from 'passport';
import routes from '../routes';
import {
  home,
  search,
  getCategory,
  getHistory,
  getWatchLater,
  clearHistory,
} from '../controllers/videoController';
import {
  logout,
  postJoin,
  getJoin,
  getLogin,
  postLogin,
  googleLogin,
  postGoogleLogin,
  myProfile,
  facebookLogin,
  postFacebookLogin,
  getLoginFail,
  getJoinFail,
} from '../controllers/userController';
import {onlyPublic, onlyPrivate} from '../middlewares';

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);
globalRouter.get(routes.joinFail, onlyPublic, getJoinFail);
globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);
globalRouter.get(routes.loginFail, onlyPublic, getLoginFail);
globalRouter.get(routes.logout, onlyPrivate, logout);
globalRouter.get(routes.myProfile, onlyPrivate, myProfile);
globalRouter.get(routes.search, search);
globalRouter.get(routes.history, onlyPrivate, getHistory);
globalRouter.get(routes.clearHistory, onlyPrivate, clearHistory);
globalRouter.get(routes.watchLater, onlyPrivate, getWatchLater);
globalRouter.get(routes.category(), getCategory);

// social-logins
globalRouter.get(routes.google, googleLogin);
globalRouter.get(
  routes.googleCallback,
  passport.authenticate('google', {failureRedirect: routes.login}),
  postGoogleLogin,
);
globalRouter.get(routes.facebook, facebookLogin);
globalRouter.get(
  routes.facebookCallback,
  passport.authenticate('facebook', {failureRedirect: routes.login}),
  postFacebookLogin,
);

export default globalRouter;
