/* eslint-disable import/prefer-default-export */
import {useMemo, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../../@modules/root';
import {BriefVideoType} from '../../../@types/VideoType';
import {getTimeDiffFromNowString} from '../../../utils/dateHandler';
import {getBiggestUnitFromNumber} from '../../../utils/mathHandler';

type ReturnType = {
  timeDiffFromUploadDate: string;
  briefViews: string;
};

export const useVideo = (video: BriefVideoType): ReturnType => {
  const timeDiffFromUploadDate = useMemo(() => {
    return getTimeDiffFromNowString(new Date(video.uploadTime));
  }, [video.uploadTime]);
  const briefViews = useMemo(() => {
    return getBiggestUnitFromNumber(video.views);
  }, [video.views]);

  return {
    timeDiffFromUploadDate,
    briefViews,
  };
};
