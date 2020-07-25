import { reset } from "nodemon";
import { response } from "express";
import routes from "../routes";
import { render } from "pug";

export const getJoin = (req, res) => {
    res.render("join", {pageTitle : "Join"})
};
export const postJoin = (req, res) => {
    const {
        body : {name, email, password, password2}
    } = req;
    if (password !== password2){
        res.status(400);
        res.render("join", {pageTitle : "Join"});
    } else{
        //회원가입되었을 때 정보 등록 + 로그인시키기
        res.redirect(routes.home);
    }
}
export const getLogin = (req, res) => res.render("login", {pageTitle : "Login"});
export const postLogin = (req, res) => {
    res.redirect(routes.home)
}
export const logout = (req, res) => {
    //do logout
    res.redirect(routes.home);
};
export const users = (req, res) => res.render("users", {pageTitle : "Users"});
export const userDetail = (req, res) => res.render("userDetail", {pageTitle : "user Details"});
export const editProfile = (req, res) => res.render("editProfile", {pageTitle : "Profile edit"});
export const changePassword = (req, res) => res.render("changePassword", {pageTitle : "Change Password"});