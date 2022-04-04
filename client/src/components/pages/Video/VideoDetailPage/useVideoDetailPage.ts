/* eslint-disable import/prefer-default-export */
import {useEffect, useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {useLocation} from 'react-router-dom';
import {clearComments} from '../../../../@modules/commentsSlice';
import {
  clearPlayingVideo,
  setPlayingVideo,
} from '../../../../@modules/playingVideoSlice';
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
    return () => {
      dispatch(clearComments());
      dispatch(clearPlayingVideo());
    };
  }, []);

  useEffect(() => {
    if (video) dispatch(setPlayingVideo(video));
  }, [video]);

  return {
    video,
  };
};
