/* eslint-disable no-restricted-globals */
/* eslint-disable import/prefer-default-export */
import {useCallback, useEffect, useMemo, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {useUploadVideoMutation} from '../../../../@queries/useVideoMutation';
import routes from '../../../../routes';
import {
  showErrorToastAfterLoading,
  showLoadingToast,
  showSuccessToastAfterLoading,
} from '../../../../utils/toastUtils';

export const useVideoUploadPage = () => {
  const navigate = useNavigate();
  const {mutateAsync, isLoading, data} = useUploadVideoMutation();

  const videoFileInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);
  const categoryInputRef = useRef<HTMLSelectElement>(null);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();
    if (isLoading) return;
    const toastId = showLoadingToast();
    try {
      if (
        !videoFileInputRef.current?.files ||
        !thumbnailInputRef.current?.files ||
        !titleInputRef.current?.value
      )
        return;
      const videoUploadRequirements = {
        videoFile: videoFileInputRef.current?.files[0],
        thumbnailImage: thumbnailInputRef.current?.files[0],
        title: titleInputRef.current?.value,
        description: descriptionInputRef.current?.value,
        category: categoryInputRef.current?.value,
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

  useEffect(() => {
    if (data?.result) {
      navigate(routes.videoDetail(data.videoId));
    }
  }, [data?.videoId]);

  return {
    videoFileInputRef,
    thumbnailInputRef,
    titleInputRef,
    descriptionInputRef,
    categoryInputRef,
    onSubmit,
  };
};
