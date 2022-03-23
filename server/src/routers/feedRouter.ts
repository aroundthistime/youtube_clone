import express from 'express';
import {
  clearHistory,
  clearWatchLater,
  getHistory,
  getNoInterest,
  getWatchLater,
} from '../controllers/videoController';
import {onlyPrivate} from '../middlewares';
import routes from '../routes';

const feedRouter = express.Router();

//history
feedRouter.get(routes.history, onlyPrivate, getHistory);
feedRouter.delete(routes.history, onlyPrivate, clearHistory);

//watch-later
feedRouter.get(routes.watchLater, onlyPrivate, getWatchLater);
feedRouter.delete(routes.watchLater, onlyPrivate, clearWatchLater);

//no-interest
feedRouter.get(routes.noInterest, onlyPrivate, getNoInterest);

export default feedRouter;
