/* eslint-disable import/prefer-default-export */
import {useCallback, useEffect, useMemo, useRef} from 'react';
import {useLocation} from 'react-router-dom';
import {useVideoQuery} from '../../../../@queries/useVideoQuery';
import {VideoType} from '../../../../@types/VideoType';
import {getVideoIdFromPathname} from '../../../../utils/urlHandler';

export const useVideoEditPage = () => {
  const location = useLocation();
  const titleInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);
  const categoryInputRef = useRef<HTMLSelectElement>(null);

  const videoId = useMemo(
    () => getVideoIdFromPathname(location.pathname),
    [location.pathname],
  ) as string;

  const {data: videoData} = useVideoQuery(videoId);

  useEffect(() => {
    if (!videoData?.video) return;
    resetFormValueWithVideoData();
  }, [videoData]);

  const resetFormValueWithVideoData = useCallback(() => {
    if (
      !titleInputRef.current ||
      !descriptionInputRef.current ||
      !categoryInputRef.current
    )
      return;
    const video = videoData?.video as VideoType;
    titleInputRef.current.value = video.title;
    descriptionInputRef.current.value = video.description || '';
    if (video.category) {
      categoryInputRef.current.value = video.category;
    }
  }, [
    videoData?.video,
    titleInputRef.current,
    descriptionInputRef.current,
    categoryInputRef.current,
  ]);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
  };

  return {
    titleInputRef,
    descriptionInputRef,
    categoryInputRef,
    onSubmit,
  };
};
