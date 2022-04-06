/* eslint-disable import/prefer-default-export */
import React, {useCallback, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {useInput} from '../../../../@hooks/useInput';
import {RootState} from '../../../../@modules/root';
import {setUser} from '../../../../@modules/userSlice';
import {useEditProfileMutation} from '../../../../@queries/useUserMutation';
import routes from '../../../../routes';
import {
  showErrorToastAfterLoading,
  showLoadingToast,
  showSuccessToastAfterLoading,
} from '../../../../utils/toastUtils';

export const useEditProfilePage = () => {
  const user = useSelector((state: RootState) => state.user);
  const {mutateAsync, data, isLoading} = useEditProfileMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const nameInput = useInput(user?.name || '');
  const statusInput = useInput(user?.status || '');

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();
    if (isLoading) return;
    const toastId = showLoadingToast();
    try {
      await tryEditProfile();
      showSuccessToastAfterLoading(toastId, '프로필을 수정했습니다.');
    } catch {
      showErrorToastAfterLoading(toastId);
    }
  };

  const tryEditProfile = useCallback(async () => {
    const avatar =
      avatarInputRef.current?.files && avatarInputRef.current.files.length > 0
        ? avatarInputRef.current?.files[0]
        : undefined;
    const editProfileRequirements = {
      avatar,
      name: nameInput.value,
      status: statusInput.value,
    };
    await mutateAsync(editProfileRequirements);
  }, [mutateAsync, avatarInputRef.current, nameInput.value, statusInput.value]);

  useEffect(() => {
    if (data?.result && data?.user) {
      dispatch(setUser(data.user));
      navigate(routes.users + routes.myProfile);
    }
  }, [data?.user]);

  return {
    avatarInputRef,
    nameInput,
    statusInput,
    onSubmit,
  };
};
