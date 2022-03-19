import React from 'react';
import './BlurBackground.scss';

const BLURBACKGROUND_CLASSNAME = 'blur-background';

export const showBlurBackground = () => {
  const blurBackground = document.querySelector(`.${BLURBACKGROUND_CLASSNAME}`);
  blurBackground?.classList.add(`${BLURBACKGROUND_CLASSNAME}--visible`);
  blurBackground?.classList.remove(`${BLURBACKGROUND_CLASSNAME}--hidden`);
};

export const hideBlurBackground = () => {
  const blurBackground = document.querySelector(`.${BLURBACKGROUND_CLASSNAME}`);
  blurBackground?.classList.remove(`${BLURBACKGROUND_CLASSNAME}--visible`);
  blurBackground?.classList.add(`${BLURBACKGROUND_CLASSNAME}--hidden`);
};

const BlurBackground = () => <div className="blur-background" />;

export default BlurBackground;
