import React from 'react';
import {render} from '../../../utils/testUtils';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage', () => {
  it('renders OK', () => {
    const {container, rerender} = render(<ErrorMessage />);
    expect(container.firstElementChild?.className).toEqual('error-message ');

    const className = 'randomClassName';
    rerender(<ErrorMessage className={className} />);
    expect(container.firstElementChild?.classList.contains(className)).toEqual(
      true,
    );
  });
});
