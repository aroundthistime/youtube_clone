import React from 'react';
import routes from '../../../routes';
import {render, testState} from '../../../utils/testUtils';
import Nav from './Nav';

describe('Nav', () => {
  it('renders OK', () => {
    render(<Nav />);
  });
  it('renders Feed Tabs when Logged In', () => {
    const {getByTestId} = render(<Nav />, {
      preloadedState: {
        user: testState.user,
      },
    });
    getByTestId('feed-tabs');
  });
  it('tab is selected properly', () => {
    const {getByText} = render(<Nav />, {
      route: routes.feed + routes.history,
      preloadedState: {
        user: testState.user,
      },
    });
    expect(
      getByText('History').parentElement?.parentElement?.classList.contains(
        'tabs__tab--selected',
      ),
    ).toEqual(true);
  });
});
