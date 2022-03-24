/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-param-reassign */
import React from 'react';

type Props = {
  className?: string;
  src: string;
  alt?: string;
};

export const loadLazyImage = (imageElement: HTMLImageElement) => {
  if (imageElement.dataset.src) {
    imageElement.src = imageElement.dataset.src;
  }
  if (imageElement.dataset.alt) {
    imageElement.alt = imageElement.dataset.alt;
  }
  imageElement.classList.remove('lazy-image');
};

const LazyImage = ({className = '', src, alt = ''}: Props) => (
  <img className={`lazy-image ${className}`} data-src={src} data-alt={alt} />
);

export default LazyImage;
