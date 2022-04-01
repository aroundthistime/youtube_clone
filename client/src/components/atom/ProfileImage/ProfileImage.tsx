import React from 'react';
import DefaultProfileImage from '../../../assets/images/default-profile.png';
import LazyImage from '../../partial/LazyImage/LazyImage';
import './ProfileImage.scss';

type Props = {
  src?: string;
  className?: string;
  isLazyImage?: boolean;
};

const ProfileImage = ({
  src = DefaultProfileImage,
  isLazyImage = true,
  className = '',
}: Props) => {
  if (isLazyImage) {
    return (
      <LazyImage
        className={`profile-image no-drag ${className}`}
        src={src}
        alt="프로필 이미지"
      />
    );
  }
  return (
    <img
      className={`profile-image no-drag ${className}`}
      src={src}
      alt="프로필 이미지"
    />
  );
};

export default ProfileImage;
