import {render} from '@testing-library/react';
import React from 'react';
import BlurBackground, {
  hideBlurBackground,
  showBlurBackground,
} from './BlurBackground';

describe('BlurBackground', () => {
  it('renders OK', () => {
    const {getByTestId} = render(<BlurBackground />);
    const blurBackgroundElement = getByTestId('blur-background');

    hideBlurBackground();
    expect(blurBackgroundElement.dataset.isVisible).toEqual('false');

    showBlurBackground();
    expect(blurBackgroundElement.dataset.isVisible).toEqual('true');
  });

  it("doesn't to anything when blurBackground doesn't exist", () => {
    showBlurBackground();
    hideBlurBackground();
  });
});
