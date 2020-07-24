export const home = (req, res) => res.render('home', {pageTitle : "Home"});
export const search = (req, res) => {
    const {
        query : {term : searchingBy}
    } = req; // = const searchingBy = query.term
    res.render("search", {pageTitle : "Search", searchingBy}); // if the value is same as the key, you can just send the name of the key only (then it will automatically think that the key has a value which is a variable of a same name of the key)
}
export const videos = (req, res) => res.render("videos", {pageTitle : "Videos"});
export const videoUpload = (req, res) => res.render("uploadVideo", {pageTitle : "Upload"});
export const videoDetail = (req, res) => res.render("videoDetail", {pageTitle : "Video details"});
export const editVideo = (req, res) => res.render("editVideo", {pageTitle : "Video edit"});
export const deleteVideo = (req, res) => res.render("deleteVideo", {pageTitle : "Video delete"});