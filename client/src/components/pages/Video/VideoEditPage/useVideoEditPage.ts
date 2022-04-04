/* eslint-disable import/prefer-default-export */
import {useCallback, useEffect, useMemo, useRef} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {useEditVideoMutation} from '../../../../@queries/useVideoMutation';
import {useVideoQuery} from '../../../../@queries/useVideoQuery';
import {VideoType} from '../../../../@types/VideoType';
import routes from '../../../../routes';
import {
  showErrorToastAfterLoading,
  showLoadingToast,
  showSuccessToastAfterLoading,
} from '../../../../utils/toastUtils';
import {getVideoIdFromPathname} from '../../../../utils/urlHandler';

export const useVideoEditPage = () => {
  const {mutateAsync, isLoading} = useEditVideoMutation();
  const location = useLocation();
  const navigate = useNavigate();
  const titleInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);
  const categoryInputRef = useRef<HTMLSelectElement>(null);

  const videoId = useMemo(
    () => getVideoIdFromPathname(location.pathname),
    [location.pathname],
  ) as string;

  const {data} = useVideoQuery(videoId);

  useEffect(() => {
    if (!data?.video) return;
    resetFormValueWithVideoData();
  }, [data?.video]);

  const resetFormValueWithVideoData = useCallback(() => {
    if (
      !titleInputRef.current ||
      !descriptionInputRef.current ||
      !categoryInputRef.current
    )
      return;
    const video = data?.video as VideoType;
    titleInputRef.current.value = video.title;
    descriptionInputRef.current.value = video.description || '';
    if (video.category) {
      categoryInputRef.current.value = video.category;
    }
  }, [
    data?.video,
    titleInputRef.current,
    descriptionInputRef.current,
    categoryInputRef.current,
  ]);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();
    if (isLoading) return;
    const toastId = showLoadingToast();
    try {
      const videoEditRequirements = {
        videoId,
        title: titleInputRef.current?.value as string,
        description: descriptionInputRef.current?.value as string,
        category: categoryInputRef.current?.value,
      };
      await mutateAsync(videoEditRequirements);
      showSuccessToastAfterLoading(toastId, '영상을 수정했습니다.');
      navigate(routes.videoDetail(videoId));
    } catch {
      showErrorToastAfterLoading(toastId);
    }
  };

  return {
    titleInputRef,
    descriptionInputRef,
    categoryInputRef,
    onSubmit,
  };
};
