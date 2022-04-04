/* eslint-disable import/prefer-default-export */
export const PASSWORD_LEAST_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 20;

export const passwordHasAppropriateLength = (password: string): boolean =>
  password.length >= PASSWORD_LEAST_LENGTH &&
  password.length <= PASSWORD_MAX_LENGTH;
