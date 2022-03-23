/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import {useInfiniteQuery} from 'react-query';
import {
  DefaultInfiniteQueryParams,
  GetVideosReturnType,
} from '../@types/QueryParamsType';
import {VideoSortMethodType} from '../@types/SortMethodType';
import apiRoutes from '../apiRoutes';
import {getNextPageParam} from '../utils/fetchHandlers';

interface Params extends DefaultInfiniteQueryParams {
  keyword?: string;
  category?: string;
  sortMethod?: VideoSortMethodType;
}

const getVideos = async ({
  keyword,
  category,
  sortMethod,
  pageParam = 1,
}: Params): Promise<GetVideosReturnType> => {
  const route = apiRoutes.getVideos;
  const {data} = await axios({
    url: route.url as string,
    method: route.method,
    params: {
      keyword,
      category,
      sortMethod,
      page: pageParam,
    },
  });
  return {
    ...data,
    nextPage: pageParam + 1,
  };
};

export const useVideosQuery = (queryParams: Params = {pageParam: 1}) => {
  return useInfiniteQuery(
    'videos',
    ({pageParam}) => getVideos({...queryParams, pageParam}),
    {
      getNextPageParam,
    },
  );
};
