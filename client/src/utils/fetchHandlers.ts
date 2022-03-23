/* eslint-disable import/prefer-default-export */
import {useCallback} from 'react';
import {InfiniteData} from 'react-query';
import {GetVideosReturnType, GetVideosSuccess} from '../@types/QueryParamsType';
import {BriefVideoType} from '../@types/VideoType';

export const getVideosFromData = (
  data: InfiniteData<GetVideosReturnType> | undefined,
): BriefVideoType[] => {
  const videos = data?.pages
    .filter((page): page is GetVideosSuccess => {
      return page.result;
    })
    .map(page => page.videos)
    .flat();
  return videos || [];
};

export const getNextPageParam = (lastPage: any) => {
  try {
    if (lastPage.result === true && lastPage.hasNextPage) {
      return lastPage.nextpage;
    }
    throw Error;
  } catch {
    return undefined;
  }
};
