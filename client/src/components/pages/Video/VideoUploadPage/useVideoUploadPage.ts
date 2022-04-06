/* eslint-disable no-restricted-globals */
/* eslint-disable import/prefer-default-export */
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useInput} from '../../../../@hooks/useInput';
import {useUploadVideoMutation} from '../../../../@queries/useVideoMutation';
import routes from '../../../../routes';
import {
  showErrorToastAfterLoading,
  showLoadingToast,
  showSuccessToastAfterLoading,
} from '../../../../utils/toastUtils';
import {getCategoryFromCategoryInputValue} from '../../../atom/Inputs/VideoInputs/VideoInput';

export const useVideoUploadPage = () => {
  const navigate = useNavigate();
  const {mutateAsync, isLoading, data} = useUploadVideoMutation();
  const [alertMessage, setAlertMessage] = useState<string>(
    '영상 및 썸네일 이미지는 16대9 비율을 권장드립니다',
  );

  const videoFileInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const titleInput = useInput('');
  const descriptionInput = useInput<HTMLTextAreaElement>('');
  const categoryInputRef = useRef<HTMLSelectElement>(null);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();
    if (isLoading) return;
    if (!canSubmit()) return;
    const toastId = showLoadingToast();
    try {
      if (
        !videoFileInputRef.current?.files ||
        !thumbnailInputRef.current?.files ||
        !titleInput.value
      )
        return;
      const videoUploadRequirements = {
        videoFile: videoFileInputRef.current?.files[0],
        thumbnailImage: thumbnailInputRef.current?.files[0],
        title: titleInput.value,
        description: descriptionInput.value,
        category: getCategoryFromCategoryInputValue(
          categoryInputRef.current?.value,
        ),
      };
      await mutateAsync(videoUploadRequirements);
      showSuccessToastAfterLoading(
        toastId,
        '영상을 성공적으로 업로드했습니다.',
      );
    } catch {
      showErrorToastAfterLoading(toastId);
    }
  };

  const canSubmit = (): boolean => {
    if (!videoFileInputRef.current?.files?.length) {
      setAlertMessage('영상 파일을 업로드해주세요');
      return false;
    }
    if (!thumbnailInputRef.current?.files?.length) {
      setAlertMessage('썸네일 이미지를 첨부해주세요');
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (data?.result) {
      navigate(routes.videoDetail(data.videoId));
    }
  }, [data?.videoId]);

  return {
    videoFileInputRef,
    thumbnailInputRef,
    titleInput,
    descriptionInput,
    categoryInputRef,
    alertMessage,
    onSubmit,
  };
};
