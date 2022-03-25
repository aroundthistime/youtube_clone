/* eslint-disable import/prefer-default-export */
import {useMemo} from 'react';
import {
  VideoSortMethodType,
  VIDEO_SORT_METHODS,
} from '../@types/SortMethodType';
import {TimeStandardType, TIME_STANDARDS} from '../@types/TimeStandardType';
import {useUrlQuery} from './useUrlQuery';

type ReturnType = {
  sortMethod: VideoSortMethodType | undefined;
  uploadTime: TimeStandardType | undefined;
};

export const useVideosFilterQueries = () => {
  const urlQuery = useUrlQuery();

  const sortMethod = useMemo(() => {
    const sortMethodQuery = urlQuery.get('sort');
    if (
      sortMethodQuery &&
      VIDEO_SORT_METHODS.find(method => method === sortMethodQuery)
    ) {
      return sortMethodQuery as VideoSortMethodType;
    }
    return undefined;
  }, [urlQuery]);

  const uploadTime = useMemo(() => {
    const uploadTimeQuery = urlQuery.get('upload');
    if (
      uploadTimeQuery &&
      TIME_STANDARDS.find(standard => standard === uploadTimeQuery)
    ) {
      return uploadTimeQuery as TimeStandardType;
    }
    return undefined;
  }, [urlQuery]);

  return {
    sortMethod,
    uploadTime,
  };
};
