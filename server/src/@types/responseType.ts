import {VideoType} from '../models/Video';

export type DefaultResponseType = {
  result: boolean;
};

export const failedResponse: DefaultResponseType = {
  result: false,
};

interface FetchSuccessWithPaginationResponse extends DefaultResponseType {
  hasNextPage: boolean;
}

export interface VideosFetchSuccessWithPaginationResponse
  extends FetchSuccessWithPaginationResponse {
  videos: VideoType[];
}
