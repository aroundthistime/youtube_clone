import express from 'express';
import routes from '../routes';
import {getCategories} from '../controllers/categoryController';

const globalRouter = express.Router();

globalRouter.get(routes.category, getCategories);

export default globalRouter;
