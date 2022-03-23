/* eslint-disable import/prefer-default-export */
import React, {useMemo, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {useUrlQuery} from '../../../@hooks/useUrlQuery';
import {
  VideoSortMethodType,
  VIDEO_SORT_METHODS,
} from '../../../@types/SortMethodType';
import {
  TimeStandardType,
  TIME_STANDARDS,
} from '../../../@types/TimeStandardType';

export type FilterButtonType = {
  text: VideoSortMethodType | TimeStandardType;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  isSelected: boolean;
};

export type FilterGroup = {
  title: string;
  buttons: FilterButtonType[];
};

type ReturnType = {
  showFiltererMenu: boolean;
  onToggleButtonClick: React.MouseEventHandler<HTMLButtonElement>;
  filterGroups: FilterGroup[];
};

export const useVideosFilterer = (): ReturnType => {
  const [showFiltererMenu, setShowFiltererMenu] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const urlQuery = useUrlQuery();
  const currentSortMethod = urlQuery.get('sort') || '전체';
  const currentUploadTimeStandard = urlQuery.get('upload');

  const sortMethodFilterButtons = useMemo(() => {
    return VIDEO_SORT_METHODS.map(videoSortMethod => {
      const sortMethodFilterButton = {
        text: videoSortMethod,
        onClick: () => {
          urlQuery.set('sort', videoSortMethod);
          navigate({
            pathname: location.pathname,
            search: urlQuery.toString(),
          });
        },
        isSelected: videoSortMethod === currentSortMethod,
      };
      return sortMethodFilterButton;
    });
  }, [location.search]);

  const uploadTimeFilterButtons = useMemo(() => {
    return TIME_STANDARDS.map(timeStandard => {
      const sortMethodFilterButton = {
        text: timeStandard,
        onClick: () => {
          urlQuery.set('upload', timeStandard);
          navigate({
            pathname: location.pathname,
            search: urlQuery.toString(),
          });
        },
        isSelected: timeStandard === currentUploadTimeStandard,
      };
      return sortMethodFilterButton;
    });
  }, [location.search]);

  const onToggleButtonClick = () => {
    setShowFiltererMenu(prev => !prev);
  };

  return {
    filterGroups: [
      {
        title: '업로드 날짜',
        buttons: uploadTimeFilterButtons,
      },
      {
        title: '정렬 기준',
        buttons: sortMethodFilterButtons,
      },
    ],
    onToggleButtonClick,
    showFiltererMenu,
  };
};
