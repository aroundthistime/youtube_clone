import express from 'express';
import {
  clearHistory,
  deleteHistory,
  getHistory,
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

export default feedRouter;
