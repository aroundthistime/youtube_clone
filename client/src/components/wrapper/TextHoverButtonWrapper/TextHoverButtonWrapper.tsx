import React, {PropsWithChildren} from 'react';
import './TextHoverButtonWrapper.scss';

type Props = {
  text: string;
};

const TextHoverButtonWrapper = ({text, children}: PropsWithChildren<Props>) => (
  <div className="text-hover-button">
    {children}
    <div className="text-hover-button__hidden-text no-drag">{text}</div>
  </div>
);

export default React.memo(TextHoverButtonWrapper);
