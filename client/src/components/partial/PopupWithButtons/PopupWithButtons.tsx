import React from 'react';

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
  ({className = '', children}, ref) => (
    <div className={`opup buttons-popup ${className}`} ref={ref}>
      {children}
      {/* {buttons.map(button => (
        <PopupWithButtons.Button {...button} key={button.text} />
      ))} */}
    </div>
  ),
) as PopupWithButtonsType;

PopupWithButtons.Button = ({text, onClick}: PopupButtonProps) => (
  <button type="button" onClick={onClick} className="popup__button">
    {text}
  </button>
);

export default React.memo(PopupWithButtons);
