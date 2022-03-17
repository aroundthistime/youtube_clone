import {VideoSortMethodType} from './@types/SortMethodType';

const apiUrls = {
  // auth
  auth: '/auth',
  get login() {
    return `${this.auth}/login`;
  },
  get logout() {
    return `${this.auth}/logout`;
  },

  // user
  user: '/user',
  get myProfile() {
    return `${this.user}/me`;
  },
  userDetail: (id: string): string => {
    return `/user/${id}`;
  },
  userVideo: (id: string): string => {
    return `/user/${id}/video`;
  },
  userPassword: (id: string): string => {
    return `/user/${id}/password`;
  },

  // video
  video: '/video',
  videoDetail: (id: string): string => {
    return `/video/${id}`;
  },
  videoLike: (id: string): string => {
    return `/video/${id}/like`;
  },
  videoComment: (id: string): string => {
    return `/video/${id}/comment`;
  },

  // comment
  comment: '/comment',
  commentDetail: (id: string): string => {
    return `/comment/${id}`;
  },
  blockComment: (id: string): string => {
    return `/comment/${id}/block`;
  },

  // category
  category: '/category',

  // feed
  feed: '/feed',
  get history() {
    return `${this.feed}/history`;
  },
  historyDetail: (id: string): string => {
    return `/feed/history/${id}`;
  },
  get watchLater() {
    return `${this.feed}/watch-later`;
  },
  watchLaterDetail: (id: string): string => {
    return `/feed/watch-later/${id}`;
  },
  get noInterest() {
    return `${this.feed}/no-interest`;
  },
  noInterestDetail: (id: string): string => {
    return `/feed/no-interest/${id}`;
  },
};

type ApiRouteType = {
  url: string | ((id: string) => string);
  method: 'get' | 'post' | 'patch' | 'put' | 'delete';
};

const apiRoutes: Record<string, ApiRouteType> = {
  login: {
    url: apiUrls.login,
    method: 'post',
  },
  logout: {
    url: apiUrls.logout,
    method: 'get',
  },
  join: {
    url: apiUrls.user,
    method: 'post',
  },
  editProfile: {
    url: apiUrls.user,
    method: 'patch',
  },
  getMyProfile: {
    url: apiUrls.myProfile,
    method: 'get',
  },
  getUserDetail: {
    url: (id: string) => apiUrls.userDetail(id),
    method: 'get',
  },
  changePassword: {
    url: apiUrls.userPassword,
    method: 'patch',
  },
  getUserVideos: {
    url: (id: string) => apiUrls.userVideo(id),
    method: 'get',
  },
  getVideos: {
    url: apiUrls.video,
    method: 'get',
  },
  uploadVideo: {
    url: apiUrls.video,
    method: 'post',
  },
  getVideo: {
    url: (id: string) => apiUrls.videoDetail(id),
    method: 'get',
  },
  getVideoComments: {},
};

export default apiRoutes;
