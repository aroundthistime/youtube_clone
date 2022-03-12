import express from 'express';
import {handleAuthFail, logout} from '../controllers/userController';
import routes from '../routes';
import loginRouter from './loginRouter';

const authRouter = express.Router();

authRouter.get(routes.authFail, handleAuthFail);
authRouter.get(routes.logout, logout);

export default authRouter;
