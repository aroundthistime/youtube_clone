import React from 'react';
import DefaultProfileImage from '../../../assets/images/default-profile.png';
import LazyImage from '../../partial/LazyImage/LazyImage';
import './ProfileImage.scss';

type Props = {
  src?: string;
  className?: string;
};

const ProfileImage = ({src = DefaultProfileImage, className = ''}: Props) => {
  return (
    // <LazyImage
    //   className={`profile-image no-drag ${className}`}
    //   src={src}
    //   alt="프로필 이미지"
    //   />
    <img
      className={`profile-image no-drag ${className}`}
      src={src}
      alt="프로필 이미지"
    />
  );
};

export default ProfileImage;
