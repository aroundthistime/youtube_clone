import express from 'express';
import passport from 'passport';
import {login} from '../controllers/userController';
import {onlyPublic} from '../middlewares';
import routes from '../routes';

const loginRouter = express.Router();

loginRouter.post('/', onlyPublic, login);
// loginRouter.get(routes.googleLogin, googleLogin);
// loginRouter.get(routes.googleLoginCallback, passport.authenticate('google'));
// loginRouter.get(routes.loginFail, getLoginFail);

export default loginRouter;
