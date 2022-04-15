import React from 'react';
import {render, testData} from '../../../utils/testUtils';
import DefaultVideo from './DefaultVideo';

describe('DefaultVideo', () => {
  const video = testData.briefVideo;
  it('renders OK when not logged in', () => {
    const {container} = render(<DefaultVideo video={video} />);
    expect(container.querySelector('.video__overlay-buttons')).toBeNull();
  });

  it('renders OK when is my video', () => {
    const {getByText} = render(<DefaultVideo video={video} />, {
      preloadedState: {
        user: testData.user,
      },
    });

    getByText('영상 수정');
    getByText('영상 삭제');
  });

  it('renders OK when is not my video', () => {
    const {getByText} = render(<DefaultVideo video={video} />, {
      preloadedState: {
        user: testData.differentUser,
      },
    });

    getByText('목록에서 제거');
  });
});
