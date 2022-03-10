// global
const HOME = "/";
const JOIN = "/join";
const JOIN_FAIL = "/joinFail";
const LOGIN = "/login";
const LOGIN_FAIL = "/loginFail";
const LOGOUT = "/logout";
const SEARCH = "/search";
const HISTORY = "/history";
const CLEAR_HISTORY = "/clearHistory;";
const WATCH_LATER = "/watchLater";
const CATEGORY = "/:category";

//social-login
const GOOGLE = "/auth/google";
const GOOGLE_CALLBACK = "/auth/google/callback";
const FACEBOOK = "/auth/facebook";
const FACEBOOK_CALLBACK = "/auth/facebook/callback";

// users
const USERS = "/users";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";
const CHANGE_PASSWORD_FAIL = "/change-password-fail";
const MY_PROFILE = "/my-profile";
const USER_DETAIL = "/:id";

//videos

const VIDEOS = "/videos";
const UPLOAD = "/upload";
const VIDEO_DETAIL = "/:id";
const EDIT_VIDEO = "/:id/edit";
const DELETE_VIDEO = "/:id/delete";

//API - URL to communicate with the server
const API = "/api";
const REGISTER_VIEW = "/:id/view";
const ADD_COMMENT = "/:id/comment";
const EDIT_COMMENT = "/:id/edit-comment";
const DELETE_COMMENT = "/:id/delete-comment";
const BLOCK_COMMENT = "/block-comment";
const ADD_WATCH_LATER = "/:id/addWatchLater";
const UNDO_WATCH_LATER = "/:id/undoWatchLater";
const NO_INTEREST = "/:id/noInterest";
const UNDO_NO_INTEREST = "/:id/undoNoInterest";
const BLOCK_CHANNEL = "/:id/blockChannel";
const UNDEO_BLOCK_CHANNEL = "/:id/undoBlockChannel";
const REMOVE_HISTORY = "/:id/removeHistory";

const routes = {
  home: HOME,
  join: JOIN,
  joinFail: JOIN_FAIL,
  login: LOGIN,
  loginFail: LOGIN_FAIL,
  logout: LOGOUT,
  search: SEARCH,
  history: HISTORY,
  clearHistory: CLEAR_HISTORY,
  watchLater: WATCH_LATER,
  category: (category) => {
    if (category) {
      return "/${category}";
    } else {
      return CATEGORY;
    }
  },
  users: USERS,
  userDetail: (id) => {
    if (id) {
      return `/users/${id}`;
    } else {
      return USER_DETAIL;
    }
  },
  myProfile: MY_PROFILE,
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  changePasswordFail: CHANGE_PASSWORD_FAIL,
  videos: VIDEOS,
  upload: UPLOAD,
  videoDetail: (id) => {
    if (id) {
      return `/videos/${id}`;
    } else {
      return VIDEO_DETAIL;
    }
  },
  editVideo: (id) => {
    if (id) {
      return `/videos/${id}/edit`;
    } else {
      return EDIT_VIDEO;
    }
  },
  deleteVideo: (id) => {
    if (id) {
      return `/videos/${id}/delete`;
    } else {
      return DELETE_VIDEO;
    }
  },
  google: GOOGLE,
  googleCallback: GOOGLE_CALLBACK,
  facebook: FACEBOOK,
  facebookCallback: FACEBOOK_CALLBACK,
  api: API,
  registerView: REGISTER_VIEW,
  addComment: ADD_COMMENT,
  editComment: EDIT_COMMENT,
  deleteComment: DELETE_COMMENT,
  blockComment: BLOCK_COMMENT,
  addWatchLater: ADD_WATCH_LATER,
  undoWatchLater: UNDO_WATCH_LATER,
  noInterest: NO_INTEREST,
  undoNoInterest: UNDO_NO_INTEREST,
  blockChannel: BLOCK_CHANNEL,
  undoBlockChannel: UNDEO_BLOCK_CHANNEL,
  removeHistory: REMOVE_HISTORY,
};

export default routes;
