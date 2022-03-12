import express from 'express';
import passport from 'passport';
import {onlyPublic} from '../middlewares';
import {googleLogin, postLogin} from '../controllers/userController';
import routes from '../routes';

const loginRouter = express.Router();

loginRouter.post('/', onlyPublic, postLogin);
// loginRouter.get(routes.googleLogin, googleLogin);
// loginRouter.get(routes.googleLoginCallback, passport.authenticate('google'));
// loginRouter.get(routes.loginFail, getLoginFail);

export default loginRouter;
