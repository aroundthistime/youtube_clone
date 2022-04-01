/* eslint-disable import/prefer-default-export */
const SECOND_TO_MILLISECONDS = 1000;
const MINUTE_TO_MILLISECONDS = SECOND_TO_MILLISECONDS * 60;
const HOUR_TO_MILLISECONDS = MINUTE_TO_MILLISECONDS * 60;
const DAY_TO_MILLISECONDS = HOUR_TO_MILLISECONDS * 24;
const WEEK_TO_MILLISECONDS = DAY_TO_MILLISECONDS * 7;
const MONTH_TO_MILLISECONDS = DAY_TO_MILLISECONDS * 30;
const YEAR_TO_MILLISECONDS = MONTH_TO_MILLISECONDS * 12;

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
  if (milliseconds >= YEAR_TO_MILLISECONDS) {
    const years = Math.floor(milliseconds / YEAR_TO_MILLISECONDS);
    return `${years}년 전`;
  }
  if (milliseconds >= MONTH_TO_MILLISECONDS) {
    const months = Math.floor(milliseconds / MONTH_TO_MILLISECONDS);
    return `${months}달 전`;
  }
  if (milliseconds >= WEEK_TO_MILLISECONDS) {
    const weeks = Math.floor(milliseconds / WEEK_TO_MILLISECONDS);
    return `${weeks}주 전`;
  }
  if (milliseconds >= DAY_TO_MILLISECONDS) {
    const days = Math.floor(milliseconds / DAY_TO_MILLISECONDS);
    return `${days}일 전`;
  }
  if (milliseconds >= HOUR_TO_MILLISECONDS) {
    const hours = Math.floor(milliseconds / HOUR_TO_MILLISECONDS);
    return `${hours}시간 전`;
  }
  if (milliseconds >= MINUTE_TO_MILLISECONDS) {
    const minutes = Math.floor(milliseconds / MINUTE_TO_MILLISECONDS);
    return `${minutes}분 전`;
  }
  if (milliseconds >= SECOND_TO_MILLISECONDS) {
    const seconds = Math.floor(milliseconds / SECOND_TO_MILLISECONDS);
    return `${seconds}초 전`;
  }
  return '지금';
};

export const getTimestampFromSeconds = (timeInSeconds: number): string => {
  const HOUR_TO_SECONDS = HOUR_TO_MILLISECONDS / SECOND_TO_MILLISECONDS;
  const MINUTE_TO_SECONDS = 60;
  let temp: number = Math.round(timeInSeconds);
  let hours: number = 0;
  let minutes: number = 0;
  let seconds: number = 0;
  if (temp >= HOUR_TO_SECONDS) {
    hours = Math.floor(temp / HOUR_TO_SECONDS);
    temp %= HOUR_TO_SECONDS;
  }
  if (temp >= MINUTE_TO_SECONDS) {
    minutes = Math.floor(temp / MINUTE_TO_SECONDS);
    temp %= MINUTE_TO_SECONDS;
  }
  seconds = temp;
  const secondStringWithPadding = `${seconds}`.padStart(2, '0');
  if (hours > 0) {
    const minuteStringWithPadding = `${minutes}`.padStart(2, '0');
    return `${hours}:${minuteStringWithPadding}:${secondStringWithPadding}`;
  }
  return `${minutes}:${secondStringWithPadding}`;
};

export const getDateTimestamp = (dateObject: Date): string => {
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1;
  const date = dateObject.getDate();
  return `${year}.${month}.${date}`;
};
