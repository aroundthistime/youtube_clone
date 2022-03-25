/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import {useInfiniteQuery} from 'react-query';
import {GetVideosReturnType} from '../@types/QueryParamsType';
import apiRoutes from '../apiRoutes';
import {getNextPageParam} from '../utils/fetchHandlers';

const getLikedVideos = async ({
  pageParam = 1,
}): Promise<GetVideosReturnType> => {
  const route = apiRoutes.getLikedVideos;
  const {data} = await axios({
    url: route.url as string,
    method: route.method,
    params: {
      page: pageParam,
    },
  });
  return {
    ...data,
    nextPge: pageParam + 1,
  };
};

const getHistory = async ({pageParam = 1}): Promise<GetVideosReturnType> => {
  const route = apiRoutes.getHistories;
  const {data} = await axios({
    url: route.url as string,
    method: route.method,
    params: {
      page: pageParam,
    },
  });
  return {
    ...data,
    nextPge: pageParam + 1,
  };
};

const getWatchLater = async ({pageParam = 1}): Promise<GetVideosReturnType> => {
  const route = apiRoutes.getWatchLaters;
  const {data} = await axios({
    url: route.url as string,
    method: route.method,
    params: {
      page: pageParam,
    },
  });
  return {
    ...data,
    nextPge: pageParam + 1,
  };
};

export const useLikedVideosQuery = () => {
  return useInfiniteQuery('likedVideos', getLikedVideos, {
    getNextPageParam,
  });
};

export const useHistoryQuery = () => {
  return useInfiniteQuery('history', getHistory, {
    getNextPageParam,
  });
};

export const useWatchLaterQuery = () => {
  return useInfiniteQuery('watchLater', getWatchLater, {
    getNextPageParam,
  });
};
