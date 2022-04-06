import React, {useCallback} from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import {RootState} from '../../../@modules/root';
import constants from '../../../constants';
import routes from '../../../routes';

function WithLoginLink<T>(WrappedComponent: React.ComponentType<T>) {
  return function WithLoginLinkComponent(props: T) {
    const isLoggedIn = useSelector((state: RootState) => Boolean(state.user));
    if (isLoggedIn) {
      return <WrappedComponent {...props} />;
    }
    const onClick = useCallback(() => {
      toast.error(constants.messages.loginRequired);
    }, []);
    return (
      <Link to={routes.login} onClick={onClick}>
        <WrappedComponent {...props} />
      </Link>
    );
  };
}

export default WithLoginLink;
