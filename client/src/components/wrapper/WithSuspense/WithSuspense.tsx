import React, {Suspense} from 'react';
import Loader from '../../atom/Loader/Loader';

function WithSuspense<T>(WrappedComponent: React.ComponentType<T>) {
  return function WithSuspenseComponent(props: T) {
    return (
      <Suspense fallback={<Loader />}>
        <WrappedComponent {...props} />
      </Suspense>
    );
  };
}

export default WithSuspense;
