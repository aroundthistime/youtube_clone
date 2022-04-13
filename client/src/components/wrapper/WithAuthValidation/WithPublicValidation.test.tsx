/* eslint-disable no-import-assign */
import React from 'react';
import {toast} from 'react-toastify';
import {
  render,
  testState,
  TestWrappedComponent,
} from '../../../utils/testUtils';
import WithPublicValidation from './WithPublicValidation';

toast.error = jest.fn();
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
}));

describe('WithPublicValidation', () => {
  const WithPublicValidationComponent =
    WithPublicValidation(TestWrappedComponent);

  it('just renders when not logged in', () => {
    render(<WithPublicValidationComponent />);
    expect(mockedUsedNavigate).toBeCalledTimes(0);
  });

  it('redirects when logged in', () => {
    render(<WithPublicValidationComponent />, {
      preloadedState: {
        user: testState.user,
      },
    });
    expect(mockedUsedNavigate).toBeCalledTimes(1);
  });
});
