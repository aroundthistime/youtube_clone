import {Request, Response} from 'express';
import stringSimilarity from 'string-similarity';
import {HydratedDocument, Types} from 'mongoose';
import routes from '../routes';
import Video, {VideoType} from '../models/Video';
import Comment from '../models/Comment';
import User, {UserType} from '../models/User';
import {
  DefaultResponseType,
  VideosFetchSuccessWithPaginationResponse,
} from '../@types/responseType';
import mongoose from 'mongoose';
import {
  getObjectIdFromString,
  getVideoSortOptions,
} from '../utils/mongooseUtils';
import {returnSuccessResponse} from '../utils/responseHandler';
import {getReversedPaginationFetchIndexRange} from '../utils/arrayHandler';
import {SortOptionType, VideoSortMethodType} from '../@types/sortMethod';
import {CategoryType} from '../@types/categoryType';
import {AtLeastOne} from '../@types/UtilityTypes';
import {PopulateWithPaginationOptions} from '../@types/mongooseTypes';
// import { reset } from "nodemon"; // not sure why this thing came out

const VIDEO_FETCH_UNIT = 20; //한 번에 fetch하는 video의 수

type GetVideosQuery = {
  sortMethod: VideoSortMethodType;
  page: number;
  keyword?: string;
  category?: CategoryType;
};

export const getVideos = async (
  req: Request<{}, {}, {}, GetVideosQuery>,
  res: Response,
) => {
  try {
    const {keyword, sortMethod, category, page} = req.query;
  } catch {
    returnErrorResponse(res);
  }
};

type GetUserVideosParams = {
  id: string;
};
type GetUserVideosQuery = {
  sortMethod: VideoSortMethodType;
  page: number;
};

export const getUserVideos = async (
  req: Request<GetUserVideosParams, {}, {}, GetUserVideosQuery>,
  res: Response,
) => {
  try {
    const {
      params: {id: userId},
      query: {sortMethod, page},
    } = req;
    console.log(userId);
    const user = await User.findById(getObjectIdFromString(userId)).populate({
      path: 'videos',
      model: 'Video',
      options: getVideoWithPaginationPopulateOptions(page, sortMethod),
    });
    const b = user.videos;
    console.log(user.videos);
    // returnVideosWithPaginationSuccessResponse(res, user.videos);
  } catch (error) {
    console.log(error);
    returnErrorResponse(res);
  }
};

const checkVideoUnblocked = (video, user) => {
  if (
    !user.noInterest.includes(video.id) &&
    !user.blockedUsers.includes(video.creator.id)
  ) {
    return true;
  }
  return false;
};

const checkVideoNotAlreadyWatched = (video, user) => {
  if (!user.history.includes(video.id)) {
    return true;
  }
  return false;
};

export const home = async (req, res) => {
  try {
    let videos = await Video.find({}).populate('creator').sort({_id: -1});
    if (req.user) {
      // when logged in, filter nointerest and blocked channel videos
      videos = videos.filter(
        (video) =>
          checkVideoUnblocked(video, req.user) &&
          checkVideoNotAlreadyWatched(video, req.user),
      );
    }
    res.render('home', {pageTitle: 'Home', videos});
  } catch (error) {
    console.log(error);
    res.render('home', {pageTitle: 'Home', videos: []});
  }
};

// const compare_by_view = (a, b) => a.views * -1 - b.views * -1;

// const compare_by_oldest = (a, b) =>
//   new Date(a.uploadTime) - new Date(b.uploadTime);

// const compare_by_newest = (a, b) =>
//   new Date(b.uploadTime) - new Date(a.uploadTime);

