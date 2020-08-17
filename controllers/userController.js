import { reset } from "nodemon";
import { response } from "express";
import routes from "../routes";
import { render } from "pug";
import User from "../models/User";
import passport from "passport";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};
export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 },
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      const user = await User({
        name,
        email,
      });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }

    //회원가입되었을 때 정보 등록 + 로그인시키기
  }
};
export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });

export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});

export const googleLogin = passport.authenticate("google", {
  scope: ["profile", "email"],
});

export const googleLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { sub: id, picture: avatar_url, name, email },
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.googleId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      googleId: id,
      avatarUrl: avatar_url,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postGoogleLogin = (req, res) => {
  res.redirect(routes.home);
};

export const facebookLogin = passport.authenticate("facebook", {
  scope: ["email"],
});

export const facebookLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, name, email },
  } = profile;
  const avatarUrl = `https://graph.facebook.com/${id}/picture/type=large`;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.facebookId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      facebookId: id,
      avatarUrl, //can I check whether the image is default image of facebook profile?
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postFacebookLogin = (req, res) => res.redirect(routes.home);

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};
export const users = (req, res) => res.render("users", { pageTitle: "Users" });

export const myProfile = async (req, res) => {
  const {
    query: { sort },
  } = req;
  if (sort == 1) {
    // sort by most popular - most views come first
    const user = await User.findById(req.user.id).populate({
      path: "videos",
      options: { sort: { views: -1 } },
    });
    res.render("userDetail", { pageTitle: "My profile", user });
  } else if (sort == 2) {
    // sort by date(oldest)
    const user = await User.findById(req.user.id).populate("videos");
    res.render("userDetail", { pageTitle: "My profile", user });
  } else {
    // sort by date(newest) - default
    const user = await User.findById(req.user.id).populate({
      path: "videos",
      options: { sort: { _id: -1 } },
    });
    res.render("userDetail", { pageTitle: "My profile", user });
  }
};

export const userDetail = async (req, res) => {
  const {
    params: { id, sort },
  } = req;
  try {
    if (sort == 1) {
      // sort by most popular - most views come first
      const user = await User.findById(id).populate({
        path: "videos",
        options: { sort: { views: -1 } },
      });
      res.render("userDetail", { pageTitle: user.name, user });
    } else if (sort == 2) {
      // sort by date(oldest)
      const user = await User.findById(id).populate("videos");
      res.render("userDetail", { pageTitle: user.name, user });
    } else {
      // sort by date(newest) - default
      const user = await User.findById(id).populate({
        path: "videos",
        options: { sort: { _id: -1 } },
      });
      res.render("userDetail", { pageTitle: user.name, user });
    }
  } catch (error) {
    res.render("userDetail", { pageTitle: "User not Found", user: null });
  }
};

export const getEditProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Profile edit" });

export const postEditProfile = async (req, res) => {
  const {
    body: { name, status },
    file,
  } = req;
  console.log(name);
  try {
    await User.findByIdAndUpdate(req.user.id, {
      name,
      status,
      avatarUrl: file ? file.path : req.user.avatarUrl,
    });
    res.redirect(routes.myProfile);
  } catch (error) {
    console.log(error);
    res.render("editProfile", { pageTitle: "Edit Profile" });
  }
};

export const getChangePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });

export const postChangePassword = async (req, res) => {
  const {
    body: { currentPassword: oldPassword, password: newPassword },
  } = req;
  try {
    await req.user.changePassword(oldPassword, newPassword);
    res.redirect(routes.myProfile);
  } catch (error) {
    res.status(400);
    res.redirect(routes.users + routes.changePassword);
  }
};
