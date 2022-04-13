import React from 'react';
import {render} from '../../../utils/testUtils';
import LazyImage, {loadLazyImage} from './LazyImage';

describe('LazyImage', () => {
  const src = '/path/to/image';
  it('is loaded lazily', () => {
    const {container} = render(<LazyImage src={src} />);

    expect(container.querySelector('img') !== null).toEqual(true);
    const image = container.querySelector('img') as HTMLImageElement;

    expect(image.getAttribute('src')).toEqual(null);
    loadLazyImage(image as HTMLImageElement);
    expect(image.getAttribute('src')).toEqual(src);
  });
  it('loads alt with as well', () => {
    const alt = 'this is lazy image';
    const {container} = render(<LazyImage src={src} alt={alt} />);

    expect(container.querySelector('img') !== null).toEqual(true);
    const image = container.querySelector('img') as HTMLImageElement;

    expect(image.getAttribute('alt')).toEqual(null);
    loadLazyImage(image as HTMLImageElement);
    expect(image.getAttribute('alt')).toEqual(alt);
  });
});
