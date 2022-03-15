import React, {PropsWithChildren} from 'react';
import {Link} from 'react-router-dom';
import {NavTabType} from '../../../@types/NavTabType';
import routes from '../../../routes';
import ErrorBoundary from '../../wrapper/ErrorBoundary/ErrorBoundary';
import Categories from '../Categories/Categories';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import './Nav.scss';

const Nav = () => (
  <nav>
    <ErrorBoundary fallback={<ErrorMessage />}>
      <Nav.Section>
        <Categories />
      </Nav.Section>
    </ErrorBoundary>
  </nav>
);

type SectionProps = PropsWithChildren<{}>;

Nav.Section = ({children}: SectionProps) => (
  <section className="nav__section">{children}</section>
);

type TabProps = {
  tab: NavTabType;
};

Nav.LoggedInTab = ({tab}: TabProps) => {
  <Link to={routes.feed + tab.name}>
    <Nav.TabContent tab={tab} />
  </Link>;
};

Nav.CategoryTab = ({tab}: TabProps) => (
  <Link to={`${routes.videos}?category=${tab.name}`}>
    <Nav.TabContent tab={tab} />
  </Link>
);

Nav.TabContent = ({tab}: TabProps) => (
  <li
    className={`tabs__tab no-drag ${
      tab.isSelected ? 'tabs__tab--selected' : ''
    }`}>
    <div className="tab__left">
      <i className={`tab__icon ${tab.iconClassName}`} />
    </div>
    <div className="tab__right">
      <p className="tab__text">{tab.name}</p>
    </div>
  </li>
);

export default Nav;
