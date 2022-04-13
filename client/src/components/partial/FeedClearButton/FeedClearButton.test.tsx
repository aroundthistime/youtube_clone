import React from 'react';
import {useMutation} from 'react-query';
import {toast} from 'react-toastify';
import {render} from '../../../utils/testUtils';
import FeedClearButton from './FeedClearButton';

const mokeClearFeed = jest.fn();
toast.error = jest.fn();

describe('FeedClearButton', () => {
  const fakeClearMutation = () => useMutation(mokeClearFeed);

  beforeEach(() => {
    const mockReload = jest.fn();
    const mockLocation = {
      ...window.location,
      reload: mockReload,
    };
    jest.spyOn(window, 'location', 'get').mockReturnValue(mockLocation);
  });

  it('renders OK', () => {
    render(<FeedClearButton clearMutation={fakeClearMutation} />);
  });

  it('does nothing when not confirming', () => {
    jest.spyOn(global, 'confirm' as any).mockReturnValueOnce(false);
    const {container} = render(
      <FeedClearButton clearMutation={fakeClearMutation} />,
    );

    const button = container.querySelector(
      '.header__button',
    ) as HTMLButtonElement;
    button.click();

    expect(mokeClearFeed).toBeCalledTimes(0);
  });

  it('reloads when clear feed succeeds', async () => {
    jest.spyOn(global, 'confirm' as any).mockReturnValue(true);
    const {container} = render(
      <FeedClearButton clearMutation={fakeClearMutation} />,
    );

    const button = container.querySelector(
      '.header__button',
    ) as HTMLButtonElement;
    button.click();

    await new Promise(process.nextTick);
    expect(window.location.reload).toBeCalledTimes(1);
  });

  it('shows toast when mutation fails', async () => {
    jest.spyOn(global, 'confirm' as any).mockReturnValue(true);
    mokeClearFeed.mockImplementation(() => {
      throw new Error();
    });

    const {container} = render(
      <FeedClearButton clearMutation={fakeClearMutation} />,
    );

    const button = container.querySelector(
      '.header__button',
    ) as HTMLButtonElement;
    button.click();

    await new Promise(process.nextTick);
    expect(toast.error).toBeCalledTimes(1);
    expect(window.location.reload).toBeCalledTimes(0);
  });
});
