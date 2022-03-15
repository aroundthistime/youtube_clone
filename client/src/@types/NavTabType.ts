export type NavTabType = {
  name: string;
  iconClassName: string;
};

export const LOGGED_IN_TABS: NavTabType[] = [
  {
    name: 'Liked Videos',
    iconClassName: 'fa-solid fa-thumbs-up',
  },
  {
    name: 'History',
    iconClassName: 'fa-solid fa-clock-rotate-left',
  },
  {
    name: 'Watch Later',
    iconClassName: 'fa-regular fa-clock',
  },
];
