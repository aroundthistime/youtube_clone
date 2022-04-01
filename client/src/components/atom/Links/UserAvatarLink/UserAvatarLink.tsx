import React from 'react';
import {Link} from 'react-router-dom';
import {UserType} from '../../../../@types/UserType';
import routes from '../../../../routes';
import ProfileImage from '../../ProfileImage/ProfileImage';
import './UserAvatarLink.scss';

type Props = {
  user: UserType;
  className?: string;
};

const UserAvatarLink = ({user, className = ''}: Props) => (
  <Link to={routes.userDetail(user._id)} className={`avatar-link ${className}`}>
    <ProfileImage src={user.avatarUrl} className="avatar-link__profile-image" />
  </Link>
);

export default React.memo(UserAvatarLink);
