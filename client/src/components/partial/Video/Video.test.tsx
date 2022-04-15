import React, {useState} from 'react';
import {toast} from 'react-toastify';
import {useMutation, UseMutationResult} from 'react-query';
import {render, testData} from '../../../utils/testUtils';
import * as useVideoButton from '../../../@hooks/useVideoButton';
import Video from './Video';

describe('Video', () => {
  const video = testData.briefVideo;
  const setRender: React.Dispatch<React.SetStateAction<boolean>> = () => {};

  it('renders OK', () => {
    render(<Video video={video} />);
  });

  it('renders nothing when render prop is false', () => {
    const {container} = render(<Video video={video} render={false} />);
    expect(container).toBeEmptyDOMElement();
  });

  describe('Video Overlay Buttons', () => {
    it('renders OK', () => {
      render(
        <Video video={video}>
          <Video.OverlayButtons />
        </Video>,
      );
    });

    it('renders Video Edit Button', () => {
      jest
        .spyOn(useVideoButton, 'useEditVideoButton')
        .mockImplementation(() => ({
          onClick: jest.fn(),
        }));
      render(<Video.EditVideoButton videoId={video._id} />);
    });

    it('renders Video Delete Button', () => {
      jest
        .spyOn(useVideoButton, 'useDeleteVideoButton')
        .mockImplementation(() => ({
          onClick: jest.fn(),
        }));
      render(
        <Video.DeleteVideoButton videoId={video._id} setRender={setRender} />,
      );
    });

    describe('Video Toggle Watch Later Button', () => {
      it('renders OK when is in watch Later', () => {
        const {getByText, debug} = render(
          <Video.ToggleWatchLaterButton videoId={video._id} isInWatchLater />,
        );
        getByText('나중에 볼 영상에서 제거');
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

      it('renders loading overlaybutton when is loading', () => {
        jest
          .spyOn(useVideoButton, 'useToggleWatchLaterButton')
          .mockReturnValue({
            onClick: jest.fn(),
            isLoading: true,
            isActive: true,
          });
        render(
          <Video.ToggleWatchLaterButton videoId={video._id} isInWatchLater />,
        );
      });
    });

    describe('Video Delete From List Button', () => {
      const mockMutationFunction = jest.fn();
      const mockMutateAsync = jest.fn();
      const mutation = () => {
        return {
          ...useMutation(mockMutationFunction),
          mutateAsync: mockMutateAsync,
          isLoading: false,
        } as UseMutationResult<any, unknown, string, unknown>;
      };
      toast.success = jest.fn();
      toast.error = jest.fn();
      //   const mockToastSuccess = jest.spyOn(toast, 'success');
      //   const mockToastError = jest.spyOn(toast, 'error');

      beforeEach(() => {
        mockMutateAsync.mockClear();
      });
      //   jest.spyOn(global, 'confirm' as any).mockReturnValueOnce(false);

      it('renders OK when is not loading', () => {
        render(
          <Video.DeleteFromListButton
            videoId={video._id}
            mutation={mutation}
            setRender={setRender}
          />,
        );
      });

      it('does nothing when window confirm returns false', () => {
        jest.spyOn(global, 'confirm' as any).mockReturnValueOnce(false);
        const {container} = render(
          <Video.DeleteFromListButton
            videoId={video._id}
            mutation={mutation}
            setRender={setRender}
          />,
        );
        const deleteButton = container.querySelector(
          'button',
        ) as HTMLButtonElement;
        deleteButton.click();
        expect(mockMutateAsync).toBeCalledTimes(0);
      });
      it('deletes video from list when clicked', async () => {
        jest.spyOn(global, 'confirm' as any).mockReturnValue(true);
        const {container} = render(
          <Video.DeleteFromListButton
            videoId={video._id}
            mutation={mutation}
            setRender={setRender}
          />,
        );
        const deleteButton = container.querySelector(
          'button',
        ) as HTMLButtonElement;
        deleteButton.click();
        await new Promise(process.nextTick);
        expect(toast.success).toBeCalledTimes(1);
      });

      //   it('restores video to list', async () => {
      //     jest.spyOn(global, 'confirm' as any).mockReturnValue(true);
      //     jest
      //       .spyOn(toast, 'success')
      //       .mockImplementation((_, {onClick: onToastClick} = {}) => {
      //         if (onToastClick) {
      //           onToastClick(new MouseEvent('click'));
      //         }
      //       });
      //     const {container} = render(
      //       <Video.DeleteFromListButton
      //         videoId={video._id}
      //         mutation={mutation}
      //         setRender={setRender}
      //       />,
      //     );
      //     const deleteButton = container.querySelector(
      //       'button',
      //     ) as HTMLButtonElement;
      //     deleteButton.click();
      //     await new Promise(process.nextTick);
      //   });

      it('throws error toast when delete mutation failes', async () => {
        jest.spyOn(global, 'confirm' as any).mockReturnValue(true);
        mockMutateAsync.mockImplementationOnce(() => {
          throw new Error('for testing delete video from list fail');
        });
        const {container} = render(
          <Video.DeleteFromListButton
            videoId={video._id}
            mutation={mutation}
            setRender={setRender}
          />,
        );
        const deleteButton = container.querySelector(
          'button',
        ) as HTMLButtonElement;
        deleteButton.click();
        await new Promise(process.nextTick);
        expect(toast.error).toBeCalledTimes(1);
      });

      it('renders loading overlaybutton when is loading', () => {
        const loadingFixedMutation = () => {
          return {
            ...useMutation(mockMutationFunction),
            mutateAsync: mockMutateAsync,
            isLoading: true,
          } as UseMutationResult<any, unknown, string, unknown>;
        };
        const {container} = render(
          <Video.DeleteFromListButton
            videoId={video._id}
            mutation={loadingFixedMutation}
            setRender={setRender}
          />,
        );

        expect(container.querySelector('.fa-spinner')).toBeInTheDocument();
      });
    });
  });
});
