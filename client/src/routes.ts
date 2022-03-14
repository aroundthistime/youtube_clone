// global
const HOME = '/';
const JOIN = '/join';
const LOGIN = '/login';

// feed
const FEED = '/feed';
const HISTORY = '/history';
const WATCH_LATER = '/watch-later';
const LIKED_VIDEOS = '/liked-videos';

// user
const USERS = '/user';
const MY_PROFILE = '/me';
const USER_DETAIL = '/:id';
const EDIT_PROFILE = '/edit';

// video
const VIDEOS = '/video';
const UPLOAD_VIDEO = '/upload';
const VIDEO_DETAIL = '/:id';
const EDIT_VIDEO = '/:id/edit';

const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  feed: FEED,
  history: HISTORY,
  watchLater: WATCH_LATER,
  likedVideos: LIKED_VIDEOS,
  users: USERS,
  myProfile: MY_PROFILE,
  editProfile: EDIT_PROFILE,
  userDetail: (id?: string) => {
    if (id) {
      return `/users/${id}`;
    }
    return USER_DETAIL;
  },
  videos: VIDEOS,
  uploadVideo: UPLOAD_VIDEO,
  videoDetail: (id?: string) => {
    if (id) {
      return `/video/${id}`;
    }
    return VIDEO_DETAIL;
  },
  editVideo: (id?: string) => {
    if (id) {
      return `/video/${id}/edit`;
    }
    return EDIT_VIDEO;
  },
};

export default routes;
