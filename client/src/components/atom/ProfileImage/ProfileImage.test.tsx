import {render} from '@testing-library/react';
import React from 'react';
import {loadLazyImage} from '../../partial/LazyImage/LazyImage';
import ProfileImage from './ProfileImage';

describe('ProfileImage', () => {
  const src = '/path/to/image';
  it('renders lazily when is lazy', () => {
    const {container} = render(<ProfileImage src={src} />);
    expect(container.querySelector('img') !== null).toEqual(true);

    const image = container.querySelector('img') as HTMLImageElement;
    expect(image.getAttribute('src')).toEqual(null);

    loadLazyImage(image);
    expect(image.getAttribute('src')).toEqual(src);
  });

  it('renders instantly when not lazy', () => {
    const {container} = render(<ProfileImage src={src} isLazyImage={false} />);
    expect(container.querySelector('img')?.getAttribute('src')).toEqual(src);
  });
});
