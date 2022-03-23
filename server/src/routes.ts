const routes = {
  // global
  home: '/',
  category: '/category',

  // auth
  auth: '/auth',
  authFail: '/fail',
  login: '/login',
  get loginSuccess() {
    return `${this.login}/success`;
  },
  logout: '/logout',
  // googleLogin: '/google',
  // get googleLoginCallback() {
  //   return `${this.googleLogin}/callback`;
  // },
  // facebookLogin: '/facebook',
  // get facebookLoginCallback() {
  //   return `${this.facebookLogin}/callback`;
  // },

  // user
  user: '/user',
  myProfile: '/me',
  myVideos: '/me/video',
  userDetail: '/:id',
  userVideo: '/:id/video',
  userPassword: '/password',

  // video
  video: '/video',
  videoDetail: '/:id',
  videoLike: '/:id/like',
  videoComment: '/:id/comment',
  blockVideo: '/:id/block',
  videohistory: '/:id/history',
  videoWatchLater: '/:id/watch-later',
  videoNoInterest: '/:id/no-interest',

  // comment
  comment: '/comment',
  commentDetail: '/:id',
  blockComment: '/:id/block',

  // feed
  feed: '/feed',
  history: '/history',
  watchLater: '/watch-later',
  noInterest: '/no-interest',
};

export default routes;
