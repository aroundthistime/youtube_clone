import express from "express";
import routes from "../routes";
import { videoDetail, deleteVideo, getVideoUpload, postVideoUpload, getEditVideo, postEditVideo } from "../controllers/videoController";
import { uploadVideo } from "../middlewares";

const videoRouter = express.Router();

// Upload Video
videoRouter.get(routes.upload, getVideoUpload);
videoRouter.post(routes.upload, uploadVideo, postVideoUpload);

//Video Detail
videoRouter.get(routes.videoDetail(), videoDetail);

//Edit Video
videoRouter.get(routes.editVideo(), getEditVideo);
videoRouter.post(routes.editVideo(), postEditVideo);

//Delete Video
videoRouter.get(routes.deleteVideo(), deleteVideo);

export default videoRouter;
