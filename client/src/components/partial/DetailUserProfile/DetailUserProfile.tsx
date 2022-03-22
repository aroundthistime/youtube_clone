import React from 'react';
import {UserType} from '../../../@types/UserType';
import ProfileImage from '../../atom/ProfileImage/ProfileImage';
import './DetailUserProfile.scss';

type Props = {
  user: UserType;
  myProfileButton?: React.ReactNode;
};

const DetailUserProfile = ({user, myProfileButton}: Props) => {
  return (
    <div className="user-profile user-profile--detail">
      <ProfileImage src={user.avatarUrl} className="profile-image--large" />
      <h3 className="user-profile__name">{user.name}</h3>
      <h6 className="user-profile__status">{user.status}</h6>
      {myProfileButton}
    </div>
  );
};

export default React.memo(DetailUserProfile);
