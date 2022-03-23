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
import {
  MongooseFindQuery,
  PopulateWithPaginationOptions,
} from '../@types/mongooseTypes';

const VIDEO_FETCH_UNIT = 10; //한 번에 fetch하는 video의 수

export const getVideoFromStringId = async (id: string): Promise<VideoType> => {
  const objectId = getObjectIdFromString(id);
  const video = await Video.findById(objectId);
  return video;
};

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
    const videoFindQuery = getVideoFindQuery(keyword, category);
    let videos = await Video.find(videoFindQuery)
      .sort(getVideoSortOptions(sortMethod))
      .skip((page - 1) * VIDEO_FETCH_UNIT)
      .limit(VIDEO_FETCH_UNIT)
      .populate('creator');
    if (req.user) {
      videos = filterNoInterestVideos(videos, req.user);
    }
    returnVideosWithPaginationSuccessResponse(res, videos);
  } catch {
    returnErrorResponse(res);
  }
};

const getVideoFindQuery = (
  keyword: string | undefined,
  category: string | undefined,
): MongooseFindQuery<VideoType> => {
  const videoFindQuery: MongooseFindQuery<VideoType> = {};
  if (keyword) {
    videoFindQuery.title = {
      $regex: keyword,
      $options: 'i',
    };
  }
  if (category) {
    videoFindQuery.category = category;
  }
  return videoFindQuery;
};

const filterNoInterestVideos = (
  videos: VideoType[],
  user: UserType,
): VideoType[] => {
  return videos.filter((video) => !user.noInterest.includes(video.id));
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
    const user = await User.findById(getObjectIdFromString(userId)).populate(
      getBriefVideoPopulateParameter('videos', page, sortMethod),
    );
    returnVideosWithPaginationSuccessResponse(res, user.videos);
  } catch {
    returnErrorResponse(res);
  }
};

export const uploadVideo = async (req: Request<{}, {}>, res: Response) => {
  try {
    const {
      body: {title, description, category},
    } = req;
    const {videoFile, thumbnailImage} = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };
    const fileUrl = videoFile[0].path;
    const thumbnailUrl = thumbnailImage[0].path;
    const newVideo = await Video.create({
      fileUrl,
      thumbnailUrl,
      title,
      description,
      category,
      creator: req.user.id,
    });
    req.user.videos.push(newVideo.id);
    req.user.save();
    res.status(200).json({
      result: true,
      videoId: newVideo.id,
    });
  } catch {
    returnErrorResponse(res);
  }
};

type getVideoDetailParams = {
  id: string;
};

export const getVideo = async (
  req: Request<getVideoDetailParams>,
  res: Response,
) => {
  const {
    params: {id},
  } = req;
  try {
    const video = await getVideoFromStringId(id);
    video.populate({
      path: 'creator',
      model: 'User',
    });
    // const video = await Video.findById(id).populate({
    //   path: 'creator',
    //   model: 'User',
    // });
    let isLiked: boolean = false;
    if (req.user) {
      addVideoToUserHistory(req.user, video);
      increaseVideoView(video);
      isLiked = videoIsLiked(req.user, video);
    }
    res.status(200).json({
      result: true,
      video: {
        ...video,
        commentsCount: video.comments.length,
        isLiked,
      },
    });
  } catch (error) {
    returnErrorResponse(res);
  }
};

const addVideoToUserHistory = (user: UserType, video: VideoType) => {
  const index = user.history.indexOf(video._id);
  if (index > -1) {
    user.history.splice(index, 1);
  }
  user.history.push(video);
  user.save();
};

const increaseVideoView = (video: VideoType) => {
  video.views += 1;
  video.save();
};

const videoIsLiked = (user: UserType, video: VideoType): boolean => {
  return user.liked.includes(video._id);
};

type EditVideoParams = {
  id: string;
};

type EditVideoBody = {
  title: string;
  description: string;
};

export const editVideo = async (
  req: Request<EditVideoParams, {}, EditVideoBody>,
  res: Response,
) => {
  try {
    const {
      params: {id},
      body: {title, description},
    } = req;
    const video = await getVideoFromStringId(id);
    // const video = await Video.findById(getObjectIdFromString(id));
    if (!userHasRightsForTheVideo(req.user, video)) {
      throw Error;
    }
    video.title = title;
    video.description = description;
    video.save();
    returnSuccessResponse(res);
  } catch {
    returnErrorResponse(res);
  }
};

export const deleteVideo = async (req: Request, res: Response) => {
  try {
    const {
      params: {id},
    } = req;
    const video = await getVideoFromStringId(id);
    // const videoId = getObjectIdFromString(id);
    // const video = await Video.findById(getObjectIdFromString(id));
    if (!userHasRightsForTheVideo(req.user, video)) {
      throw Error;
    }
    Video.findByIdAndDelete(video._id);
    returnSuccessResponse(res);
  } catch {
    returnErrorResponse(res);
  }
};

const userHasRightsForTheVideo = (
  user: UserType,
  video: VideoType,
): boolean => {
  return user && user.id === video.creator._id;
};

export const likeVideo = async (req: Request<{id: string}>, res: Response) => {
  try {
    const {
      params: {id},
      user,
    } = req;
    await addVideoToList(user.liked, id);
    user.save();
    returnSuccessResponse(res);
  } catch {
    returnErrorResponse(res);
  }
};

export const unlikedVideo = async (
  req: Request<{id: string}>,
  res: Response,
) => {
  try {
    const {
      params: {id},
      user,
    } = req;
    await deleteVideoFromList(user.liked, id);
    user.save();
    returnSuccessResponse(res);
  } catch {
    returnErrorResponse(res);
  }
};

type GetHistoryQuery = {
  page: string;
};

export const getHistory = async (
  req: Request<{}, {}, {}, GetHistoryQuery>,
  res: Response,
) => {
  try {
    const page = parseInt(req.query.page);
    const user = await User.findById(req.user._id).populate(
      getBriefVideoPopulateParameter('history', page),
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
    const user = await User.findById(req.user._id);
    await deleteVideoFromList(user.history, id);
    await user.save();
    returnSuccessResponse(res);
  } catch {
    returnErrorResponse(res);
  }
};

export const getWatchLater = async (
  req: Request<{}, {}, {}, {page: string}>,
  res: Response,
) => {
  try {
    const page = parseInt(req.query.page);
    const user = await User.findById(req.user._id).populate(
      getBriefVideoPopulateParameter('watchLater', page),
    );
    returnVideosWithPaginationSuccessResponse(res, user.watchLater);
  } catch {
    returnErrorResponse(res);
  }
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
  req: Request<{}, {}, {}, {page: string}>,
  res: Response,
) => {
  try {
    const page = parseInt(req.query.page);
    const user = await User.findById(req.user._id).populate(
      getBriefVideoPopulateParameter('noInterest', page),
    );
    returnVideosWithPaginationSuccessResponse(res, user.noInterest);
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
    sort: getVideoSortOptions(sortMethod),
  };
};

const getBriefVideoPopulateParameter = (
  path: string,
  page: number,
  sortMethod?: VideoSortMethodType,
) => {
  return {
    path,
    options: getVideoWithPaginationPopulateOptions(page, sortMethod),
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
