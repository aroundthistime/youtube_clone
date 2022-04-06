import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {RootState} from '../../../@modules/root';
import constants from '../../../constants';
import routes from '../../../routes';

function WithPublicValidation<T>(WrappedComponent: React.ComponentType<T>) {
  return function WithPublicValidationComponent(props: T) {
    const isLoggedIn = useSelector((state: RootState) => Boolean(state.user));
    const navigate = useNavigate();
    useEffect(() => {
      if (isLoggedIn) {
        toast.error(constants.messages.logoutRequired);
        navigate(routes.home);
      }
    }, [isLoggedIn]);
    return <WrappedComponent {...props} />;
  };
}

export default WithPublicValidation;
