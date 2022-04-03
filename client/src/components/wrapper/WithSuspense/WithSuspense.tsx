import React, {Suspense} from 'react';
import Loader from '../../atom/Loader/Loader';

function WithSuspense<T>(
  WrappedComponent: React.ComponentType<T>,
  LoaderComponent: JSX.Element = <Loader />,
) {
  return function WithSuspenseComponent(props: T) {
    return (
      <Suspense fallback={LoaderComponent}>
        <WrappedComponent {...props} />
      </Suspense>
    );
  };
}

export default WithSuspense;
