import '@babel/polyfill';
import 'core-js';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import passport from 'passport';
import mongoose from 'mongoose';
import session from 'express-session';
import path from 'path';
import MongoStore from 'connect-mongo';
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';
import globalRouter from './routers/globalRouter';
import routes from './routes';
import './passport';
import authRouter from './routers/authRouter';
import feedRouter from './routers/feedRouter';
import commentRouter from './routers/commentRouter';
import {authentication} from './middlewares';

const ONE_MONTH_IN_MILLISECONDS = 1000 * 60 * 60 * 24 * 30;

const app = express();
const CookieStore = MongoStore(session);

const whitelist = ['https://vermillion-strudel-3117ec.netlify.app'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(helmet());
app.use(cors(corsOptions));
app.use('/uploads', express.static('uploads'));
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

app.use(
  session({
    cookie: {
      maxAge: ONE_MONTH_IN_MILLISECONDS,
      // secure: false,
      sameSite: 'none',
      secure: true,
      httpOnly: false,
    },
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new CookieStore({mongooseConnection: mongoose.connection}),
  }),
);

app.use(passport.initialize());
app.use(passport.session());
app.use(authentication);

app.use(routes.home, globalRouter);
app.use(routes.auth, authRouter);
app.use(routes.user, userRouter);
app.use(routes.video, videoRouter);
app.use(routes.comment, commentRouter);
app.use(routes.feed, feedRouter);

export default app;
