import express from 'express';
import routes from '../routes';
import {multerUploadVideo, onlyPrivate} from '../middlewares';
import {addComment, getVideoComments} from '../controllers/commentController';
import {
  addNoInterest,
  addWatchLater,
  deleteHistory,
  deleteNoInterest,
  deleteVideo,
  deleteWatchLater,
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

videoRouter.delete(routes.videohistory, onlyPrivate, deleteHistory);
videoRouter.post(routes.videoWatchLater, onlyPrivate, addWatchLater);
videoRouter.delete(routes.videoWatchLater, onlyPrivate, deleteWatchLater);
videoRouter.post(routes.videoNoInterest, onlyPrivate, addNoInterest);
videoRouter.delete(routes.videoNoInterest, onlyPrivate, deleteNoInterest);

export default videoRouter;
