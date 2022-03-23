import React, {PropsWithChildren} from 'react';
import './EmptyContent.scss';

type Props = {
  message: string;
  className?: string;
};

const EmptyContent = ({message, className = ''}: PropsWithChildren<Props>) => (
  <div className={`empty-content ${className}`}>{message}</div>
);

export default React.memo(EmptyContent);
