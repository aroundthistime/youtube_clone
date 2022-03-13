import GoogleStrategy from 'passport-google-oauth20';
import FacebookStrategy from 'passport-facebook';
import passport from 'passport';
import User from './models/User';
import routes from './routes';
import {
  googleLoginCallback,
  facebookLoginCallback,
} from './controllers/userController';

passport.use(User.createStrategy());

const herokuSite = 'https://stormy-coast-59422.herokuapp.com';

// social-logins
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: herokuSite + routes.googleLoginCallback,
    },
    googleLoginCallback,
  ),
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: herokuSite + routes.facebookLoginCallback,
      profileFields: ['id', 'displayName', 'photos', 'email'],
      scope: ['public_profile', 'email'],
    },
    facebookLoginCallback,
  ),
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
