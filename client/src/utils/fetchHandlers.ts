/* eslint-disable import/prefer-default-export */
import {useCallback} from 'react';
import {InfiniteData} from 'react-query';
import {useSelector} from 'react-redux';
import {RootState} from '../@modules/root';
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

export const getFormDataFromObject = (obj: Object): FormData => {
  const formData = new FormData();
  Object.entries(obj).forEach(entry => {
    const [key, value] = entry;
    formData.append(key, value);
  });
  return formData;
};

export const isValidCategory = (category: string | undefined) => {
  const categories = useSelector((state: RootState) => state.categories);
  return category && categories.includes(category);
};
