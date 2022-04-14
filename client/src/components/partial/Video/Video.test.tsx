import React from 'react';
import {render, testData} from '../../../utils/testUtils';
import useVideoButton from '../../../@hooks/useVideoButton';
import Video from './Video';

let mockUseToggleWatchLaterButton: jest.Mock;

jest.mock('../../../@hooks/useVideoButton', () => {
  mockUseToggleWatchLaterButton = jest.fn();
  return {
    __esModule: true,
    ...jest.requireActual('../../../@hooks/useVideoButton'),
    default: {},
    useEditVideoButton: () => ({
      onClick: jest.fn(),
    }),
    useDeleteVideoButton: () => ({
      onClick: jest.fn(),
    }),
    useToggleWatchLaterButton: mockUseToggleWatchLaterButton,
  };
});

// const mockUseToggleWatchLaterButton = useVideoButton.useToggleLikeButton as

describe('Video', () => {
  const video = testData.breifVideo;

  it('renders OK', () => {
    render(<Video video={video} />);
  });

  it('renders nothing when render prop is false', () => {
    const {container} = render(<Video video={video} render={false} />);
    expect(container).toBeEmptyDOMElement();
  });

  describe('Video Overlay Buttons', () => {
    // beforeAll(() => {
    //   jest
    //     .spyOn(useVideoButton, 'useDeleteVideoButton')
    //     .mockImplementation(() => ({
    //       onClick: jest.fn(),
    //     }));
    // });

    // beforeAll(() => {
    //   jest.mock('../../../@hooks/useVideoButton', () => ({
    //     __esModule: true,
    //     ...jest.requireActual('../../../@hooks/useVideoButton'),
    //     useEditVideoButton: () => ({
    //       onClick: jest.fn(),
    //     }),
    //     useDeleteVideoButton: () => ({
    //       onClick: jest.fn(),
    //     }),
    //     useToggleWatchLaterButton: () => {
    //       console.log('최소한 실행은 됐다');
    //       return {
    //         onClick: jest.fn(),
    //         isLoading: true,
    //         isActive: true,
    //       };
    //     },
    //   }));
    // });

    // jest.mock('../../../@hooks/useVideoButton', () => ({
    //   __esModule: true,
    //   ...jest.requireActual('../../../@hooks/useVideoButton'),
    //   useEditVideoButton: () => ({
    //     onClick: jest.fn(),
    //   }),
    //   useDeleteVideoButton: () => ({
    //     onClick: jest.fn(),
    //   }),
    //   useToggleWatchLaterButton: () => {
    //     console.log('최소한 실행은 됐다');
    //     return {
    //       onClick: jest.fn(),
    //       isLoading: true,
    //       isActive: true,
    //     };
    //   },
    // }));

    const setRender: React.Dispatch<React.SetStateAction<boolean>> = () => {};

    it('renders OK', () => {
      render(
        <Video video={video}>
          <Video.OverlayButtons />
        </Video>,
      );
    });

    it('renders Video Edit Button', () => {
      render(<Video.EditVideoButton videoId={video._id} />);
    });

    it('renders Video Delete Button', () => {
      render(
        <Video.DeleteVideoButton videoId={video._id} setRender={setRender} />,
      );
    });

    describe('Video Toggle Watch Later Button', () => {
      it('renders OK when is in watch Later', () => {
        const {getByText, debug} = render(
          <Video.ToggleWatchLaterButton videoId={video._id} isInWatchLater />,
        );
        debug();
        getByText('나중에 볼 영상에서 제거');
        // debug();
        // rerender(
        //   <Video.ToggleWatchLaterButton
        //     videoId={video._id}
        //     isInWatchLater={false}
        //   />,
        // );
        // debug();
        // getByText('나중에 볼 영상에 추가');
      });

      it('renders OK when is not in watch Later', () => {
        const {getByText} = render(
          <Video.ToggleWatchLaterButton
            videoId={video._id}
            isInWatchLater={false}
          />,
        );

        getByText('나중에 볼 영상에 추가');
      });

      it('shows loading overlaybutton when is loading', () => {
        mockUseToggleWatchLaterButton.mockReturnValue({
          onClick: jest.fn(),
          isLoading: false,
          isActive: true,
        });
        // useToggleWatchLaterButton.mockReturnValue({
        //   onClick: jest.fn(),
        //   isLoading: false,
        //   isActive: true,
        // });
        render(
          <Video.ToggleWatchLaterButton videoId={video._id} isInWatchLater />,
        );
      });
    });
  });
});
