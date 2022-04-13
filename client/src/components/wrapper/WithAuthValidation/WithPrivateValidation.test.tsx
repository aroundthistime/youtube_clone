/* eslint-disable no-import-assign */
import React from 'react';
import {toast} from 'react-toastify';
import {
  render,
  testState,
  TestWrappedComponent,
} from '../../../utils/testUtils';
import WithPrivateValidation from './WithPrivateValidation';

toast.error = jest.fn();
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
}));

describe('WithPrivateValidation', () => {
  const WithPrivateValidationComponent =
    WithPrivateValidation(TestWrappedComponent);

  it('redirects when not logged in', () => {
    render(<WithPrivateValidationComponent />);
    expect(mockedUsedNavigate).toBeCalledTimes(1);
  });

  it('just renders when logged in', () => {
    render(<WithPrivateValidationComponent />, {
      preloadedState: {
        user: testState.user,
      },
    });
    expect(mockedUsedNavigate).toBeCalledTimes(0);
  });
});
