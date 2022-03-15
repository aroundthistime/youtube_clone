import React from 'react';
import {Link} from 'react-router-dom';
import {useCategoriesQuery} from '../../../@queries/useCategoriesQuery';
import {NavTabType} from '../../../@types/NavTabType';
import routes from '../../../routes';
import ErrorBoundary from '../../wrapper/ErrorBoundary/ErrorBoundary';
import './Nav.scss';

const Nav = () => {
  const {data} = useCategoriesQuery();
  return (
    <nav>
      <ul className="nav__tabs">
        {data?.categories.map((category: NavTabType) => (
          <Nav.CategoryTab tab={category} />
        ))}
      </ul>
    </nav>
  );
};

type TabProps = {
  tab: NavTabType;
};

Nav.LoggedInTab = ({tab}: TabProps) => {
  <Link to={routes.feed + tab.name}>
    <Nav.TabContent tab={tab} />
  </Link>;
};

Nav.CategoryTab = ({tab}: TabProps) => {
  return (
    <Link to={`${routes.videos}?category=${tab.name}`}>
      <Nav.TabContent tab={tab} />
    </Link>
  );
};

Nav.TabContent = ({tab}: TabProps) => (
  <li className="tabs__tab no-drag">
    <div className="tab__left">
      <i className={`tab__icon ${tab.iconClassName}`} />
    </div>
    <div className="tab__right">
      <p className="tab__text">{tab.name}</p>
    </div>
  </li>
);

export default React.memo(Nav);
