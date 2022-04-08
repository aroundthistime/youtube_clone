import express from 'express';
import {
  clearHistory,
  clearWatchLater,
  getHistory,
  getLikedVideos,
  getNoInterest,
  getWatchLater,
} from '../controllers/videoController';
import {onlyPrivate} from '../middlewares';
import routes from '../routes';

const feedRouter = express.Router();

//liked-videos
feedRouter.get(routes.likedVideos, onlyPrivate, getLikedVideos);

//history
feedRouter.get(routes.history, onlyPrivate, getHistory);
feedRouter.delete(routes.history, onlyPrivate, clearHistory);

//watch-later
feedRouter.get(routes.watchLater, onlyPrivate, getWatchLater);
feedRouter.delete(routes.watchLater, onlyPrivate, clearWatchLater);

//no-interest
feedRouter.get(routes.noInterest, onlyPrivate, getNoInterest);

export default feedRouter;
