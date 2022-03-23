import express from 'express';
import {
  handleAuthFail,
  handleLoginSuccess,
  login,
  logout,
} from '../controllers/userController';
import {onlyPrivate, onlyPublic} from '../middlewares';
import routes from '../routes';

const authRouter = express.Router();

authRouter.get(routes.authFail, handleAuthFail);
authRouter.post(routes.login, onlyPublic, login);
authRouter.get(routes.loginSuccess, handleLoginSuccess);
authRouter.get(routes.logout, onlyPrivate, logout);

export default authRouter;
