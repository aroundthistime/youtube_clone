import React, {useCallback, useState} from 'react';
import {UseMutationResult} from 'react-query';
import {useNavigate} from 'react-router-dom';
import {
  useDeleteVideoMutation,
  useToggleLikeVideoMutation,
  useToggleWatchLaterMutation,
} from '../@queries/useVideoMutation';
import routes from '../routes';
import {
  showErrorToastAfterLoading,
  showLoadingToast,
  showSuccessToastAfterLoading,
} from '../utils/toastUtils';

interface UseSingleActionButtonReturnType {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

interface UseToggleButtonReturnType extends UseSingleActionButtonReturnType {
  isActive: boolean;
  isLoading: boolean;
}

export const useDeleteVideoButton = (
  videoId: string,
  callback?: Function,
): UseSingleActionButtonReturnType => {
  const {mutateAsync, isLoading} = useDeleteVideoMutation();
  const onClick = useCallback(async () => {
    if (isLoading) return;
    if (!window.confirm('정말 해당 영상을 삭제하시겠습니까?')) return;
    const toastId = showLoadingToast();
    try {
      await mutateAsync(videoId);
      showSuccessToastAfterLoading(toastId, '해당 영상을 삭제했습니다.');
      if (callback) callback();
    } catch {
      showErrorToastAfterLoading(toastId);
    }
  }, [videoId]);

  return {
    onClick,
  };
};

export const useEditVideoButton = (
  videoId: string,
): UseSingleActionButtonReturnType => {
  const navigate = useNavigate();
  const onClick = useCallback(() => {
    navigate(routes.editVideo(videoId));
  }, [videoId]);
  return {
    onClick,
  };
};

export const useToggleWatchLaterButton = (
  videoId: string,
  isActiveProp: boolean,
): UseToggleButtonReturnType => {
  return useVideoToggleButton(
    videoId,
    isActiveProp,
    useToggleWatchLaterMutation,
    '나중에 볼 영상에 추가되었습니다.',
    '나중에 볼 영상에서 삭제되었습니다.',
  );
};

export const useToggleLikeButton = (
  videoId: string,
  isActiveProp: boolean,
): UseToggleButtonReturnType => {
  return useVideoToggleButton(
    videoId,
    isActiveProp,
    useToggleLikeVideoMutation,
    '해당 영상을 좋아합니다.',
    '해당 영상에 대한 좋아요를 취소합니다.',
  );
};

const useVideoToggleButton = (
  videoId: string,
  isActiveProp: boolean,
  mutation: () => UseMutationResult<any, unknown, string, unknown>,
  onActiveMessage: string,
  onInactiveMessage: string,
): UseToggleButtonReturnType => {
  const [isActive, setIsActive] = useState<boolean>(isActiveProp);
  const {mutateAsync, isLoading} = mutation();
  const onClick = useCallback(async () => {
    if (isLoading) return;
    const toastId = showLoadingToast();
    try {
      await mutateAsync(videoId);
      toggleState(toastId);
    } catch (error) {
      showErrorToastAfterLoading(toastId);
    }
  }, [videoId]);

  const toggleState = useCallback(
    (toastId: React.ReactText) => {
      setIsActive(prev => {
        const newState = !prev;
        showSuccessToastAfterLoading(
          toastId,
          newState ? onActiveMessage : onInactiveMessage,
        );
        return newState;
      });
    },
    [isActive],
  );

  return {
    onClick,
    isLoading,
    isActive,
  };
};

export default {
  useDeleteVideoButton,
  useEditVideoButton,
  useToggleLikeButton,
  useToggleWatchLaterButton,
};
