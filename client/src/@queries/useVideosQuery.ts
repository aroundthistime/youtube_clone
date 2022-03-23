/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import {useInfiniteQuery} from 'react-query';
import {
  DefaultInfiniteQueryParams,
  GetVideosReturnType,
} from '../@types/QueryParamsType';
import {VideoSortMethodType} from '../@types/SortMethodType';
import {TimeStandardType} from '../@types/TimeStandardType';
import apiRoutes from '../apiRoutes';
import {getNextPageParam} from '../utils/fetchHandlers';

export interface VideosQueryParams extends DefaultInfiniteQueryParams {
  keyword?: string;
  category?: string;
  sortMethod?: VideoSortMethodType;
  uploadTime?: TimeStandardType;
}

const getVideos = async ({
  keyword,
  category,
  sortMethod,
  pageParam = 1,
  uploadTime = '전체',
}: VideosQueryParams): Promise<GetVideosReturnType> => {
  const route = apiRoutes.getVideos;
  const {data} = await axios({
    url: route.url as string,
    method: route.method,
    params: {
      keyword,
      category,
      sortMethod,
      page: pageParam,
      uploadTime: uploadTime === '전체' ? undefined : uploadTime,
    },
  });
  return {
    ...data,
    nextPage: pageParam + 1,
  };
};

export const useVideosQuery = (
  queryParams: VideosQueryParams = {pageParam: 1},
) => {
  return useInfiniteQuery(
    'videos',
    ({pageParam}) => getVideos({...queryParams, pageParam}),
    {
      getNextPageParam,
    },
  );
};
