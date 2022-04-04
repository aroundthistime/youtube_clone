/* eslint-disable import/prefer-default-export */
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useInput} from '../../../../@hooks/useInput';
import {useChanagePasswordMutation} from '../../../../@queries/useUserMutation';
import constants from '../../../../constants';
import routes from '../../../../routes';
import {passwordHasAppropriateLength} from '../../../../utils/formUtils';
import {
  showErrorToastAfterLoading,
  showLoadingToast,
  showSuccessToastAfterLoading,
} from '../../../../utils/toastUtils';

export const useChangePasswordPage = () => {
  const [alertMessage, setAlertMessage] = useState<string>('');
  const {mutateAsync, isLoading} = useChanagePasswordMutation();
  const navigate = useNavigate();
  const oldPasswordInput = useInput('');
  const newPassword1Input = useInput('');
  const newPassword2Input = useInput('');

  const onSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    if (isLoading) return;
    if (canSubmit()) {
      tryChangePassword();
    }
  };

  const canSubmit = (): boolean => {
    let errorMessage: string = '';
    if (!passwordHasAppropriateLength(newPassword1Input.value)) {
      errorMessage =
        constants.messages.formErrorMessages.inappropriateLengthPassword;
    } else if (newPassword1Input.value !== newPassword2Input.value) {
      errorMessage = constants.messages.formErrorMessages.passwordsNotMatching;
    }
    if (errorMessage) {
      setAlertMessage(errorMessage);
    }
    return !errorMessage;
  };

  const tryChangePassword = async () => {
    const toastId = showLoadingToast();
    try {
      setAlertMessage('');
      const changePasswordRequirements = extractChangePasswordRequirements();
      await mutateAsync(changePasswordRequirements);
      showSuccessToastAfterLoading(
        toastId,
        '성공적으로 비밀번호를 변경했습니다.',
      );
      navigate(routes.home);
    } catch (error) {
      showErrorToastAfterLoading(toastId, '비밀번호 변경에 실패했습니다.');
      setAlertMessage('기존 비밀번호를 다시 확인해주세요');
    }
  };

  const extractChangePasswordRequirements = () => {
    return {
      oldPassword: oldPasswordInput.value,
      newPassword: newPassword1Input.value,
    };
  };

  return {
    oldPasswordInput,
    newPassword1Input,
    newPassword2Input,
    onSubmit,
    alertMessage,
  };
};
