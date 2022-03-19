import React from 'react';
import DefaultProfileImage from '../../../assets/images/default-profile.png';
import './ProfileImage.scss';

type Props = {
  src?: string;
  className?: string;
};

const ProfileImage = ({src = DefaultProfileImage, className = ''}: Props) => {
  return (
    <img
      className={`profile-image no-drag ${className}`}
      src={src}
      alt="프로필 이미지"
    />
  );
};

export default ProfileImage;
