import express from 'express';
import routes from '../routes';
import {uploadVideo, onlyPrivate} from '../middlewares';
import {addComment, getVideoComments} from '../controllers/commentController';
import {getVideos} from '../controllers/videoController';

const videoRouter = express.Router();

// // Upload Video
// videoRouter.get(routes.upload, onlyPrivate, getVideoUpload);
// videoRouter.post(routes.upload, onlyPrivate, uploadVideo, postVideoUpload);

// // Video Detail
// videoRouter.get(routes.videoDetail(), videoDetail);

// // Edit Video
// videoRouter.get(routes.editVideo(), onlyPrivate, getEditVideo);
// videoRouter.post(routes.editVideo(), onlyPrivate, postEditVideo);

// // Delete Video
// videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo);

// 여기서부터 내가함
videoRouter.get(routes.video, getVideos);
videoRouter.post(routes.video, uploadVideo);
videoRouter.get(routes.videoComment, getVideoComments);
videoRouter.post(routes.videoComment, addComment);

export default videoRouter;
