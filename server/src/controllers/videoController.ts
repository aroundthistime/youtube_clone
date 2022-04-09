import {Request, Response} from 'express';
import {Types} from 'mongoose';
import Video, {VideoType} from '../models/Video';
import User, {UserType} from '../models/User';
import {
  getBriefCreatorPopulateOptions,
  getObjectIdFromString,
  getVideoSortOptions,
} from '../utils/mongooseUtils';
import {returnSuccessResponse} from '../utils/responseHandler';
import {VideoSortMethodType} from '../@types/sortMethod';
import {CategoryType} from '../@types/categoryType';
import {
  MongooseFindQuery,
  PopulateWithPaginationOptions,
} from '../@types/mongooseTypes';
import {TimeStandardType} from '../@types/timeStandardType';
import {getDateQueryStartRangeByTimeStandard} from '../utils/dateHandler';

const VIDEO_FETCH_UNIT = 10; //한 번에 fetch하는 video의 수

type GetVideosQuery = {
  sortMethod: VideoSortMethodType;
  page: number;
  keyword?: string;
  category?: CategoryType;
  uploadTime?: TimeStandardType;
};

export const getVideos = async (
  req: Request<{}, {}, {}, GetVideosQuery>,
  res: Response,
) => {
  try {
    const {keyword, sortMethod, category, page, uploadTime} = req.query;
    const videoFindQuery = getVideoFindQuery(keyword, category, uploadTime);
    let videos: any[] = await Video.find(videoFindQuery)
      .sort(getVideoSortOptions(sortMethod))
      .skip((page - 1) * VIDEO_FETCH_UNIT)
      .limit(VIDEO_FETCH_UNIT)
      .populate(getBriefCreatorPopulateOptions())
      .lean();
    if (req.user) {
      const user = await User.findById(req.user._id);
      videos = filterNoInterestVideos(videos, user);
      videos = markWhetherWatchLaterToVideos(videos, user);
    }
    returnVideosWithPaginationSuccessResponse(res, videos);
  } catch {
    returnErrorResponse(res);
  }
};

const getVideoFindQuery = (
  keyword: string | undefined,
  category: string | undefined,
  uploadTime: TimeStandardType | undefined,
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
  if (uploadTime) {
    videoFindQuery.uploadTime = {
      $gte: getDateQueryStartRangeByTimeStandard(uploadTime),
    };
  }
  return videoFindQuery;
};

const filterNoInterestVideos = (
  videos: VideoType[],
  user: UserType,
): VideoType[] => {
  return videos.filter((video) => !user.noInterest.includes(video.id));
};

const markWhetherWatchLaterToVideos = (videos: VideoType[], user: UserType) => {
  return videos.map((video) => {
    return {
      ...video,
      isInWatchLater: user.watchLater.includes(video._id),
    };
  });
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
    const user = await User.findById(userId).populate(
      getBriefVideoPopulateParameter('videos', page, sortMethod),
    );
    returnVideosWithPaginationSuccessResponse(res, user.videos);
  } catch {
    returnErrorResponse(res);
  }
};

export const getMyVideos = async (
  req: Request<{}, {}, {}, GetUserVideosQuery>,
  res: Response,
) => {
  try {
    const {
      query: {sortMethod, page},
    } = req;
    const user = await User.findById(req.user._id).populate(
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
      [fieldname: string]: Request['file'][];
    };
    const fileUrl = videoFile[0].location;
    const thumbnailUrl = thumbnailImage[0].location;
    const newVideo = await Video.create({
      fileUrl,
      thumbnailUrl,
      title,
      description,
      category,
      creator: req.user.id,
    });
    const user = await User.findById(req.user._id);
    user.videos.push(newVideo._id);
    await user.save();
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
    const video = await Video.findById(id);
    increaseVideoView(video);
    let isLiked: boolean | undefined = undefined;
    if (req.user) {
      const user = await User.findById(req.user._id);
      addVideoToList(user.history, video.id);
      await user.save();
      isLiked = user.liked.includes(video._id);
    }
    const leanedVideo = await Video.findById(id)
      .populate(getBriefCreatorPopulateOptions())
      .lean();
    res.status(200).json({
      result: true,
      video: {
        ...leanedVideo,
        commentsCount: video.comments.length,
        isLiked,
      },
    });
  } catch {
    returnErrorResponse(res);
  }
};

const increaseVideoView = async (video: VideoType) => {
  video.views += 1;
  await video.save();
};

type EditVideoParams = {
  id: string;
};

type EditVideoBody = {
  title: string;
  description: string;
  category: string;
};

export const editVideo = async (
  req: Request<EditVideoParams, {}, EditVideoBody>,
  res: Response,
) => {
  try {
    const {
      params: {id},
      body: {title, description, category},
    } = req;
    const video = await Video.findById(id);
    if (!userHasRightsForTheVideo(req.user, video)) {
      throw Error;
    }
    video.title = title;
    video.description = description;
    video.category = category;
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
    const video = await Video.findById(id);
    if (!userHasRightsForTheVideo(req.user, video)) {
      throw Error;
    }
    await Video.findByIdAndDelete(video._id);
    returnSuccessResponse(res);
  } catch {
    returnErrorResponse(res);
  }
};

