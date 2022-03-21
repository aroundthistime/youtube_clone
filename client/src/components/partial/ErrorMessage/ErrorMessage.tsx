import React from 'react';
import './ErrorMessage.scss';

type Props = {
  className?: string;
};

const ErrorMessage = ({className = ''}: Props) => (
  <div className={`error-message ${className}`}>
    <h3 className="message__text">오류가 발생했습니다</h3>
  </div>
);

export default ErrorMessage;
