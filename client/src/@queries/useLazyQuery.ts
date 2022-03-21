import {useCallback, useState} from 'react';
import {QueryFunction, useQuery, UseQueryResult} from 'react-query';

type ReturnType = [Function, UseQueryResult<unknown, unknown>];

/* eslint-disable import/prefer-default-export */
export const useLazyQuery = (
  key: string,
  fn: QueryFunction<unknown, string>,
  options = {},
): ReturnType => {
  const [enabled, setEnabled] = useState<boolean>(false);
  const query = useQuery(key, fn, {
    ...options,
    enabled,
  });

  return [useCallback(() => setEnabled(true), []), query];
};
