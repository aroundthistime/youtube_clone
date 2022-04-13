import React from 'react';
import './BlurBackground.scss';

const getBlurBackgroundElement = () => {
  return document.getElementById('blur-background');
};

export const showBlurBackground = () => {
  const blurBackground = getBlurBackgroundElement();
  if (blurBackground) {
    blurBackground.dataset.isVisible = 'true';
  }
};

export const hideBlurBackground = () => {
  const blurBackground = getBlurBackgroundElement();
  if (blurBackground) {
    blurBackground.dataset.isVisible = 'false';
  }
};

const BlurBackground = () => (
  <div
    className="blur-background"
    id="blur-background"
    data-testid="blur-background"
  />
);

export default React.memo(BlurBackground);
