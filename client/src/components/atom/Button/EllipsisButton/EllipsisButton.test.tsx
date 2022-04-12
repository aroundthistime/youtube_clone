import React from 'react';
import {render} from '@testing-library/react';
import EllipsisButton from './EllipsisButton';

describe('EllipsisButton', () => {
  it('renders OK with Props', () => {
    const {rerender, container} = render(<EllipsisButton onClick={e => 1} />);
    const className = 'randomText';
    rerender(<EllipsisButton onClick={e => 1} className={className} />);
    expect(container.firstChild).toHaveClass(className);
  });
});
