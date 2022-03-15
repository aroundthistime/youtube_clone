import {useState} from 'react';
import {useInput} from '../../../@hooks/useInput';

type FieldInputType = {
  fieldName: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

type ReturnType = {
  nameInput: FieldInputType;
  emailInput: FieldInputType;
  password1Input: FieldInputType;
  password2Input: FieldInputType;
};

/* eslint-disable import/prefer-default-export */
export const useJoinPage = (): ReturnType => {
  const nameInput = useInput('');
  const emailInput = useInput('');
  const password1Input = useInput('');
  const password2Input = useInput('');
  return {
    nameInput: {
      ...nameInput,
      fieldName: '이름',
    },
    emailInput: {
      ...emailInput,
      fieldName: '이메일',
    },
    password1Input: {
      ...password1Input,
      fieldName: '비밀번호',
    },
    password2Input: {
      ...password2Input,
      fieldName: '비밀번호 확인',
    },
  };
};
