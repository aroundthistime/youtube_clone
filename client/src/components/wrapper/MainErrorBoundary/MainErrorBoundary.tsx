import React, {PropsWithChildren} from 'react';
import ErrorMessage from '../../partial/ErrorMessage/ErrorMessage';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

const MainErrorBoundary = ({children}: PropsWithChildren<{}>) => (
  <ErrorBoundary
    fallback={<ErrorMessage className="error-message--fullscreen" />}>
    {children}
  </ErrorBoundary>
);

export default MainErrorBoundary;
