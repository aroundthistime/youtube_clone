/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import {useInfiniteQuery} from 'react-query';
import {FailedResponseData, SuccessResponseData} from '../@types/ResponseData';
import {VideoSortMethodType} from '../@types/SortMethodType';
import {BriefVideoType} from '../@types/VideoType';
import apiRoutes from '../apiRoutes';

interface Params {
  keyword?: string;
  category?: string;
  sortMethod?: VideoSortMethodType;
  pageParam?: number;
}

export interface GetVideoSuccess extends SuccessResponseData {
  videos: BriefVideoType[];
  hasNextPage: boolean;
  nextPage: number;
}

type ReturnType = FailedResponseData | GetVideoSuccess;

const getVideos = async ({
  keyword,
  category,
  sortMethod,
  pageParam = 1,
}: Params): Promise<ReturnType> => {
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
      getNextPageParam: lastPage =>
        lastPage.result === true && lastPage.hasNextPage
          ? lastPage.nextPage
          : undefined,
    },
  );
};
