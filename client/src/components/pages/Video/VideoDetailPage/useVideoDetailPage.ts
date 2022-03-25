/* eslint-disable import/prefer-default-export */
import {useMemo} from 'react';
import {useLocation} from 'react-router-dom';
import {useVideoQuery} from '../../../../@queries/useVideoQuery';
import {VideoType} from '../../../../@types/VideoType';
import {getVideoIdFromPathname} from '../../../../utils/urlHandler';

type ReturnType = {
  video: VideoType;
};

export const useVideoDetailPage = (): ReturnType => {
  const location = useLocation();
  const videoId = useMemo(
    () => getVideoIdFromPathname(location.pathname),
    [location.pathname],
  ) as string;

  const {
    data: {video},
  } = useVideoQuery(videoId);

  return {
    video: {
      isLiked: video.isLiked,
      commentCounts: video.commentCounts,
      ...video._doc,
    },
  };
};
