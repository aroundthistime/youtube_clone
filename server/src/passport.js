import googleStrategy from "passport-google-oauth20";
import facebookStrategy from "passport-facebook";
import User from "./models/User";
import routes from "./routes";
import {
  googleLoginCallback,
  facebookLoginCallback,
} from "./controllers/userController";
import passport from "passport";

passport.use(User.createStrategy({ passReqToCallback: true }));

const herokuSite = "https://stormy-coast-59422.herokuapp.com";

//social-logins
passport.use(
  new googleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: herokuSite + routes.googleCallback,
    },
    googleLoginCallback
  )
);

passport.use(
  new facebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: herokuSite + routes.facebookCallback,
      profileFields: ["id", "displayName", "photos", "email"],
      scope: ["public_profile", "email"],
    },
    facebookLoginCallback
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
