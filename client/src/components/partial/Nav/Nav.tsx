import React, {PropsWithChildren} from 'react';
import {NavTabType} from '../../../@types/NavTabType';
import FeedTabs from '../../pages/FeedTabs/FeedTabs';
import ErrorBoundary from '../../wrapper/ErrorBoundary/ErrorBoundary';
import Categories from '../Categories/Categories';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import './Nav.scss';
import {useNav} from './useNav';

const Nav = React.forwardRef<HTMLElement>((_, ref) => {
  const {user, innerRef} = useNav(ref);
  return (
    <nav ref={innerRef}>
      <ErrorBoundary fallback={<ErrorMessage />}>
        {user && (
          <NavSection>
            <FeedTabs />
          </NavSection>
        )}
        <NavSection>
          <Categories />
        </NavSection>
      </ErrorBoundary>
    </nav>
  );
});

type SectionProps = PropsWithChildren<{}>;

const NavSection = ({children}: SectionProps) => (
  <section className="nav__section">{children}</section>
);

type TabProps = {
  tab: NavTabType;
};

export const NavTabContent = ({tab}: TabProps) => (
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
