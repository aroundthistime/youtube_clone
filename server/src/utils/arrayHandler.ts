export const getReversedPaginationFetchIndexRange = (
  array: any[],
  fetchUnit: number,
  page: number,
): [number, number] => {
  const startIndex = array.length - 1 - fetchUnit * (page - 1);
  const endIndex = Math.max(0, array.length - fetchUnit * page);
  return [startIndex, endIndex];
};
