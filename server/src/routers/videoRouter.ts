import express from 'express';
import routes from '../routes';
import {multerUploadVideo, onlyPrivate} from '../middlewares';
import {addComment, getVideoComments} from '../controllers/commentController';
import {
  deleteVideo,
  editVideo,
  getVideo,
  getVideos,
  likeVideo,
  unlikedVideo,
  uploadVideo,
} from '../controllers/videoController';

const videoRouter = express.Router();

videoRouter.get('/', getVideos);
videoRouter.post('/', onlyPrivate, multerUploadVideo, uploadVideo);
videoRouter.get(routes.videoDetail, getVideo);
videoRouter.patch(routes.videoDetail, onlyPrivate, editVideo);
videoRouter.delete(routes.videoDetail, onlyPrivate, deleteVideo);
videoRouter.post(routes.videoLike, onlyPrivate, likeVideo);
videoRouter.delete(routes.videoLike, onlyPrivate, unlikedVideo);
videoRouter.get(routes.videoComment, getVideoComments);
videoRouter.post(routes.videoComment, onlyPrivate, addComment);

export default videoRouter;
