import React from 'react';
import routes from '../../../../routes';
import {render, testState} from '../../../../utils/testUtils';
import UserAvatarLink from './UserAvatarLink';

describe('UserAvatarLink', () => {
  const {user} = testState;
  it('renders OK', () => {
    const {container} = render(<UserAvatarLink user={user} />);
    expect(
      container.querySelector('.avatar-link')?.getAttribute('href'),
    ).toEqual(routes.userDetail(user._id));
  });
});