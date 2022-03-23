import {TimeStandardType} from '../@types/timeStandardType';

const SECOND_TO_MILLISECONDS = 1000;
const MINUTE_TO_MILLISECONDS = SECOND_TO_MILLISECONDS * 60;
const HOUR_TO_MILLISECONDS = MINUTE_TO_MILLISECONDS * 60;
const DAY_TO_MILLISECONDS = HOUR_TO_MILLISECONDS * 24;
const WEEK_TO_MILLISECONDS = DAY_TO_MILLISECONDS * 7;
const MONTHS_TO_MILLISECONDS = DAY_TO_MILLISECONDS * 30;
const YEAR_TO_MILLISECONDS = MONTHS_TO_MILLISECONDS * 12;

export const TIME_GAPS = {
  오늘: HOUR_TO_MILLISECONDS,
  '이번 주': WEEK_TO_MILLISECONDS,
  '이번 달': MONTHS_TO_MILLISECONDS,
  올해: YEAR_TO_MILLISECONDS,
};

export const getDateQueryStartRangeByTimeStandard = (
  timeStandard: TimeStandardType,
): Date => {
  const queryStartTime = new Date().getTime() - TIME_GAPS[timeStandard];
  return new Date(queryStartTime);
};
