import {renderHook} from '@testing-library/react-hooks/dom';
import React, {Suspense} from 'react';
import * as ReactQuery from 'react-query';
import * as useLazyInfiniteScroll from '../../../@hooks/useLazyInfiniteScroll';
import {useVideosQuery} from '../../../@queries/useVideosQuery';
import {defaultVideosQueryResult, render} from '../../../utils/testUtils';
import VideosWithFilterer from './VideosWithFilterer';

describe('VideosWithFilterer', () => {
  jest
    .spyOn(useLazyInfiniteScroll, 'useLazyInfiniteScroll')
    .mockImplementation(() => {});

  it('renders OK', () => {
    jest.spyOn(ReactQuery, 'useInfiniteQuery').mockImplementation(() => {
      return defaultVideosQueryResult;
    });
    const {
      result: {current: videosQuery},
    } = renderHook(() => useVideosQuery());

    render(
      <Suspense fallback={<div />}>
        <VideosWithFilterer videosQuery={videosQuery} />
      </Suspense>,
    );
  });
});
