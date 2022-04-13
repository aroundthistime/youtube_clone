import {render} from '@testing-library/react';
import React from 'react';
import TextHoverButtonWrapper from './TextHoverButtonWrapper';

describe('TextHoverButtonWrapper', () => {
  it('renders OK', () => {
    render(<TextHoverButtonWrapper text="wrapper" />);
  });
});
