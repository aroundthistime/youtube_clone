/* eslint-disable import/prefer-default-export */
import {useCallback, useEffect, useMemo, useRef} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {useInput} from '../../../../@hooks/useInput';
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
import {getCategoryFromCategoryInputValue} from '../../../atom/Inputs/VideoInputs/VideoInput';

export const useVideoEditPage = () => {
  const {mutateAsync, isLoading} = useEditVideoMutation();
  const location = useLocation();
  const navigate = useNavigate();
  const titleInput = useInput('');
  const descriptionInput = useInput<HTMLTextAreaElement>('');
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
    if (!categoryInputRef.current) return;
    const video = data?.video as VideoType;
    titleInput.setValue(video.title);
    descriptionInput.setValue(video.description || '');
    categoryInputRef.current.value = video.category || '기타';
  }, [data?.video, categoryInputRef.current]);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();
    if (isLoading) return;
    const toastId = showLoadingToast();
    try {
      const videoEditRequirements = {
        videoId,
        title: titleInput.value,
        description: descriptionInput.value,
        category: getCategoryFromCategoryInputValue(
          categoryInputRef.current?.value,
        ),
      };
      await mutateAsync(videoEditRequirements);
      showSuccessToastAfterLoading(toastId, '영상을 수정했습니다.');
      navigate(routes.videoDetail(videoId));
    } catch {
      showErrorToastAfterLoading(toastId);
    }
  };

  return {
    titleInput,
    descriptionInput,
    categoryInputRef,
    onSubmit,
  };
};
