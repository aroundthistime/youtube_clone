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
import routes from '../routes';

const feedRouter = express.Router();

//history
feedRouter.get(routes.history, getHistory);
feedRouter.delete(routes.history, clearHistory);
feedRouter.delete(routes.historyDetail, deleteHistory);

//watch-later
feedRouter.get(routes.watchLater, getWatchLater);
feedRouter.delete(routes.watchLater, clearWatchLater);
feedRouter.post(routes.watchLaterDetail, addWatchLater);
feedRouter.delete(routes.watchLaterDetail, deleteWatchLater);

//no-interest
feedRouter.get(routes.noInterest, getNoInterest);
feedRouter.post(routes.noInterestDetail, addNoInterest);
feedRouter.delete(routes.noInterestDetail, deleteNoInterest);

export default feedRouter;
