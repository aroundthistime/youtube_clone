type CategoryTabType = {
  name: string;
  iconClassName: string;
};

export const CATEGORY_TABS: CategoryTabType[] = [
  {
    name: 'Music',
    iconClassName: 'fa-solid fa-headphones-simple',
  },
  {
    name: 'Game',
    iconClassName: 'fa-solid fa-gamepad',
  },
  {
    name: 'Movie',
    iconClassName: 'fa-solid fa-film',
  },
  {
    name: 'Social News',
    iconClassName: 'fa-solid fa-earth-oceania',
  },
  {
    name: 'Animals',
    iconClassName: 'fa-solid fa-dog',
  },
  {
    name: 'Food',
    iconClassName: 'fa-solid fa-utensils',
  },
  {
    name: 'Art',
    iconClassName: 'fa-solid fa-palette',
  },
  {
    name: 'TV Shows',
    iconClassName: 'fa-solid fa-tv',
  },
  {
    name: 'Travel',
    iconClassName: 'fa-solid fa-plane',
  },
  {
    name: 'Fashion',
    iconClassName: 'fa-solid fa-shirt',
  },
  {
    name: 'Science',
    iconClassName: 'fa-solid fa-microscope',
  },
  {
    name: 'Educational',
    iconClassName: 'fa-solid fa-graduation-cap',
  },
  {
    name: 'Kids',
    iconClassName: 'fa-solid fa-baby',
  },
];

export const CATEGORIES = CATEGORY_TABS.map((categoryTab) => categoryTab.name);

export type CategoryType = typeof CATEGORIES[number];
