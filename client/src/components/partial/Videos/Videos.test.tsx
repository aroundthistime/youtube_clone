import React from 'react';
import {renderHook} from '@testing-library/react-hooks/dom';
import * as ReactQuery from 'react-query';
import {UseInfiniteQueryResult} from 'react-query';
import * as useLazyInfiniteScroll from '../../../@hooks/useLazyInfiniteScroll';
import {useVideosQuery} from '../../../@queries/useVideosQuery';
import {
  defaultVideosQueryResult,
  render,
  testData,
} from '../../../utils/testUtils';
import Videos from './Videos';

describe('Videos', () => {
  jest
    .spyOn(useLazyInfiniteScroll, 'useLazyInfiniteScroll')
    .mockImplementation(() => {});

  it('renders OK when videos exist', () => {
    jest.spyOn(ReactQuery, 'useInfiniteQuery').mockImplementation(() => {
      return defaultVideosQueryResult;
    });
    const {
      result: {current: videosQuery},
    } = renderHook(() => useVideosQuery());

    render(<Videos videosQuery={videosQuery} />);
  });

  it('renders with fetch more indicator when fetching more', () => {
    jest.spyOn(ReactQuery, 'useInfiniteQuery').mockImplementation(() => {
      return {
        ...defaultVideosQueryResult,
        isFetchingNextPage: true,
      };
    });
    const {
      result: {current: videosQuery},
    } = renderHook(() => useVideosQuery());

    const {container} = render(<Videos videosQuery={videosQuery} />);
    expect(container.querySelector('.fetch-more-indicator') !== null).toBe(
      true,
    );
  });

  it("renders Empty Content Message when videos don't exist", () => {
    jest.spyOn(ReactQuery, 'useInfiniteQuery').mockImplementation(() => {
      return {
        ...defaultVideosQueryResult,
        data: {
          pages: [],
        },
      } as unknown as UseInfiniteQueryResult<unknown, unknown>;
    });
    const {
      result: {current: videosQuery},
    } = renderHook(() => useVideosQuery());

    const {container} = render(<Videos videosQuery={videosQuery} />);
    expect(container.querySelector('.empty-content') !== null).toBe(true);
  });

  describe('Videos Header', () => {
    it('renders OK', () => {
      render(<Videos.Header />);
    });
  });

  describe('Videos Title', () => {
    it('renders OK', () => {
      render(<Videos.Title />);
    });
  });

  describe('Videos HeaderRight', () => {
    it('renders OK', () => {
      render(<Videos.HeaderRight />);
    });
  });
});
