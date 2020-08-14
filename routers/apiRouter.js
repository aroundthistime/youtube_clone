import express from "express";
import routes from "../routes";
import {
  postRegisterView,
  postAddComment,
  postEditComment,
  postDeleteComment,
  postBlockComment,
} from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterView);
apiRouter.post(routes.addComment, postAddComment);
apiRouter.post(routes.deleteComment, postDeleteComment);
apiRouter.post(routes.editComment, postEditComment);
apiRouter.post(routes.blockComment, postBlockComment);

export default apiRouter;
