import React from 'react';
import {Link} from 'react-router-dom';
import Nav from '../../partial/Nav/Nav';
import {FeedTabType, useFeedTabs} from './useFeedTabs';

const FeedTabs = () => {
  const {feedTabs} = useFeedTabs();
  return (
    <ul className="nav__tabs feed-tabs">
      {feedTabs.map(feedTab => (
        <FeedTabs.FeedTab {...feedTab} key={feedTab.name} />
      ))}
    </ul>
  );
};

FeedTabs.FeedTab = ({name, iconClassName, path, isSelected}: FeedTabType) => (
  <Link to={path} className="feed-link">
    <Nav.TabContent
      tab={{
        name,
        iconClassName,
        isSelected,
      }}
    />
  </Link>
);

export default FeedTabs;