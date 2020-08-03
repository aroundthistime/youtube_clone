import routes from "./routes";
import multer from "multer";

const multerVideo = multer({ dest: "uploads/videos/" });

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

export const uploadVideo = multerVideo.single("videoFile");
