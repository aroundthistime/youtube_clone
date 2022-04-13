import React from 'react';
import routes from '../../../../routes';
import {render, testState} from '../../../../utils/testUtils';
import UserNameLink from './UserNameLink';

describe('UserNameLink', () => {
  const {user} = testState;
  it('renders OK', () => {
    const {container, getByText} = render(<UserNameLink user={user} />);
    expect(
      container.querySelector('.username-link')?.getAttribute('href'),
    ).toEqual(routes.userDetail(user._id));

    expect(getByText(user.name).className).toEqual('username-link__username');
  });
});
