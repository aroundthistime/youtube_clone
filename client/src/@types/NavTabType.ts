import {CategoryType} from './CategoryType';

export type NavTabType = {
  text: IconClassNameType;
  iconClassName: string;
};

type IconClassNameType = 'Home' | LoggedInTabType | CategoryType;

type LoggedInTabType = typeof LOGGED_IN_TABS[number];

export const LOGGED_IN_TABS = ['Liked Videos', 'History', 'Watch Later'];
