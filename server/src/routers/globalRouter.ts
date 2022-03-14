import express from 'express';
import passport from 'passport';
import routes from '../routes';
import {onlyPublic, onlyPrivate} from '../middlewares';
import {getCategories} from '../controllers/categoryController';

const globalRouter = express.Router();

globalRouter.get(routes.category, getCategories);
//
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

export default globalRouter;
