/* eslint-disable no-restricted-globals */
/* eslint-disable import/prefer-default-export */
import {useCallback, useEffect, useMemo, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {useUploadVideoMutation} from '../../../../@queries/useVideoMutation';
import routes from '../../../../routes';

export const useVideoUploadPage = () => {
  const navigate = useNavigate();
  const {mutateAsync, data} = useUploadVideoMutation();

  const videoFileInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);
  const categoryInputRef = useRef<HTMLSelectElement>(null);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();
    if (
      videoFileInputRef.current?.files &&
      thumbnailInputRef.current?.files &&
      titleInputRef.current?.value
    ) {
      const videoUploadRequirements = {
        videoFile: videoFileInputRef.current?.files[0],
        thumbnailImage: thumbnailInputRef.current?.files[0],
        title: titleInputRef.current?.value,
        description: descriptionInputRef.current?.value,
        category: categoryInputRef.current?.value,
      };
      mutateAsync(videoUploadRequirements);
    }
  };

  useEffect(() => {
    if (data?.result) {
      onVideoUploadSuccess();
    } else if (data?.result === false) {
      onVideoUploadFail();
    }
  }, [data]);

  const onVideoUploadSuccess = useCallback(() => {
    navigate(routes.videoDetail(data.videoId));
  }, [data?.videoId]);

  const onVideoUploadFail = useCallback(() => {
    alert('요청하신 작업에 실패했습니다. 다시 시도해주세요');
    location.reload();
  }, []);

  return {
    videoFileInputRef,
    thumbnailInputRef,
    titleInputRef,
    descriptionInputRef,
    categoryInputRef,
    onSubmit,
  };
};
