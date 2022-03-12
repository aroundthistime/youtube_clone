import '@babel/polyfill';
import 'core-js';
import express, {Router} from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import passport from 'passport';
import mongoose from 'mongoose';
import session from 'express-session';
import path from 'path';
import MongoStore from 'connect-mongo';
import {localsMiddleware} from './middlewares';
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';
import globalRouter from './routers/globalRouter';
import apiRouter from './routers/apiRouter';
import routes from './routes';
import './passport';
import authRouter from './routers/authRouter';
import loginRouter from './routers/loginRouter';
import feedRouter from './routers/feedRouter';
import commentRouter from './routers/commentRouter';

const app = express();
const CookieStore = MongoStore(session);

app.use(helmet());
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use('/uploads', express.static('uploads'));
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CookieStore({mongooseConnection: mongoose.connection}),
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use(localsMiddleware);
app.use(routes.home, globalRouter);
app.use(routes.auth, authRouter);
app.use(routes.auth + routes.login, loginRouter);
app.use(routes.user, userRouter);
app.use(routes.video, videoRouter);
app.use(routes.comment, commentRouter);
app.use(routes.feed, feedRouter);

export default app;
