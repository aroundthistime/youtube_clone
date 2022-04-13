import {render} from '@testing-library/react';
import React from 'react';
import {TestWrappedComponent} from '../../../utils/testUtils';
import WithSuspense from './WithSuspense';

describe('WithSuspense', () => {
  const WithSuspenseComponent = WithSuspense(TestWrappedComponent);
  it('renders OK', () => {
    render(<WithSuspenseComponent />);
  });
});
