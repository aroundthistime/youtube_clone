/* eslint-disable import/prefer-default-export */
import {useEffect, useMemo, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {useLocation} from 'react-router-dom';
import {clearComments} from '../../../../@modules/commentsSlice';
import {resetVideoPlayer} from '../../../../@modules/videoPlayerSlice';
import {useVideoQuery} from '../../../../@queries/useVideoQuery';
import {VideoType} from '../../../../@types/VideoType';
import {getVideoIdFromPathname} from '../../../../utils/urlHandler';

type ReturnType = {
  video: VideoType;
};

export const useVideoDetailPage = (): ReturnType => {
  const location = useLocation();
  const dispatch = useDispatch();

  const videoId = useMemo(
    () => getVideoIdFromPathname(location.pathname),
    [location.pathname],
  ) as string;

  const {
    data: {video},
  } = useVideoQuery(videoId);

  useEffect(() => {
    dispatch(resetVideoPlayer());
    return () => {
      dispatch(clearComments());
    };
  }, []);
  // before component unmount => playing video set

  return {
    video: {
      isLiked: video.isLiked,
      commentsCount: video.commentsCount,
      ...video._doc,
    },
  };
};
