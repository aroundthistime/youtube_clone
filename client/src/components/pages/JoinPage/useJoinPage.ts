/* eslint-disable import/prefer-default-export */

import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {usePublicValidation} from '../../../@hooks/useAuthValidation';
import {useInput} from '../../../@hooks/useInput';
import {setUser} from '../../../@modules/userSlice';
import {useJoinMutation} from '../../../@queries/useAuthMutation';
import constants from '../../../constants';
import routes from '../../../routes';
import {passwordHasAppropriateLength} from '../../../utils/formUtils';

export const useJoinPage = () => {
  usePublicValidation();
  const [alertMessage, setAlertMessage] = useState<string>('');
  const {mutateAsync, isLoading, data} = useJoinMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const nameInput = useInput('');
  const emailInput = useInput('');
  const password1Input = useInput('');
  const password2Input = useInput('');

  useEffect(() => {
    checkJoinResult();
  }, [data]);

  const checkJoinResult = () => {
    if (data?.result) {
      dispatch(setUser(data.user));
      toast(`환영합니다. ${data.user.name}님!`);
      navigate(routes.home);
    }
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    if (canSubmit()) {
      tryJoin();
    }
  };

  const canSubmit = (): boolean => {
    let errorMessage: string = '';
    if (nameInput.value === '') {
      errorMessage = '이름을 입력해주세요';
    } else if (emailInput.value === '') {
      errorMessage = '이메일을 입력해주세요';
    } else if (!passwordHasAppropriateLength(password1Input.value)) {
      errorMessage =
        constants.messages.formErrorMessages.inappropriateLengthPassword;
    } else if (password1Input.value !== password2Input.value) {
      errorMessage = constants.messages.formErrorMessages.passwordsNotMatching;
    }
    if (errorMessage) {
      setAlertMessage(errorMessage);
    }
    return !errorMessage;
  };

  const tryJoin = async () => {
    try {
      setAlertMessage('');
      const joinRequirements = extractJoinRequirements();
      await mutateAsync(joinRequirements);
    } catch (error) {
      setAlertMessage('이미 가입된 계정입니다');
    }
  };

  const extractJoinRequirements = () => {
    return {
      name: nameInput.value,
      email: emailInput.value,
      password: password1Input.value,
    };
  };

  return {
    nameInput,
    emailInput,
    password1Input,
    password2Input,
    alertMessage,
    onSubmit,
    isLoading,
  };
};
