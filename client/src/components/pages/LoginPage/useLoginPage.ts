/* eslint-disable import/prefer-default-export */
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {usePublicValidation} from '../../../@hooks/useAuthValidation';
import {useInput} from '../../../@hooks/useInput';
import {setUser} from '../../../@modules/userSlice';
import {useLoginMutation} from '../../../@queries/useAuthMutation';
import routes from '../../../routes';

export const useLoginPage = () => {
  usePublicValidation();
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
      toast.success('로그인되었습니다.');
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
    emailInput,
    passwordInput,
    alertMessage,
    onSubmit,
    isLoading,
  };
};
