import multer from 'multer';
import {Request, Response, NextFunction} from 'express';
import routes from './routes';
import path from 'path';
import {returnErrorResponse} from './utils/responseHandler';
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
const multerVideo = multer({
  // dest: 'uploads/videos/',
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/videos');
    },
    filename: function (req, file, cb) {
      cb(null, new Date().valueOf() + path.extname(file.originalname));
    },
  }),
});
const multerAvater = multer({
  // dest: 'uploads/avatars/'
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/avatars');
    },
    filename: function (req, file, cb) {
      cb(null, new Date().valueOf() + path.extname(file.originalname));
    },
  }),
});

export const authentication = (req: Request, res: Response, next) => {
  console.log(req.user, req.session.user, req.session);
  req.user = req.session.user;
  next();
};

export const onlyPublic = (req: Request, res: Response, next) => {
  if (req.user) {
    returnErrorResponse(res);
  } else {
    next();
  }
};

export const onlyPrivate = (
  req: Request<any, any, any, any>,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) {
    console.log('야 너 req user 없잖아');
    returnErrorResponse(res);
  } else {
    next();
  }
};

export const multerUploadVideo = multerVideo.fields([
  {name: 'videoFile'},
  {name: 'thumbnailImage'},
]);

export const multerUploadAvatar = multerAvater.single('avatar');
