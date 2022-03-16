import {useCallback, useState} from 'react';
import {QueryFunction, useQuery} from 'react-query';

/* eslint-disable import/prefer-default-export */
export const useLazyQuery = (
  key: string,
  fn: QueryFunction<unknown, string>,
  options = {},
) => {
  const [enabled, setEnabled] = useState<boolean>(false);
  const query = useQuery(key, fn, {
    ...options,
    enabled,
  });

  return [useCallback(() => setEnabled(true), []), query];
};
