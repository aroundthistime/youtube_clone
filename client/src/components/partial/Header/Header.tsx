import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {faSearch, faVideo} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {RootState} from '../../../@modules/root';
import {UserState} from '../../../@modules/userSlice';
import {UserType} from '../../../@types/UserType';
import LogoImage from '../../../assets/images/logo.png';
import routes from '../../../routes';
import ProfileImage from '../../atom/ProfileImage/ProfileImage';
import SearchForm from '../SearchForm/SearchForm';
import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <Header.Logo />
      <SearchForm />
      <Header.Right />
    </header>
  );
};

Header.Logo = () => {
  return (
    <Link to="/" className="header__logo no-drag">
      <img className="logo__image" src={LogoImage} alt="yutube" />
      <h3 className="logo__text">Yutube</h3>
    </Link>
  );
};

Header.Right = () => {
  const user = useSelector((state: RootState) => state.user);
  return (
    <div className="header__right no-drag">
      {user && <Header.UploadButton />}
      <Header.AuthButton user={user} />
    </div>
  );
};

type AuthButtonProps = {
  user: UserState;
};

Header.AuthButton = ({user}: AuthButtonProps) => {
  return (
    <Link
      to={user ? routes.myProfile : routes.login}
      className="header__button">
      <ProfileImage className="header__icon" src={user?.avatarUrl} />
    </Link>
  );
};

Header.UploadButton = () => (
  <Link to={routes.uploadVideo} className="header__button">
    <Header.Icon icon={faVideo} />
  </Link>
);

type HeaderIconProps = {
  icon: IconProp;
};

Header.Icon = ({icon}: HeaderIconProps) => (
  <FontAwesomeIcon icon={icon} className="header__icon" />
);

export default Header;
