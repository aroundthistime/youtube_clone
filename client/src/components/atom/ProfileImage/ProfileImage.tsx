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
  const srcWithFullUrl =
    src === DefaultProfileImage ? src : process.env.REACT_APP_BASE_URL + src;
  if (isLazyImage) {
    return (
      <LazyImage
        className={`profile-image no-drag ${className}`}
        src={srcWithFullUrl}
        alt="프로필 이미지"
      />
    );
  }
  return (
    <img
      className={`profile-image no-drag ${className}`}
      src={srcWithFullUrl}
      alt="프로필 이미지"
    />
  );
};

export default ProfileImage;
