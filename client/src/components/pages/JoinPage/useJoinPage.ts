/* eslint-disable import/prefer-default-export */

import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {usePublicValidation} from '../../../@hooks/useAuthValidation';
import {useInput} from '../../../@hooks/useInput';
import {setUser} from '../../../@modules/userSlice';
import {useJoinMutation} from '../../../@queries/useAuthMutation';
import routes from '../../../routes';
import {FieldInputPropsType} from '../../partial/FieldInput/FieldInput';

type ReturnType = {
  nameInputProps: FieldInputPropsType;
  emailInputProps: FieldInputPropsType;
  password1InputProps: FieldInputPropsType;
  password2InputProps: FieldInputPropsType;
  alertMessage: string;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  isLoading: boolean;
};

type CanSubmitReturnType = {
  result: boolean;
  errorMessage: string;
};

export const useJoinPage = (): ReturnType => {
  usePublicValidation();
  const [alertMessage, setAlertMessage] = useState<string>('');
  const {mutateAsync, isLoading, data} = useJoinMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const nameInput = useInput('');
  const emailInput = useInput('');
  const password1Input = useInput('');
  const password2Input = useInput('');

  const PASSWORD_LEAST_LENGTH = 6;
  const PASSWORD_MAX_LENGTH = 20;

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
    const checkResult = canSubmit();
    if (checkResult.result) {
      tryJoin();
    } else {
      setAlertMessage(checkResult.errorMessage);
    }
  };

  const canSubmit = (): CanSubmitReturnType => {
    const passwordHasAppropriateLength = (password: string): boolean =>
      password.length >= PASSWORD_LEAST_LENGTH &&
      password.length <= PASSWORD_MAX_LENGTH;
    let errorMessage: string = '';
    if (nameInput.value === '') {
      errorMessage = '이름이 입력해주세요';
    } else if (emailInput.value === '') {
      errorMessage = '이메일을 입력해주세요';
    } else if (!passwordHasAppropriateLength(password1Input.value)) {
      errorMessage = `비밀번호는 ${PASSWORD_LEAST_LENGTH}자 이상 ${PASSWORD_MAX_LENGTH}자 이하이어야 합니다`;
    } else if (password1Input.value !== password2Input.value) {
      errorMessage = '두 비밀번호가 일치하지 않습니다';
    }
    return {
      result: errorMessage === '',
      errorMessage,
    };
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
    nameInputProps: {
      ...nameInput,
      fieldName: '이름',
    },
    emailInputProps: {
      ...emailInput,
      fieldName: '이메일',
      type: 'email',
    },
    password1InputProps: {
      ...password1Input,
      fieldName: '비밀번호',
      placeholder: `${PASSWORD_LEAST_LENGTH}자 이상 ${PASSWORD_MAX_LENGTH}자 이하`,
      type: 'password',
    },
    password2InputProps: {
      ...password2Input,
      fieldName: '비밀번호 확인',
      type: 'password',
    },
    alertMessage,
    onSubmit,
    isLoading,
  };
};
