import express from "express";
import passport from "passport";
import routes from "../routes";
import { home, search, category } from "../controllers/videoController";
import {
  join,
  login,
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
} from "../controllers/userController";
import { onlyPublic, onlyPrivate } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);
globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);
globalRouter.get(routes.logout, onlyPrivate, logout);
globalRouter.get(routes.myProfile, onlyPrivate, myProfile);
globalRouter.get(routes.search, search);
globalRouter.get(routes.category(), category);

//social-logins
globalRouter.get(routes.google, googleLogin);
globalRouter.get(
  routes.googleCallback,
  passport.authenticate("google", { failureRedirect: routes.login }),
  postGoogleLogin
);
globalRouter.get(routes.facebook, facebookLogin);
globalRouter.get(
  routes.facebookCallback,
  passport.authenticate("facebook", { failureRedirect: routes.login }),
  postFacebookLogin
);

export default globalRouter;
