import multer from 'multer';
import {Request, Response, NextFunction} from 'express';
import routes from './routes';
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
const multerVideo = multer({dest: 'uploads/videos/'});
const multerAvater = multer({dest: 'uploads/avatars/'});

export const onlyPublic = (req: Request, res: Response, next) => {
  // allow some pages (ex.join) only when not loged in
  if (req.user) {
    returnErrorResponse(res);
  } else {
    next();
  }
};

export const onlyPrivate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) {
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
