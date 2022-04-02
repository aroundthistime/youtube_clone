import React, {PropsWithChildren} from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {RootState} from '../../../@modules/root';
import routes from '../../../routes';

function WithLoggedInValidation<T>(WrappedComponent: React.ComponentType<T>) {
  return function WithLoggedInValidationComponent(props: T) {
    const isLoggedIn = useSelector((state: RootState) => Boolean(state.user));
    if (isLoggedIn) {
      return <WrappedComponent {...props} />;
    }
    return (
      <Link to={routes.login}>
        <WrappedComponent {...props} />
      </Link>
    );
  };
}

export default WithLoggedInValidation;
