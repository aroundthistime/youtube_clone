import express from "express";
import routes from "../routes";
import { videos, videoUpload, videoDetail, editVideo, deleteVideo, getVideoUpload, postVideoUpload } from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get(routes.upload, getVideoUpload);
videoRouter.post(routes.upload, postVideoUpload);
videoRouter.get(routes.videoDetail(), videoDetail);
videoRouter.get(routes.editVideo, editVideo);
videoRouter.get(routes.deleteVideo, deleteVideo);

export default videoRouter;
