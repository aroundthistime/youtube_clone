/* eslint-disable import/prefer-default-export */
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
  if (lastPage?.result && lastPage?.hasNextPage) {
    return lastPage.nextPage;
  }
  return undefined;
};

export const getFormDataFromObject = (obj: Object): FormData => {
  const formData = new FormData();
  Object.entries(obj).forEach(entry => {
    const [key, value] = entry;
    formData.append(key, value);
  });
  return formData;
};
