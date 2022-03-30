/* eslint-disable import/prefer-default-export */
import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../../@modules/root';
import {BriefVideoType} from '../../../@types/VideoType';
import {getTimeDiffFromNowString} from '../../../utils/dateHandler';
import {getBiggestUnitFromNumber} from '../../../utils/mathHandler';

type ReturnType = {
  isMyVideo: boolean;
  timeDiffFromUploadDate: string;
  briefViews: string;
  isLoggedIn: boolean;
};

export const useVideo = (video: BriefVideoType): ReturnType => {
  const user = useSelector((state: RootState) => state.user);

  const isMyVideo: boolean = useMemo(() => {
    return video.creator._id === user?._id;
  }, [video.creator._id, user?._id]);

  const timeDiffFromUploadDate = useMemo(() => {
    return getTimeDiffFromNowString(new Date(video.uploadTime));
  }, [video.uploadTime]);
  const briefViews = useMemo(() => {
    return getBiggestUnitFromNumber(video.views);
  }, [video.views]);

  return {
    isMyVideo,
    timeDiffFromUploadDate,
    briefViews,
    isLoggedIn: Boolean(user),
  };
  // if isMyVideo => edit video, delete video
  // if !isMyVideo => watchLater, noInterest
};
