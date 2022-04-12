/* eslint-disable prefer-regex-literals */
/* eslint-disable import/prefer-default-export */

export const getCurrentCategoryFromPathname = (
  pathname: string,
): string | undefined => {
  if (typeof String.prototype.replaceAll === 'undefined') {
    return pathname.split('/')[2]?.replace(new RegExp('%20', 'g'), () => ' ');
  }
  return pathname.split('/')[2]?.replaceAll('%20', ' ');
};

export const getUserIdFromPathname = (pathname: string): string | undefined => {
  return pathname.split('/')[2];
};

export const getVideoIdFromPathname = (
  pathname: string,
): string | undefined => {
  return pathname.split('/')[2];
};
