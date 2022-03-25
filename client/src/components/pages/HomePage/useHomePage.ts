/* eslint-disable import/prefer-default-export */
import {useRemoveUrlQuery} from '../../../@hooks/useRemoveUrlQuery';
import {
  useVideosQuery,
  VideosQueryType,
} from '../../../@queries/useVideosQuery';

type ReturnType = {
  videosQuery: VideosQueryType;
};

export const useHomePage = (): ReturnType => {
  useRemoveUrlQuery();
  const videosQuery = useVideosQuery();

  return {
    videosQuery,
  };
};
