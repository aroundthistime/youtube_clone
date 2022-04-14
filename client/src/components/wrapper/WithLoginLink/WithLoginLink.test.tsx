import React from 'react';
import {toast} from 'react-toastify';
import {render, testData, TestWrappedComponent} from '../../../utils/testUtils';
import WithLoginLink from './WithLoginLink';

toast.error = jest.fn();

describe('WithLoginLink', () => {
  const WithLoginLinkComponent = WithLoginLink(TestWrappedComponent);
  const loginLinkTestId = 'login-link-wrapper__link';

  it('renders only wrapped component when logged in', () => {
    const toastError = toast.error;
    const {getByTestId} = render(<WithLoginLinkComponent />);
    const loginLink = getByTestId(loginLinkTestId);
    loginLink.click();
    expect(toastError).toBeCalledTimes(1);
  });

  it('renders with login link when not logged in', () => {
    const {getByTestId} = render(<WithLoginLinkComponent />, {
      preloadedState: {
        user: testData.user,
      },
    });

    expect(() => getByTestId(loginLinkTestId)).toThrow(
      'Unable to find an element',
    );
  });

  // it('shows toast when login link clicked', () => {
  //   const toastError = toast.error;

  //   const {getByTestId} =
  // })
});
