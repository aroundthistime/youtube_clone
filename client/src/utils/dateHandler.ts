/* eslint-disable import/prefer-default-export */
const SECONDS_TO_MILLISECONDS = 1000;
const MINUTES_TO_MILLISECONDS = SECONDS_TO_MILLISECONDS * 60;
const HOURS_TO_MILLISECONDS = MINUTES_TO_MILLISECONDS * 60;
const DAYS_TO_MILLISECONDS = HOURS_TO_MILLISECONDS * 24;
const MONTHS_TO_MILLISECONDS = DAYS_TO_MILLISECONDS * 30;
const YEARS_TO_MILLISECONDS = MONTHS_TO_MILLISECONDS * 12;

export const getTimeDiffFromNowString = (date: Date): string => {
  const timeDiffFromNow = getTimeDiffFromNow(date);
  return getBiggestUnitFromMilliseconds(timeDiffFromNow);
};

const getTimeDiffFromNow = (date: Date): number => {
  const now = new Date();
  return getTimeDiffBetweenDates(now, date);
};

const getTimeDiffBetweenDates = (date1: Date, date2: Date): number => {
  return date1.getTime() - date2.getTime();
};

export const getBiggestUnitFromMilliseconds = (milliseconds: number) => {
  if (milliseconds >= YEARS_TO_MILLISECONDS) {
    const years = Math.floor(milliseconds / YEARS_TO_MILLISECONDS);
    return `${years}년 전`;
  }
  if (milliseconds >= MONTHS_TO_MILLISECONDS) {
    const months = Math.floor(milliseconds / MONTHS_TO_MILLISECONDS);
    return `${months}달 전`;
  }
  if (milliseconds >= DAYS_TO_MILLISECONDS) {
    const days = Math.floor(milliseconds / DAYS_TO_MILLISECONDS);
    return `${days}일 전`;
  }
  if (milliseconds >= HOURS_TO_MILLISECONDS) {
    const hours = Math.floor(milliseconds / HOURS_TO_MILLISECONDS);
    return `${hours}시간 전`;
  }
  if (milliseconds >= MINUTES_TO_MILLISECONDS) {
    const minutes = Math.floor(milliseconds / MINUTES_TO_MILLISECONDS);
    return `${minutes}분 전`;
  }
  if (milliseconds >= SECONDS_TO_MILLISECONDS) {
    const seconds = Math.floor(milliseconds / SECONDS_TO_MILLISECONDS);
    return `${seconds}초 전`;
  }
  return '지금';
};
