import React from 'react';
import {Link} from 'react-router-dom';
import {UserType} from '../../../@types/UserType';
import LogoImage from '../../../assets/images/logo.png';
import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <Header.Logo />
    </header>
  );
};

Header.Logo = () => {
  return (
    <Link to="/" className="header__logo">
      <img className="logo__image" src={LogoImage} alt="yutube" />
      <h3 className="logo__text">Yutube</h3>
    </Link>
  );
};

Header.Icons = () => {
  // const user =
};

export default Header;
