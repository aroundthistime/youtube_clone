import React from 'react';
import {Link} from 'react-router-dom';
import './AuthFormLink.scss';

type Props = {
  text: string;
  path: string;
  className?: string;
};

const AuthFormLink = ({text, path, className = ''}: Props) => (
  <Link to={path} className={`auth-form__link ${className}`}>
    <p className="link__text">{text}</p>
  </Link>
);

export default AuthFormLink;
