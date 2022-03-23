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
  imageElement.classList.remove('lazy-image');
};

const LazyImage = ({className = '', src, alt = ''}: Props) => (
  <img className={`lazy-image ${className}`} data-src={src} alt={alt} />
);

export default LazyImage;