// export const search = async (req, res) => {
//   const {
//     query: {term: searchingBy, sort},
//   } = req; // = const searchingBy = query.term
//   let videos = [];
//   try {
//     // checks exact same words only ignoring upper or lower cases.
//     videos = await Video.find({
//       title: {$regex: searchingBy, $options: 'i'},
//     }).populate('creator');
//   } catch (error) {
//     console.log(error);
//   }
//   try {
//     // check words with similarities
//     const allVideos = await Video.find({});
//     allVideos.forEach((video) => {
//       if (
//         stringSimilarity.compareTwoStrings(video.title, searchingBy) >= 0.3 &&
//         !videos.find((v) => v.id === video.id)
//       ) {
//         videos.push(video);
//       }
//     });
//   } catch (error) {
//     console.log(error);
//   }
//   if (req.user) {
//     // when logged in, filter nointerest and blocked channel videos
//     videos = videos.filter((video) => checkVideoUnblocked(video, req.user));
//   }
//   if (sort == 1) {
//     // sort by most popular - most views come first
//     videos.sort(compare_by_view);
//   } else if (sort == 2) {
//     // sort by date(oldest)
//     videos.sort(compare_by_oldest);
//   } else if (sort == 3) {
//     // sort by date(newest)
//     videos.sort(compare_by_newest);
//   } // else == relevance, don't have to do anything
//   res.render('search', {pageTitle: 'Search', searchingBy, videos}); // if the value is same as the key, you can just send the name of the key only (then it will automatically think that the key has a value which is a variable of a same name of the key)
// };

// export const getCategory = async (req, res) => {
//   const {
//     params: {category},
//     query: {sort},
//   } = req;
//   let videos;
//   try {
//     if (sort == 1) {
//       // sort by most popular - most views come first
//       videos = await Video.find({category})
//         .populate('creator')
//         .sort({views: -1});
//     } else if (sort == 2) {
//       // sort by date(oldest)
//       videos = await Video.find({category}).populate('creator');
//     } else {
//       // sort by date(newest) - default
//       videos = await Video.find({category}).populate('creator').sort({_id: -1});
//     }
//     if (req.user) {
//       // when logged in, filter nointerest and blocked channel videos
//       videos = videos.filter((video) => checkVideoUnblocked(video, req.user));
//     }
//     res.render('category', {pageTitle: category, category, videos});
//   } catch (error) {
//     console.log(error);
//     res.redirect(routes.home);
//   }
// };

type GetHistoryQuery = {
  page: number;
};

export const getHistory = async (
  req: Request<{}, {}, {}, GetHistoryQuery>,
  res: Response,
) => {
  try {
    const {page} = req.query;
    const user = await User.findById(req.user._id).populate(
      getFeedVideoPopulateParameter('history', page),
    );
    returnVideosWithPaginationSuccessResponse(res, user.history);
  } catch {
    returnErrorResponse(res);
  }
};

export const clearHistory = async (req: Request, res: Response) => {
  try {
    req.user.history = [];
    req.user.save();
    returnSuccessResponse(res);
  } catch {
    returnErrorResponse(res);
  }
};

export const deleteHistory = async (req: Request, res: Response) => {
  try {
    const {
      params: {id},
    } = req;
    const user = await User.findById(req.user.id);
    await deleteVideoFromList(user.history, id);
    // const filteredHistory = user.history.filter((videoId) => videoId !== id);
    // user.history = filteredHistory;
    await user.save();
    returnSuccessResponse(res);
  } catch {
    returnErrorResponse(res);
  }
};

export const getWatchLater = async (
  req: Request<{}, {}, {}, {page: number}>,
  res: Response,
) => {
  try {
    const {page} = req.query;
    const user = await User.findById(req.user._id).populate(
      getFeedVideoPopulateParameter('watchLater', page),
    );
    returnVideosWithPaginationSuccessResponse(res, user.watchLater);
  } catch {
    returnErrorResponse(res);
  }
  // this one as well, not going to filter video if the user already added the video to watch Later
  // const videos = [];
  // for (let i = 0; i < req.user.watchLater.length; i++) {
  //   const video = await Video.findById(req.user.watchLater[i]).populate(
  //     'creator',
  //   );
  //   videos.push(video);
  // }
  // videos.reverse();
  // const category = 'Watch Later';
  // res.render('category', {
  //   pageTitle: category,
  //   category,
  //   videos,
  // });
};

export const clearWatchLater = async (req: Request, res: Response) => {
  try {
    req.user.watchLater = [];
    req.user.save();
    returnSuccessResponse(res);
  } catch {
    returnErrorResponse(res);
  }
};

