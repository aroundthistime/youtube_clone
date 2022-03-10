import routes from "./routes";
import multer from "multer";
// import multerS3 from "multer-s3";
// import aws from "aws-sdk";

// const s3 = new aws.S3({
//   accessKey : process.env.AWS_KEY,
//   secretAccessKey : process.env.AWS_PRIVATE_KEY,
//   region : "ap-northeast-2"
// });

// const multerVideo = multer({ storage : multerS3({
//   s3,
//   acl : "public-read",
//   bucket : "aroundthistimeyutube/video"
// }) });
// const multerAvater = multer({ storage : multerS3({
//   s3,
//   acl : "public-read",
//   bucket : "aroundthistimeyutube/avatars"
// }) });
const multerVideo = multer({ dest: "uploads/videos/" });
const multerAvater = multer({ dest: "uploads/avatars/" });


export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Yutube";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  next();
};

export const onlyPublic = (req, res, next) => {
  //allow some pages (ex.join) only when not loged in
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  //allow some pages (ex.change Password) only when loged in
  if (!req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

// export const uploadVideo = multerVideo.single("videoFile");
export const uploadVideo = multerVideo.fields([
  { name: "videoFile" },
  { name: "thumbnailImage" },
]);
export const uploadAvatar = multerAvater.single("avatar");
