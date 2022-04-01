import React from 'react';
import {Route} from 'react-router-dom';
import {MainErrorBoundary} from '../../../App';

type Props = {
  path: string;
  element: JSX.Element;
};

const RouteWithErrorBoundary = ({path, element}: Props) => (
  <Route
    path={path}
    element={<MainErrorBoundary>{element}</MainErrorBoundary>}
  />
);

export default RouteWithErrorBoundary;
