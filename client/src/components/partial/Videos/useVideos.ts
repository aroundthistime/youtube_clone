/* eslint-disable import/prefer-default-export */
import {useMemo} from 'react';
import {useLazyInfiniteScroll} from '../../../@hooks/useLazyInfiniteScroll';
import {useUrlQuery} from '../../../@hooks/useUrlQuery';
import {
  useVideosQuery,
  VideosQueryParams,
} from '../../../@queries/useVideosQuery';
import {
  VideoSortMethodType,
  VIDEO_SORT_METHODS,
} from '../../../@types/SortMethodType';
import {
  TimeStandardType,
  TIME_STANDARDS,
} from '../../../@types/TimeStandardType';
import {BriefVideoType} from '../../../@types/VideoType';
import {getVideosFromData} from '../../../utils/fetchHandlers';

type ReturnType = {
  videos: BriefVideoType[];
  isFetchingNextPage: boolean;
};

export const useVideos = (queryParams: VideosQueryParams): ReturnType => {
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

  const {data, isFetchingNextPage, hasNextPage, fetchNextPage} = useVideosQuery(
    {
      sortMethod,
      uploadTime,
      ...queryParams,
    },
  );

  const videos = useMemo(() => getVideosFromData(data), [data]);

  useLazyInfiniteScroll(
    videos,
    'video',
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  );

  return {
    videos,
    isFetchingNextPage,
  };
};
