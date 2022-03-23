import {FailedResponseData, SuccessResponseData} from './ResponseData';
import {BriefVideoType} from './VideoType';

export interface DefaultInfiniteQueryParams {
  pageParam?: number;
}

export interface DefaultInfiniteFetchSuccess extends SuccessResponseData {
  hasNextPage: boolean;
  nextPage: number;
}

export interface GetVideosSuccess extends DefaultInfiniteFetchSuccess {
  videos: BriefVideoType[];
}

export type GetVideosReturnType = FailedResponseData | GetVideosSuccess;
