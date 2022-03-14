const routes = {
  // global
  home: '/',
  category: '/gategory',

  // auth
  auth: '/auth',
  authFail: '/fail',
  logout: '/logout',

  //login
  login: '/login',
  loginSuccess: '/success',
  loginFail: '/fail',
  googleLogin: '/google',
  get googleLoginCallback() {
    return `${this.googleLogin}/callback`;
  },
  facebookLogin: '/facebook',
  get facebookLoginCallback() {
    return `${this.facebookLogin}/callback`;
  },

  // user
  user: '/user',
  userDetail: '/:id',
  userVideo: '/:id/video',
  userPassword: '/password',

  // video
  video: '/video',
  videoDetail: '/:id',
  videoLike: '/:id/like',
  videoComment: '/:id/comment',
  blockVideo: '/:id/block',

  // comment
  comment: '/comment',
  commentDetail: '/:id',
  blockComment: '/:id/block',

  // feed
  feed: '/feed',
  history: '/history',
  get historyDetail() {
    return `${this.history}/:id`;
  },
  watchLater: '/watch-later',
  get watchLaterDetail() {
    return `${this.watchLater}/:id`;
  },
  noInterest: '/no-interest',
  get noInterestDetail() {
    return `${this.noInterest}/:id`;
  },
};

export default routes;
