/* eslint-disable import/prefer-default-export */
import {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {RootState} from '../@modules/root';
import routes from '../routes';

type ReturnType = {
  isValid: boolean;
  callback: Function;
};

export const usePrivateValidation = (): ReturnType => {
  const [isValid, setIsValid] = useState<boolean>(true);
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const callbackIfNotPrivate = useCallback(
    () => navigate(routes.login),
    [navigate],
  );
  useEffect(() => {
    setIsValid(Boolean(user));
  }, [user]);
  return {
    isValid,
    callback: callbackIfNotPrivate,
  };
};

export const usePublicValidation = (): ReturnType => {
  const [isValid, setIsValid] = useState<boolean>(true);
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const callbackIfNotPublic = useCallback(
    () => navigate(routes.home),
    [navigate],
  );
  useEffect(() => {
    setIsValid(Boolean(!user));
  }, [user]);
  return {
    isValid,
    callback: callbackIfNotPublic,
  };
};
