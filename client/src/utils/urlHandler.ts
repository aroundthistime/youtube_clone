/* eslint-disable import/prefer-default-export */
export const getCurrentCategoryFromPathname = (
  pathname: string,
): string | undefined => {
  return pathname.split('/')[2]?.replaceAll('%20', ' ');
};

export const getUserIdFromPathname = (pathname: string): string | undefined => {
  return pathname.split('/')[2];
};
