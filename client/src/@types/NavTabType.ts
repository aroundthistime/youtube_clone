import {CategoryType} from './CategoryType';

export type NavTabType = {
  text: string;
  iconClassName: IconClassNameType;
};

type IconClassNameType = 'Home' | 'History' | 'WatchLater' | CategoryType;
