/* eslint-disable import/prefer-default-export */
const 억 = 100000000;
const 만 = 10000;
const 천 = 1000;

export const getBiggestUnitFromNumber = (number: number): string => {
  if (number >= 억) {
    return `${leaveNOrLessDecimalPlaces(number / 억)}억`;
  }
  if (number >= 만) {
    return `${leaveNOrLessDecimalPlaces(number / 만)}만`;
  }
  if (number >= 천) {
    return `${leaveNOrLessDecimalPlaces(number / 천)}천`;
  }
  return `${number}`;
};

const leaveNOrLessDecimalPlaces = (number: number, N: number = 1): number => {
  if (number !== Math.round(number)) {
    return +number.toFixed(N);
  }
  return number;
};
