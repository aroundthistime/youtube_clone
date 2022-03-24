/* eslint-disable import/prefer-default-export */
import {useEffect, useCallback} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

export const useHomePage = () => {
  const navigate = useNavigate();
  const {pathname, search} = useLocation();
  useEffect(() => {
    removeUrlQuery();
  }, [search]);

  const removeUrlQuery = useCallback(() => {
    if (search) {
      navigate(pathname);
    }
  }, [search, pathname]);
};
