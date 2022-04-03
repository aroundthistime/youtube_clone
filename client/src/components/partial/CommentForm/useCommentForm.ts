/* eslint-disable import/prefer-default-export */

import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../../@modules/root';
import {UserType} from '../../../@types/UserType';

type ReturnType = {
  user: UserType | null;
  submitButtonDisabled: boolean;
};

export const useCommentForm = (
  textAreaRef: React.RefObject<HTMLTextAreaElement>,
): ReturnType => {
  const [submitButtonDisabled, setSubmitButtonDisabled] =
    useState<boolean>(true);
  const user = useSelector((state: RootState) => state.user);
  useEffect(() => {
    textAreaRef.current?.addEventListener('input', onTextAreaChange);
    return () => {
      textAreaRef.current?.removeEventListener('input', onTextAreaChange);
    };
  }, [textAreaRef.current]);

  const onTextAreaChange = () => {
    setSubmitButtonDisabled(Boolean(!textAreaRef.current?.value));
  };
  return {
    user,
    submitButtonDisabled,
  };
};
