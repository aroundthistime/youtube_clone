import googleStrategy from "passport-google-oauth20";
import User from "./models/User";
import routes from "./routes";
import { googleLoginCallback } from "./controllers/userController";
import passport from "passport";

passport.use(User.createStrategy());

//social-logins
passport.use(
  new googleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `http://localhost:${process.env.PORT}${routes.googleCallback}`,
    },
    googleLoginCallback
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
