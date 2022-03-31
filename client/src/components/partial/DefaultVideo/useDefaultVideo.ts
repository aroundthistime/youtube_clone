/* eslint-disable import/prefer-default-export */
import {useMemo, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../../@modules/root';
import {BriefVideoType} from '../../../@types/VideoType';

type ReturnType = {
  isLoggedIn: boolean;
  isMyVideo: boolean;
  render: boolean;
  setRender: React.Dispatch<React.SetStateAction<boolean>>;
};

export const useDefaultVideo = (video: BriefVideoType): ReturnType => {
  const [render, setRender] = useState<boolean>(true);
  const user = useSelector((state: RootState) => state.user);
  const isLoggedIn = useMemo(() => {
    return Boolean(user);
  }, [Boolean(user)]);

  const isMyVideo: boolean = useMemo(() => {
    return video.creator._id === user?._id;
  }, [video.creator._id, user?._id]);

  return {
    isLoggedIn,
    isMyVideo,
    render,
    setRender,
  };
};
