import React from 'react';
import routes from '../../../../routes';
import {render, testData} from '../../../../utils/testUtils';
import UserNameLink from './UserNameLink';

describe('UserNameLink', () => {
  const {user} = testData;
  it('renders OK', () => {
    const {container, getByText} = render(<UserNameLink user={user} />);
    expect(
      container.querySelector('.username-link')?.getAttribute('href'),
    ).toEqual(routes.userDetail(user._id));

    expect(getByText(user.name).className).toEqual('username-link__username');
  });
});
