import express from "express";
import routes from "../routes";
import {
  postRegisterView,
  postAddComment,
  postEditComment,
  postDeleteComment,
  postBlockComment,
  postAddWatchLater,
  postUndoAddWatchLater,
  postNoInterest,
  postUndoNoInterest,
  postBlockChannel,
  postUndoBlockChannel,
  postRemoveHistory,
} from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterView);
apiRouter.post(routes.addComment, postAddComment);
apiRouter.post(routes.deleteComment, postDeleteComment);
apiRouter.post(routes.editComment, postEditComment);
apiRouter.post(routes.blockComment, postBlockComment);
apiRouter.post(routes.addWatchLater, postAddWatchLater);
apiRouter.post(routes.undoWatchLater, postUndoAddWatchLater);
apiRouter.post(routes.noInterest, postNoInterest);
apiRouter.post(routes.undoNoInterest, postUndoNoInterest);
apiRouter.post(routes.blockChannel, postBlockChannel);
apiRouter.post(routes.undoBlockChannel, postUndoBlockChannel);
apiRouter.post(routes.removeHistory, postRemoveHistory);

export default apiRouter;
