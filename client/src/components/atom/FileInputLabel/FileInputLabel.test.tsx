import React from 'react';
import {render} from '@testing-library/react';
import FileInputLabel from './FileInputLabel';

describe('FileInputLabel', () => {
  const htmlFor = 'file-input';
  const file = new File(['...'], 'file.txt');
  it('renders information when file inputted', () => {
    const {container} = render(
      <FileInputLabel htmlFor={htmlFor} file={file} />,
    );
    expect(container.querySelector('.label__file-upload-button')).toEqual(null);
    expect(
      container.querySelector('.label__file-information') !== null,
    ).toEqual(true);
  });

  it('renders upload button when file not inputted', () => {
    const {container} = render(<FileInputLabel htmlFor={htmlFor} />);
    expect(
      container.querySelector('.label__file-upload-button') !== null,
    ).toEqual(true);
    expect(container.querySelector('.label__file-information')).toEqual(null);
  });
});
