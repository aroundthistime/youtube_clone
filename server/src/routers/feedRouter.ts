import express from 'express';
import {
  addNoInterest,
  addWatchLater,
  clearHistory,
  clearWatchLater,
  deleteHistory,
  deleteNoInterest,
  deleteWatchLater,
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
feedRouter.delete(routes.historyDetail, onlyPrivate, deleteHistory);

//watch-later
feedRouter.get(routes.watchLater, onlyPrivate, getWatchLater);
feedRouter.delete(routes.watchLater, onlyPrivate, clearWatchLater);
feedRouter.post(routes.watchLaterDetail, onlyPrivate, addWatchLater);
feedRouter.delete(routes.watchLaterDetail, onlyPrivate, deleteWatchLater);

//no-interest
feedRouter.get(routes.noInterest, onlyPrivate, getNoInterest);
feedRouter.post(routes.noInterestDetail, onlyPrivate, addNoInterest);
feedRouter.delete(routes.noInterestDetail, onlyPrivate, deleteNoInterest);

export default feedRouter;
