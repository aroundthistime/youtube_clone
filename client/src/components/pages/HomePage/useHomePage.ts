/* eslint-disable import/prefer-default-export */
import {useEffect, useMemo} from 'react';
import {
  GetVideoSuccess,
  useVideosQuery,
} from '../../../@queries/useVideosQuery';
import {BriefVideoType} from '../../../@types/VideoType';

type ReturnType = {
  videos: BriefVideoType[];
  fetchNextPage: Function;
};

export const useHomePage = (): ReturnType => {
  const {data, isFetchingNextPage, hasNextPage, fetchNextPage} =
    useVideosQuery();

  // useEffect(() => {
  //     const a = setInterval(() => {
  //         fetchNextPage()
  //     })
  // })
  const videos = useMemo(() => {
    return data?.pages
      .filter((page): page is GetVideoSuccess => {
        return page.result;
      })
      .map(page => page.videos)
      .flat();
  }, [data]);
  return {
    videos: videos || [],
    fetchNextPage,
  };
};
