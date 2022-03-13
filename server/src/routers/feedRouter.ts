import express from 'express';
import {clearHistory, getHistory} from '../controllers/videoController';
import routes from '../routes';

const feedRouter = express.Router();

feedRouter.get(routes.history, getHistory);
feedRouter.delete(routes.history, clearHistory);

export default feedRouter;
