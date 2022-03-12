import React, {PropsWithChildren} from 'react';
import {NavTabType} from '../../../@types/NavTabType';
import './Nav.scss';

const Nav = () => (
  <nav>
    <i className="fa-solid fa-house-chimney" />
  </nav>
);

type SectionProps = PropsWithChildren<{}>;

Nav.Section = ({children}: SectionProps) => (
  <section className="nav__section">{children}</section>
);

type TabsProps = {
  tabs: NavTabType[];
};

Nav.Tabs = ({tabs}: TabsProps) => (
  <ul className="nav__tabs">
    {tabs.map(tab => (
      <Nav.Tab tab={tab} key={tab.text} />
    ))}
  </ul>
);

type TabProps = {
  tab: NavTabType;
};

Nav.Tab = ({tab}: TabProps) => (
  <li className="tabs__tab">
    <i className={`tab__icon ${tab.iconClassName}`} />
    <p className="tab__text">{tab.text}</p>
  </li>
);

export default Nav;