const userHasRightsForTheVideo = (
  user: UserType,
  video: VideoType,
): boolean => {
  return user && getObjectIdFromString(user._id).equals(video.creator);
};

export const toggleVideoLike = async (
  req: Request<{id: string}>,
  res: Response,
) => {
  try {
    const {
      params: {id},
    } = req;
    const user = await User.findById(req.user._id);
    toggleVideoOfArray(user.liked, id);
    await user.save();
    returnSuccessResponse(res);
  } catch {
    returnErrorResponse(res);
  }
};

export const toggleVideoWatchLater = async (
  req: Request<{id: string}>,
  res: Response,
) => {
  try {
    const {
      params: {id},
    } = req;
    const user = await User.findById(req.user._id);
    toggleVideoOfArray(user.watchLater, id);
    await user.save();
    returnSuccessResponse(res);
  } catch {
    returnErrorResponse(res);
  }
};

export const toggleVideoNotInterested = async (
  req: Request<{id: string}>,
  res: Response,
) => {
  try {
    const {
      params: {id},
    } = req;
    const user = await User.findById(req.user._id);
    toggleVideoOfArray(user.noInterest, id);
    await user.save();
    returnSuccessResponse(res);
  } catch {
    returnErrorResponse(res);
  }
};

const toggleVideoOfArray = (videos: Types.ObjectId[], videoIdStr: string) => {
  const videoId = getObjectIdFromString(videoIdStr);
  const videoIndex = videos.indexOf(videoId);
  if (videoIndex > -1) {
    videos.splice(videoIndex, 1);
  } else {
    videos.push(videoId);
  }
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

type GetFeedQuery = {
  page: string;
};

export const getLikedVideos = async (
  req: Request<{}, {}, {}, GetFeedQuery>,
  res: Response,
) => {
  try {
    const page = parseInt(req.query.page);
    const user = await User.findById(req.user._id).populate(
      getBriefVideoPopulateParameter('liked', page),
    );
    returnVideosWithPaginationSuccessResponse(res, user.liked);
  } catch {
    returnErrorResponse(res);
  }
};

export const getHistory = async (
  req: Request<{}, {}, {}, GetFeedQuery>,
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
  req: Request<{}, {}, {}, GetFeedQuery>,
  res: Response,
) => {
  try {
    const page = +req.query.page;
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
  } = req;
  try {
    const user = await User.findById(req.user._id);
    await addVideoToList(user.watchLater, id);
    await user.save();
    returnSuccessResponse(res);
  } catch {
    returnErrorResponse(res);
  }
};

export const deleteWatchLater = async (req: Request, res: Response) => {
  const {
    params: {id},
  } = req;
  try {
    const user = await User.findById(req.user._id);
    await deleteVideoFromList(user.watchLater, id);
    await user.save();
    returnSuccessResponse(res);
  } catch (error) {
    returnErrorResponse(res);
  }
};

export const getNoInterest = async (
  req: Request<{}, {}, {}, GetFeedQuery>,
  res: Response,
) => {
  try {
    const page = parseInt(req.query.page);
    const user = await User.findById(req.user._id).populate(
      getBriefVideoPopulateParameter('noInetrest', page),
    );
    returnVideosWithPaginationSuccessResponse(res, user.noInterest);
  } catch {
    returnErrorResponse(res);
  }
};

export const addNoInterest = async (req: Request, res: Response) => {
  const {
    params: {id},
  } = req;
  try {
    const user = await User.findById(req.user._id);
    await addVideoToList(user.noInterest, id);
    await user.save();
    returnSuccessResponse(res);
  } catch {
    returnErrorResponse(res);
  }
};

export const deleteNoInterest = async (req: Request, res: Response) => {
  const {
    params: {id},
  } = req;
  try {
    const user = await User.findById(req.user._id);
    await deleteVideoFromList(user.noInterest, id);
    await user.save();
    returnSuccessResponse(res);
  } catch (error) {
    returnErrorResponse(res);
  }
};

const addVideoToList = async (
  videos: Types.ObjectId[],
  videoIdStr: string,
): Promise<void> => {
  const videoId = getObjectIdFromString(videoIdStr);
  const videoIndex = videos.indexOf(videoId);
  if (videoIndex > -1) {
    videos.splice(videoIndex, 1);
  }
  videos.unshift(videoId);
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

interface IsInWatchLaterMarkedVideoType extends VideoType {
  isInWatchLater: boolean;
}

const returnVideosWithPaginationSuccessResponse = (
  res: Response,
  videos: VideoType[] | IsInWatchLaterMarkedVideoType[],
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
    skip: (page - 1) * VIDEO_FETCH_UNIT,
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
    select: '_id thumbnailUrl title views uploadTime creator',
    options: getVideoWithPaginationPopulateOptions(page, sortMethod),
    populate: getBriefCreatorPopulateOptions(),
  };
};

const returnErrorResponse = (res: Response) => {
  res.status(400).json({
    result: false,
  });
};
