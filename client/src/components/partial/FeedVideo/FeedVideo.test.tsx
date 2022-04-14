import React from 'react';
import {useMutation} from 'react-query';
import {render, testData} from '../../../utils/testUtils';
import FeedVideo from './FeedVideo';

describe('Feed Video', () => {
  const video = testData.breifVideo;
  const mutation = () => useMutation(jest.fn());
  it('renders OK', () => {
    render(<FeedVideo video={video} mutation={mutation} />);
  });
});
