import {FailedResponseData, SuccessResponseData} from './ResponseData';
import {BriefVideoType, VideoType} from './VideoType';

export interface DefaultInfiniteQueryParams {
  pageParam?: number;
}

export interface DefaultInfiniteFetchSuccess extends SuccessResponseData {
  hasNextPage: boolean;
  nextPage: number;
}

interface FetchedVideoType extends BriefVideoType {
  isInWatchLater?: boolean | undefined;
}

export interface GetVideosSuccess extends DefaultInfiniteFetchSuccess {
  videos: FetchedVideoType[];
}

export type GetVideosReturnType = FailedResponseData | GetVideosSuccess;
