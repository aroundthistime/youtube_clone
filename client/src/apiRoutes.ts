import {Method} from 'axios';
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
  get myVideos() {
    return `${this.myProfile}/video`;
  },
  userProfile: (id: string): string => {
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
  videoHistory: (id: string): string => {
    return `/video/${id}/history`;
  },
  videoWatchLater: (id: string): string => {
    return `/video/${id}/watch-later`;
  },
  videoNoInterest: (id: string): string => {
    return `/video/${id}/no-interest`;
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
  get likedVideos() {
    return `${this.feed}/liked-videos`;
  },
  get history() {
    return `${this.feed}/history`;
  },
  get watchLater() {
    return `${this.feed}/watch-later`;
  },
};

type ApiRouteType = {
  url: string | ((id: string) => string);
  method: Method;
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
  getUserProfile: {
    url: (id: string) => apiUrls.userProfile(id),
    method: 'get',
  },
  changePassword: {
    url: apiUrls.userPassword,
    method: 'patch',
  },
  getMyVideos: {
    url: apiUrls.myVideos,
    method: 'get',
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
  editVideo: {
    url: (id: string) => apiUrls.videoDetail(id),
    method: 'patch',
  },
  deleteVideo: {
    url: (id: string) => apiUrls.videoDetail(id),
    method: 'delete',
  },
  likeVideo: {
    url: (id: string) => apiUrls.videoLike(id),
    method: 'post',
  },
  unlikeVideo: {
    url: (id: string) => apiUrls.videoLike(id),
    method: 'delete',
  },
  getVideoComments: {
    url: (id: string) => apiUrls.videoComment(id),
    method: 'get',
  },
  addComment: {
    url: (videoId: string) => apiUrls.videoComment(videoId),
    method: 'post',
  },
  editComment: {
    url: (id: string) => apiUrls.commentDetail(id),
    method: 'patch',
  },
  deleteComment: {
    url: (id: string) => apiUrls.commentDetail(id),
    method: 'delete',
  },
  blockComment: {
    url: (id: string) => apiUrls.blockComment(id),
    method: 'post',
  },
  deleteHistory: {
    url: (id: string) => apiUrls.videoHistory(id),
    method: 'delete',
  },
  addWatchLater: {
    url: (id: string) => apiUrls.videoWatchLater(id),
    method: 'post',
  },
  deleteWatchLater: {
    url: (id: string) => apiUrls.videoWatchLater(id),
    method: 'delete',
  },
  addNoInterest: {
    url: (id: string) => apiUrls.videoNoInterest(id),
    method: 'post',
  },
  deleteNoInterest: {
    url: (id: string) => apiUrls.videoNoInterest(id),
    method: 'delete',
  },
  getCategories: {
    url: apiUrls.category,
    method: 'get',
  },
  getLikedVideos: {
    url: apiUrls.likedVideos,
    method: 'get',
  },
  getHistories: {
    url: apiUrls.history,
    method: 'get',
  },
  clearHistories: {
    url: apiUrls.history,
    method: 'delete',
  },
  getWatchLaters: {
    url: apiUrls.watchLater,
    method: 'get',
  },
  clearWatchLaters: {
    url: apiUrls.watchLater,
    method: 'delete',
  },
};

export default apiRoutes;
