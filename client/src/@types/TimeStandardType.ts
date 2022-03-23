export const TIME_STANDARDS = [
  '오늘',
  '이번 주',
  '이번 달',
  '올해',
  '전체',
] as const;

export type TimeStandardType = typeof TIME_STANDARDS[number];
