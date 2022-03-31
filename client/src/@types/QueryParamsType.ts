import {FailedResponseData, SuccessResponseData} from './ResponseData';
import {BriefVideoType} from './VideoType';

export interface DefaultInfiniteQueryParams {
  pageParam?: number;
}

export interface DefaultInfiniteFetchSuccess extends SuccessResponseData {
  hasNextPage: boolean;
  nextPage: number;
}

interface FetchedVideoType {
  isInWatchLater?: boolean | undefined;
  _doc: BriefVideoType;
}

export interface GetVideosSuccess extends DefaultInfiniteFetchSuccess {
  videos: FetchedVideoType[];
}

export type GetVideosReturnType = FailedResponseData | GetVideosSuccess;
