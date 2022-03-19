import React from 'react';

type Props = {
  buttons: PopupButtonProps[];
  className?: string;
};

type PopupButtonProps = {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const PopupWithButtons = ({buttons, className = ''}: Props) => (
  <div className={`popup buttons-popup ${className}`}>
    {buttons.map(button => (
      <PopupWithButtons.Button {...button} key={button.text} />
    ))}
  </div>
);

PopupWithButtons.Button = ({text, onClick}: PopupButtonProps) => (
  <button type="button" onClick={onClick} className="popup__button">
    {text}
  </button>
);

export default React.memo(PopupWithButtons);