type AddWatchLaterParams = {
  id: string;
};

export const addWatchLater = async (
  req: Request<AddWatchLaterParams>,
  res: Response,
) => {
  const {
    params: {id},
    user,
  } = req;
  try {
    await addVideoToList(user.watchLater, id);
    user.save();
    returnSuccessResponse(res);
  } catch {
    returnErrorResponse(res);
  }
};

export const deleteWatchLater = async (req: Request, res: Response) => {
  const {
    params: {id},
    user,
  } = req;
  try {
    await deleteVideoFromList(user.watchLater, id);
    user.save();
    returnSuccessResponse(res);
  } catch (error) {
    returnErrorResponse(res);
  }
};

export const getNoInterest = async (
  req: Request<{}, {}, {}, {page: number}>,
  res: Response,
) => {
  try {
    const {page} = req.query;
    const user = await User.findById(req.user._id).populate(
      getFeedVideoPopulateParameter('noInterest', page),
    );
    returnVideosWithPaginationSuccessResponse(res, user.watchLater);
  } catch {
    returnErrorResponse(res);
  }
};

export const addNoInterest = async (req: Request, res: Response) => {
  const {
    params: {id},
    user,
  } = req;
  try {
    await addVideoToList(user.noInterest, id);
    user.save();
    returnSuccessResponse(res);
  } catch {
    returnErrorResponse(res);
  }
};

export const deleteNoInterest = async (req: Request, res: Response) => {
  const {
    params: {id},
    user,
  } = req;
  try {
    await deleteVideoFromList(user.noInterest, id);
    user.save();
    returnSuccessResponse(res);
  } catch (error) {
    returnErrorResponse(res);
  }
};

// export const getVideoUpload = (req, res) =>
//   res.render('uploadVideo', {pageTitle: 'Upload'});

// export const postVideoUpload = async (req, res) => {
//   console.log(req.files);
//   const fileUrl = req.files.videoFile[0].path;
//   const {
//     body: {title, description, category},
//   } = req;
//   // upload and save video, after it finishes uploading, redirect user to the videodetail page of the video
//   let newVideo;
//   if (req.files.thumbnailImage) {
//     const thumbnailUrl = req.files.thumbnailImage[0].path;
//     newVideo = await Video.create({
//       fileUrl,
//       thumbnailUrl,
//       title,
//       description,
//       category,
//       creator: req.user.id,
//     });
//   } else {
//     newVideo = await Video.create({
//       fileUrl,
//       title,
//       description,
//       category,
//       creator: req.user.id,
//     });
//   }
//   req.user.videos.push(newVideo.id);
//   req.user.save();
//   res.redirect(routes.videoDetail(newVideo.id));
// };

// export const videoDetail = async (req, res) => {
//   const {
//     params: {id},
//   } = req;
//   try {
//     const video = await Video.findById(id)
//       .populate({
//         path: 'creator',
//         model: 'User',
//         populate: {path: 'blockedComments', model: 'Comment'},
//       })
//       .populate({
//         path: 'comments',
//         model: 'Comment',
//         populate: {path: 'creator', model: 'User'},
//       });
//     const {category} = video;
//     const videosRecommended = [];
//     const sameCategory = await Video.find({category})
//       .populate('creator')
//       .sort({views: -1}); // should change to real recommendations.
//     sameCategory.some((v) => {
//       if (
//         video.id !== v.id &&
//         (!req.user ||
//           (checkVideoUnblocked(v, req.user) &&
//             checkVideoNotAlreadyWatched(v, req.user)))
//       ) {
//         videosRecommended.push(v);
//       }
//       return videosRecommended.length >= 5;
//     });
//     let popularVideos = await Video.find({})
//       .populate('creator')
//       .sort({_id: -1});
//     popularVideos = popularVideos.filter(
//       (v) =>
//         video.id !== v.id &&
//         !videosRecommended.includes(v) &&
//         (!req.user ||
//           (checkVideoUnblocked(v, req.user) &&
//             checkVideoNotAlreadyWatched(v, req.user))),
//     );
//     popularVideos.some((v) => {
//       videosRecommended.push(v);
//       return videosRecommended.length >= 10;
//     });
//     if (req.user) {
//       // add the video to user's history
//       const user = await User.findById(req.user._id);
//       const index = user.history.indexOf(video._id);
//       if (index > -1) {
//         user.history.splice(index, 1);
//       }
//       user.history.push(video);
//       if (user.history.length > 50) {
//         user.history.shift();
//       }
//       user.save();
//     }
//     res.render('videoDetail', {
//       pageTitle: video.title,
//       video,
//       videosRecommended,
//     });
//   } catch (error) {
//     console.log(error);
//     res.render('userDetail', {pageTitle: 'Video not Found', user: null});
//     // don't worry about movign to userDetail, if the video doesn't exist the user goes to a page that says the video doensn't exist which just shares userDetail pug file
//   }
// };
// export const getEditVideo = async (req, res) => {
//   const {
//     params: {id},
//   } = req;
//   try {
//     const video = await Video.findById(id);
//     if (req.user && video.creator._id == req.user.id) {
//       res.render('editVideo', {pageTitle: `[Edit] ${video.title}`, video});
//     } else {
//       res.render('editVideo', {pageTitle: 'Video Edit Error', video: null});
//     }
//   } catch (error) {
//     res.redirect(routes.home);
//   }
// };

