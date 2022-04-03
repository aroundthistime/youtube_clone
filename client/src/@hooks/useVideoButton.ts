/* eslint-disable import/prefer-default-export */

import {useCallback, useState} from 'react';
import {UseMutationResult} from 'react-query';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {
  useDeleteVideoMutation,
  useToggleLikeVideoMutation,
  useToggleWatchLaterMutation,
} from '../@queries/useVideoMutation';
import constants from '../constants';
import routes from '../routes';

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

export const useEditvideoButton = (
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
    try {
      if (isLoading) return;
      await mutateAsync(videoId);
      toggleState();
    } catch (error) {
      toast.error(constants.messages.taskFailed);
    }
  }, [videoId]);

  const toggleState = useCallback(() => {
    setIsActive(prev => {
      const newState = !prev;
      if (newState) {
        showActiveToast();
      } else {
        showInactiveToast();
      }
      return newState;
    });
  }, [isActive]);

  const showActiveToast = useCallback(() => {
    toast.success(onActiveMessage, {
      toastId: onActiveMessage,
    });
  }, []);

  const showInactiveToast = useCallback(() => {
    toast.success(onInactiveMessage, {
      toastId: onInactiveMessage,
    });
  }, []);

  return {
    onClick,
    isLoading,
    isActive,
  };
};
