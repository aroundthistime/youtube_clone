import React from 'react';
import {Link} from 'react-router-dom';
import {UserType} from '../../../../@types/UserType';
import routes from '../../../../routes';

type Props = {
  user: UserType;
  className?: string;
};

const UserNameLink = ({user, className = ''}: Props) => (
  <Link
    to={routes.userDetail(user._id)}
    className={`username-link ${className}`}>
    <p className="username-link__username">{user.name}</p>
  </Link>
);

export default React.memo(UserNameLink);
