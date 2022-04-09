import multer from 'multer';
import {Request, Response, NextFunction} from 'express';
import {returnErrorResponse} from './utils/responseHandler';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';

const s3 = new aws.S3({
  credentials: {
    accessKeyId: process.env.AWS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
  region: 'ap-northeast-2',
});

const multerVideo = multer({
  storage: multerS3({
    s3,
    bucket: 'yutube-bucket',
    acl: 'public-read',
    key: function (req, file, cb) {
      if (file.fieldname === 'videoFile') {
        cb(null, `video/${Date.now().toString()}`);
      } else {
        cb(null, `thumbnail/${Date.now().toString()}`);
      }
    },
  }),
});

const multerAvatar = multer({
  storage: multerS3({
    s3,
    bucket: 'yutube-bucket',
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, `avatar/${Date.now().toString()}`);
    },
  }),
});

export const multerUploadVideo = multerVideo.fields([
  {name: 'videoFile'},
  {name: 'thumbnailImage'},
]);

export const multerUploadAvatar = multerAvatar.single('avatar');

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
    returnErrorResponse(res);
  } else {
    next();
  }
};
