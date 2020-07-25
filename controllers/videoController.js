import {videos} from "../db"
import routes from "../routes";

export const home = (req, res) => res.render('home', {pageTitle : "Home", videos});
export const search = (req, res) => {
    const {
        query : {term : searchingBy}
    } = req; // = const searchingBy = query.term
    res.render("search", {pageTitle : "Search", searchingBy, videos}); // if the value is same as the key, you can just send the name of the key only (then it will automatically think that the key has a value which is a variable of a same name of the key)
}
export const getVideoUpload = (req, res) => res.render("uploadVideo", {pageTitle : "Upload"});
export const postVideoUpload = (req, res) => {
    const {
        body : {file, title, description}
    } = req;
    //upload and save video, after it finishes uploading, redirect user to the videodetail page of the video
    res.redirect(routes.videoDetail());
}
export const videoDetail = (req, res) => res.render("videoDetail", {pageTitle : "Video details"});
export const editVideo = (req, res) => res.render("editVideo", {pageTitle : "Video edit"});
export const deleteVideo = (req, res) => res.render("deleteVideo", {pageTitle : "Video delete"});