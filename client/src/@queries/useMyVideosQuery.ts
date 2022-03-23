/* eslint-disable import/prefer-default-export */

import axios from 'axios';
import {useInfiniteQuery} from 'react-query';
import {
  DefaultInfiniteQueryParams,
  GetVideosReturnType,
} from '../@types/QueryParamsType';
import apiRoutes from '../apiRoutes';

interface Params extends DefaultInfiniteQueryParams {}

const getMyVideos = async ({
  pageParam = 1,
}: Params): Promise<GetVideosReturnType> => {
  const route = apiRoutes.getMyVideos;
  const {data} = await axios({
    url: route.url as string,
    method: route.method,
  });
  return {
    ...data,
    nextPage: pageParam + 1,
  };
};

export const useMyVideosQuery = () => {
  return useInfiniteQuery(
    'myVideos',
    ({pageParam}) => getMyVideos({pageParam}),
    {
      getNextPageParam: lastPage =>
        lastPage.result === true && lastPage.hasNextPage
          ? lastPage.nextPage
          : undefined,
    },
  );
};