// export const postEditVideo = async (req, res) => {
//   const {
//     params: {id},
//     body: {title, description},
//   } = req;
//   try {
//     await Video.findOneAndUpdate({_id: id}, {title, description}); // remember! it is _id not id how things are saved in the mongoose db
//     res.redirect(routes.videoDetail(id));
//   } catch (error) {
//     res.redirect(routes.home);
//   }
// };

// export const deleteVideo = async (req, res) => {
//   const {
//     params: {id},
//   } = req;
//   try {
//     const video = await Video.findById(id);
//     if (req.user && video.creator._id == req.user.id) {
//       await Video.findByIdAndRemove(id);
//       res.render(routes.home);
//     } else {
//       res.render('editVideo', {pageTitle: 'Video Delete Error', video: null});
//     }
//   } catch (error) {}
//   res.redirect(routes.home);
// };

// export const postRegisterView = async (req, res) => {
//   const {
//     params: {id},
//   } = req;
//   try {
//     const video = await Video.findById(id);
//     video.views += 1;
//     video.save();
//     res.status(200);
//   } catch (error) {
//     res.status(400);
//   } finally {
//     res.end();
//   }
// };

const addVideoToList = async (
  videos: Types.ObjectId[],
  videoIdStr: string,
): Promise<void> => {
  const videoId = getObjectIdFromString(videoIdStr);
  const videoIndex = videos.indexOf(videoId);
  if (videoIndex === -1) {
    videos.push(videoId);
  }
};

const deleteVideoFromList = async (
  videos: Types.ObjectId[],
  videoIdStr: string,
): Promise<void> => {
  const videoId = getObjectIdFromString(videoIdStr);
  const videoIndex = videos.indexOf(videoId);
  if (videoIndex > -1) {
    videos.splice(videoIndex, 1);
  }
};

const returnVideosWithPaginationSuccessResponse = (
  res: Response,
  videos: VideoType[],
) => {
  res.status(200).json({
    result: true,
    videos,
    hasNextPage: videos.length > 0,
  });
};

const getVideoWithPaginationPopulateOptions = (
  page: number,
  sortMethod?: VideoSortMethodType,
): PopulateWithPaginationOptions<VideoType> => {
  return {
    limit: VIDEO_FETCH_UNIT,
    skip: page * VIDEO_FETCH_UNIT,
    sort: sortMethod ? getVideoSortOptions(sortMethod) : {},
  };
};

const getFeedVideoPopulateParameter = (path: string, page: number) => {
  return {
    path,
    options: getVideoWithPaginationPopulateOptions(page),
    populate: {
      path: 'creator',
      model: 'User',
    },
  };
};

const returnErrorResponse = (res: Response) => {
  res.status(400).json({
    result: false,
  });
};
