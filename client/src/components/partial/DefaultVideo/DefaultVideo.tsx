import React from 'react';
import {useToggleNotInterestedMutation} from '../../../@queries/useVideoMutation';
import {BriefVideoType} from '../../../@types/VideoType';
import Video from '../Video/Video';
import {useDefaultVideo} from './useDefaultVideo';

interface Props {
  video: BriefVideoType;
  className?: string;
}

const DefaultVideo = ({video, className = ''}: Props) => {
  const {isLoggedIn, isMyVideo, render, setRender} = useDefaultVideo(video);
  return (
    <Video video={video} className={className} render={render}>
      {isLoggedIn && (
        <Video.OverlayButtons>
          {isMyVideo ? (
            <>
              <Video.EditVideoButton videoId={video._id} />
              <Video.DeleteVideoButton videoId={video._id} />
            </>
          ) : (
            <>
              <Video.ToggleWatchLaterButton
                videoId={video._id}
                isInWatchLater={Boolean(video.isInWatchLater)}
              />
              <Video.DeleteFromListButton
                videoId={video._id}
                mutation={useToggleNotInterestedMutation}
                setRender={setRender}
              />
            </>
          )}
        </Video.OverlayButtons>
      )}
    </Video>
  );
};

export default React.memo(DefaultVideo);
