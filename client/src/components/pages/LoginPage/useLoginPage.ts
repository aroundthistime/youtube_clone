/* eslint-disable import/prefer-default-export */
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {useInput} from '../../../@hooks/useInput';
import {setUser} from '../../../@modules/userSlice';
import {useLoginMutation} from '../../../@queries/useAuthMutation';
import routes from '../../../routes';
import {FieldInputPropsType} from '../../partial/FieldInput/FieldInput';

type ReturnType = {
  emailInputProps: FieldInputPropsType;
  passwordInputProps: FieldInputPropsType;
  alertMessage: string;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  isLoading: boolean;
};

export const useLoginPage = (): ReturnType => {
  const [alertMessage, setAlertMessage] = useState<string>('');
  const {mutateAsync, isLoading, data} = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailInput = useInput('');
  const passwordInput = useInput('');

  useEffect(() => {
    checkLoginResult();
  }, [data]);

  const checkLoginResult = () => {
    if (data?.result) {
      dispatch(setUser(data.user));
      navigate(routes.home);
    }
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    tryLogin();
  };

  const tryLogin = async () => {
    try {
      setAlertMessage('');
      const loginRequirements = extractLoginRequirements();
      await mutateAsync(loginRequirements);
    } catch (error) {
      setAlertMessage('계정 정보를 확인해주세요');
    }
  };

  const extractLoginRequirements = () => {
    return {
      email: emailInput.value,
      password: passwordInput.value,
    };
  };

  return {
    emailInputProps: {
      ...emailInput,
      fieldName: '이메일',
      type: 'email',
    },
    passwordInputProps: {
      ...passwordInput,
      fieldName: '비밀번호',
      type: 'password',
    },
    alertMessage,
    onSubmit,
    isLoading,
  };
};