/* eslint-disable import/prefer-default-export */

import {useCallback} from 'react';
import {toast} from 'react-toastify';
import {useDeleteVideoMutation} from '../@queries/useVideoMutation';

type ReturnType = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export const useDeleteVideoButton = (
  videoId: string,
  callback?: Function,
): ReturnType => {
  const {mutateAsync, isLoading} = useDeleteVideoMutation();
  const onClick = useCallback(() => {
    if (isLoading) return;
    if (window.confirm('정말 해당 영상을 삭제하시겠습니까?')) return;
    try {
      mutateAsync(videoId);
      handleDeleteSuccess();
    } catch {
      handleDeleteFail();
    }
  }, [videoId]);

  const handleDeleteSuccess = useCallback(() => {
    toast.success('해당 영상을 삭제했습니다.');
    if (callback) {
      callback();
    }
  }, []);

  const handleDeleteFail = useCallback(() => {
    toast.error('요청하신 작업에 실패했습니다.');
  }, []);

  return {
    onClick,
  };
};
