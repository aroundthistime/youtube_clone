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
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';
import globalRouter from './routers/globalRouter';
import routes from './routes';
import './passport';
import authRouter from './routers/authRouter';
import feedRouter from './routers/feedRouter';
import commentRouter from './routers/commentRouter';

const ONE_MONTH_IN_MILLISECONDS = 1000 * 60 * 60 * 24 * 30;

const app = express();
const CookieStore = MongoStore(session);

app.use(helmet());
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
    },
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new CookieStore({mongooseConnection: mongoose.connection}),
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use(routes.home, globalRouter);
app.use(routes.auth, authRouter);
app.use(routes.user, userRouter);
app.use(routes.video, videoRouter);
app.use(routes.comment, commentRouter);
app.use(routes.feed, feedRouter);

export default app;
