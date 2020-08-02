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
export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};
export const users = (req, res) => res.render("users", { pageTitle: "Users" });
export const userDetail = (req, res) =>
  res.render("userDetail", { pageTitle: "user Details" });
export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Profile edit" });
export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });
