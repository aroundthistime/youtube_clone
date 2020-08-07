import googleStrategy from "passport-google-oauth20";
import facebookStrategy from "passport-facebook";
import User from "./models/User";
import routes from "./routes";
import {
  googleLoginCallback,
  facebookLoginCallback,
} from "./controllers/userController";
import passport from "passport";

passport.use(User.createStrategy());

const ngrokSite = "https://6b595c469e94.ngrok.io";

//social-logins
passport.use(
  new googleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:4000" + routes.googleCallback,
    },
    googleLoginCallback
  )
);

passport.use(
  new facebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: ngrokSite + routes.facebookCallback,
      profileFields: ["id", "displayName", "photos", "email"],
      scope: ["public_profile", "email"],
    },
    facebookLoginCallback
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
