/* eslint-disable import/prefer-default-export */
import {useLikedVideosQuery} from '../../../../@queries/useFeedQuery';
import {VideosQueryType} from '../../../../@queries/useVideosQuery';

type ReturnType = {
  videosQuery: VideosQueryType;
};

export const useLikedVideosPage = (): ReturnType => {
  const videosQuery = useLikedVideosQuery();

  return {
    videosQuery,
  };
};
