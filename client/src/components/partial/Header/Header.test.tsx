import React from 'react';
import routes from '../../../routes';
import {render, testState} from '../../../utils/testUtils';
import Header from './Header';

describe('Header', () => {
  it('renders OK', () => {
    render(<Header showMobileNav={() => 1} />);
  });
  it('renders login button when logged out', () => {
    const {getByTestId} = render(<Header showMobileNav={() => 1} />);
    expect(getByTestId('header__auth-button')).toHaveAttribute(
      'href',
      routes.login,
    );
  });
  it('renders myProfile button when loggedIn', () => {
    const {getByTestId} = render(<Header showMobileNav={() => 1} />, {
      preloadedState: {
        user: testState.user,
      },
    });
    expect(getByTestId('header__auth-button')).toHaveAttribute(
      'href',
      routes.users + routes.myProfile,
    );
  });
});
