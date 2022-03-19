import React, {PropsWithChildren} from 'react';
import {NavTabType} from '../../../@types/NavTabType';
import FeedTabs from '../../pages/FeedTabs/FeedTabs';
import ErrorBoundary from '../../wrapper/ErrorBoundary/ErrorBoundary';
import Categories from '../Categories/Categories';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import './Nav.scss';
import {useNav} from './useNav';

const Nav = () => {
  const {user, ref} = useNav();
  return (
    <nav ref={ref}>
      <ErrorBoundary fallback={<ErrorMessage />}>
        {user && (
          <Nav.Section>
            <FeedTabs />
          </Nav.Section>
        )}
        <Nav.Section>
          <Categories />
        </Nav.Section>
      </ErrorBoundary>
    </nav>
  );
};

type SectionProps = PropsWithChildren<{}>;

Nav.Section = ({children}: SectionProps) => (
  <section className="nav__section">{children}</section>
);

type TabProps = {
  tab: NavTabType;
};

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
