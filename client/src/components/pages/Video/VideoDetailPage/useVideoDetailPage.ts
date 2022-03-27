/* eslint-disable import/prefer-default-export */
import {useMemo, useRef} from 'react';
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
  const videoRef = useRef<HTMLVideoElement>(null);

  const {
    data: {video},
  } = useVideoQuery(videoId);

  // before component unmount => playing video set

  return {
    video: {
      isLiked: video.isLiked,
      commentCounts: video.commentCounts,
      ...video._doc,
    },
  };
};
