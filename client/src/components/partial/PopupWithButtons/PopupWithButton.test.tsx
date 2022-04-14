import React, {createRef} from 'react';
import {render} from '@testing-library/react';
import PopupWithButtons from './PopupWithButtons';

describe('PopupWithButtons', () => {
  const ref = createRef<HTMLDivElement>();
  const buttonText = '버튼';
  it('renders OK', () => {
    render(
      <PopupWithButtons ref={ref}>
        <PopupWithButtons.Button text={buttonText} onClick={() => {}} />
      </PopupWithButtons>,
    );
  });
});
