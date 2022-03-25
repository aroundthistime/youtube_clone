/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import {useInfiniteQuery, UseInfiniteQueryResult} from 'react-query';
import {
  DefaultInfiniteQueryParams,
  GetVideosReturnType,
} from '../@types/QueryParamsType';
import {VideoSortMethodType} from '../@types/SortMethodType';
import {TimeStandardType} from '../@types/TimeStandardType';
import apiRoutes from '../apiRoutes';
import {getNextPageParam} from '../utils/fetchHandlers';

interface VideosQueryParams extends DefaultInfiniteQueryParams {
  keyword?: string;
  category?: string;
  sortMethod?: VideoSortMethodType;
  uploadTime?: TimeStandardType;
}

interface UserVideosQueryParams extends MyVideosQueryParams {
  userId: string;
}

interface MyVideosQueryParams extends DefaultInfiniteQueryParams {
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

const getUserVideos = async ({
  userId,
  sortMethod,
  pageParam = 1,
  uploadTime = '전체',
}: UserVideosQueryParams): Promise<GetVideosReturnType> => {
  const route = apiRoutes.getUserVideos;
  const urlFunction = route.url as Function;
  const {data} = await axios({
    url: urlFunction(userId),
    method: route.method,
    params: {
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

const getMyVideos = async ({
  sortMethod,
  uploadTime,
  pageParam = 1,
}: MyVideosQueryParams): Promise<GetVideosReturnType> => {
  const route = apiRoutes.getMyVideos;
  const {data} = await axios({
    url: route.url as string,
    method: route.method,
    params: {
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

export type VideosQueryType = UseInfiniteQueryResult<
  GetVideosReturnType,
  unknown
>;

export const useVideosQuery = (
  queryParams: VideosQueryParams = {pageParam: 1},
) => {
  return useInfiniteQuery(
    ['videos', queryParams],
    ({pageParam}) => getVideos({...queryParams, pageParam}),
    {
      getNextPageParam,
    },
  );
};

export const useUserVideosQuery = (queryParams: UserVideosQueryParams) => {
  return useInfiniteQuery(
    ['userVideos', queryParams],
    ({pageParam}) => getUserVideos({...queryParams, pageParam}),
    {
      getNextPageParam,
    },
  );
};

export const useMyVideosQuery = (queryParams: MyVideosQueryParams) => {
  return useInfiniteQuery(
    ['myVideos', queryParams],
    ({pageParam}) => getMyVideos({...queryParams, pageParam}),
    {
      getNextPageParam,
    },
  );
};
