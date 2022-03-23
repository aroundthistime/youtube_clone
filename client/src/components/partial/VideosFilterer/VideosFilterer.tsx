import {faChartBar} from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {
  FilterButtonType,
  FilterGroup,
  useVideosFilterer,
} from './useVideosFilterer';
import './VideosFilterer.scss';

const VideosFilterer = () => {
  const {showFiltererMenu, onToggleButtonClick, filterGroups} =
    useVideosFilterer();
  return (
    <div className="videos-filterer">
      <button
        type="button"
        className="filterer__toggle-button"
        onClick={onToggleButtonClick}>
        <FontAwesomeIcon icon={faChartBar} className="toggle-button__icon" />
        필터
      </button>
      <div
        className={`filterer__menu ${
          showFiltererMenu ? '' : 'filterer__menu--hidden'
        }`}>
        {filterGroups.map(filterGroup => (
          <VideosFilterer.FilterGroup
            {...filterGroup}
            key={filterGroup.title}
          />
        ))}
      </div>
    </div>
  );
};

VideosFilterer.FilterGroup = ({title, buttons}: FilterGroup) => (
  <div className="filterer__group">
    <h5 className="group__title">{title}</h5>
    <ul className="group__options">
      {buttons.map(button => (
        <VideosFilterer.FilterOptionButton {...button} key={button.text} />
      ))}
    </ul>
  </div>
);

VideosFilterer.FilterOptionButton = ({
  text,
  onClick,
  isSelected,
}: FilterButtonType) => (
  <button
    type="button"
    onClick={onClick}
    className={`group__option ${isSelected ? 'group__option--selected' : ''}`}>
    {text}
  </button>
);

export default React.memo(VideosFilterer);
