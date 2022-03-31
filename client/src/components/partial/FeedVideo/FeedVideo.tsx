import React, {useState} from 'react';
import {UseMutationResult} from 'react-query';
import {DefaultVideoProps} from '../DefaultVideo/DefaultVideo';
import Video from '../Video/Video';

interface Props extends DefaultVideoProps {
  mutation: () => UseMutationResult<any, unknown, string, unknown>;
}

const FeedVideo = ({video, className = '', mutation}: Props) => {
  const [render, setRender] = useState<boolean>(true);
  return (
    <Video video={video} className={className} render={render}>
      <Video.OverlayButtons>
        <Video.DeleteFromListButton
          videoId={video._id}
          mutation={mutation}
          setRender={setRender}
        />
      </Video.OverlayButtons>
    </Video>
  );
};

export default React.memo(FeedVideo);
