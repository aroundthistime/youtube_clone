/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import {useInfiniteQuery} from 'react-query';
import {CommentType} from '../@types/CommentType';
import {
  DefaultInfiniteQueryParams,
  DefaultInfiniteFetchSuccess,
} from '../@types/QueryParamsType';
import {FailedResponseData} from '../@types/ResponseData';
import {CommentSortMethodType} from '../@types/SortMethodType';
import apiRoutes from '../apiRoutes';
import {getNextPageParam} from '../utils/fetchHandlers';

interface CommentsQueryParams extends DefaultInfiniteQueryParams {
  videoId: string;
  sortMethod: CommentSortMethodType;
}

const getVideoComments = async ({
  videoId,
  sortMethod,
  pageParam = 1,
}: CommentsQueryParams): Promise<GetCommentsReturnType> => {
  const route = apiRoutes.getVideoComments;
  const urlFunction = route.url as Function;
  const {data} = await axios({
    url: urlFunction(videoId),
    method: route.method,
    params: {
      sortMethod,
      page: pageParam,
    },
  });
  return {
    ...data,
    nextPage: pageParam + 1,
  };
};

export const useCommentsQuery = (queryParams: CommentsQueryParams) => {
  return useInfiniteQuery(
    ['comments', queryParams],
    ({pageParam}) => getVideoComments({...queryParams, pageParam}),
    {
      getNextPageParam,
      staleTime: Infinity,
    },
  );
};

export interface GetCommentsSuccess extends DefaultInfiniteFetchSuccess {
  comments: CommentType[];
}

export type GetCommentsReturnType = FailedResponseData | GetCommentsSuccess;
