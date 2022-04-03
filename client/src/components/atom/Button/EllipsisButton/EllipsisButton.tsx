import React from 'react';
import {faEllipsisVertical} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './EllipsisButton.scss';

type Props = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
};

const EllipsisButton = ({onClick, className = ''}: Props) => (
  <button
    onClick={onClick}
    className={`ellipsis-button ${className}`}
    type="button">
    <FontAwesomeIcon
      icon={faEllipsisVertical}
      className="ellipsis-button__icon"
    />
  </button>
);

export default React.memo(EllipsisButton);
