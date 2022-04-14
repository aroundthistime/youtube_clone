/* eslint-disable no-import-assign */
import React from 'react';
import {toast} from 'react-toastify';
import {render, testData, TestWrappedComponent} from '../../../utils/testUtils';
import WithPrivateValidation from './WithPrivateValidation';

toast.error = jest.fn();
const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedNavigate,
}));

describe('WithPrivateValidation', () => {
  const WithPrivateValidationComponent =
    WithPrivateValidation(TestWrappedComponent);

  it('redirects when not logged in', () => {
    render(<WithPrivateValidationComponent />);
    expect(mockedNavigate).toBeCalledTimes(1);
  });

  it('just renders when logged in', () => {
    render(<WithPrivateValidationComponent />, {
      preloadedState: {
        user: testData.user,
      },
    });
    expect(mockedNavigate).toBeCalledTimes(0);
  });
});
