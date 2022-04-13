import {render} from '@testing-library/react';
import React from 'react';
import EmptyContent from './EmptyContent';

describe('EmptyContent', () => {
  const message = '텅 빈 화면입니다.';
  it('renders OK', () => {
    const {getByText} = render(<EmptyContent message={message} />);
    getByText(message);
  });
});
