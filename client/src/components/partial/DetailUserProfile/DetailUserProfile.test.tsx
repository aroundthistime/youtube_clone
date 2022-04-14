import React from 'react';
import {render, testData} from '../../../utils/testUtils';
import DetailUserProfile from './DetailUserProfile';

describe('DetailUserProfile', () => {
  const {user} = testData;
  it('renders OK', () => {
    render(<DetailUserProfile user={user} />);
  });
  it('renders OK with my profile button', () => {
    const {getByTestId} = render(
      <DetailUserProfile
        user={user}
        myProfileButton={<div data-testid="my-profile-button" />}
      />,
    );
    getByTestId('my-profile-button');
  });
});
