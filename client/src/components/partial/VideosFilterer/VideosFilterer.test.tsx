import React from 'react';
import {render} from '../../../utils/testUtils';
import VideosFilterer from './VideosFilterer';

describe('VideosFilterer', () => {
  const hiddenFiltererMenuClassName = 'filterer__menu--hidden';
  it('renders OK', () => {
    render(<VideosFilterer />);
  });

  it('can toggle visibility', () => {
    const {container} = render(<VideosFilterer />);
    const toggleButton = container.querySelector(
      '.filterer__toggle-button',
    ) as HTMLButtonElement;
    const filtererMenu = container.querySelector(
      '.filterer__menu',
    ) as HTMLDivElement;

    expect(filtererMenu.classList.contains(hiddenFiltererMenuClassName)).toBe(
      true,
    );

    toggleButton.click();

    expect(filtererMenu.classList.contains(hiddenFiltererMenuClassName)).toBe(
      false,
    );

    toggleButton.click();

    expect(filtererMenu.classList.contains(hiddenFiltererMenuClassName)).toBe(
      true,
    );
  });
});
