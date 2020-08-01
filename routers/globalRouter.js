import express from "express";
import routes from "../routes";
import { home, search, category } from "../controllers/videoController";
import {
  join,
  login,
  logout,
  postJoin,
  getJoin,
  getLogin,
  postLogin,
} from "../controllers/userController";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin);
globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);
globalRouter.get(routes.logout, logout);
globalRouter.get(routes.search, search);
globalRouter.get(routes.category(), category);

export default globalRouter;
