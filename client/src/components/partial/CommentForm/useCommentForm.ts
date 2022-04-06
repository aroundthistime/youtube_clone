/* eslint-disable import/prefer-default-export */

import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../../@modules/root';
import {UserType} from '../../../@types/UserType';

type ReturnType = {
  user: UserType | null;
  submitButtonDisabled: boolean;
};

export const useCommentForm = (commentInput: {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}): ReturnType => {
  const [submitButtonDisabled, setSubmitButtonDisabled] =
    useState<boolean>(true);
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    detectSubmitButtonDisabled();
  }, [commentInput.value]);

  const detectSubmitButtonDisabled = () => {
    setSubmitButtonDisabled(Boolean(!commentInput.value));
  };
  return {
    user,
    submitButtonDisabled,
  };
};
