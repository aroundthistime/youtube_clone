import React from 'react';
import {usePopupWithButtons} from './usePopupWithButtons';

type Props = {
  children?: React.ReactNode;
  className?: string;
};

type PopupButtonProps = {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};
interface PopupWithButtonsType
  extends React.ForwardRefExoticComponent<
    Props & React.RefAttributes<HTMLDivElement>
  > {
  Button: React.FC<PopupButtonProps>;
}

const PopupWithButtons = React.forwardRef<HTMLDivElement, Props>(
  ({className = '', children}, ref) => {
    const {innerRef} = usePopupWithButtons(ref);
    return <div ref={innerRef}>{children}</div>;
  },
) as PopupWithButtonsType;

PopupWithButtons.Button = ({text, onClick}: PopupButtonProps) => (
  <button type="button" onClick={onClick} className="popup__button">
    {text}
  </button>
);

export default PopupWithButtons;
