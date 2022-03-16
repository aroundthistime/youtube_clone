/* eslint-disable import/prefer-default-export */

import {useState} from 'react';
import {useInput} from '../../../@hooks/useInput';
import {FieldInputPropsType} from '../../partial/FieldInput/FieldInput';

type ReturnType = {
  nameInputProps: FieldInputPropsType;
  emailInputProps: FieldInputPropsType;
  password1InputProps: FieldInputPropsType;
  password2InputProps: FieldInputPropsType;
  alertMessage: string;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
};

type CanSubmitReturnType = {
  result: boolean;
  errorMessage: string;
};

export const useJoinPage = (): ReturnType => {
  const [alertMessage, setAlertMessage] = useState<string>('');
  const nameInput = useInput('');
  const emailInput = useInput('');
  const password1Input = useInput('');
  const password2Input = useInput('');

  const PASSWORD_LEAST_LENGTH = 6;
  const PASSWORD_MAX_LENGTH = 20;

  const onSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    const checkResult = canSubmit();
    if (checkResult.result) {
      const a = 1;
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

  // const tryJoin = async() => {
  //   try {

  //   } catch {

  //   }
  // }

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
    },
    password2InputProps: {
      ...password2Input,
      fieldName: '비밀번호 확인',
    },
    alertMessage,
    onSubmit,
  };
};
