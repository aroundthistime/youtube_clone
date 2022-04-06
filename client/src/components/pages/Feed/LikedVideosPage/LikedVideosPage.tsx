import React from 'react';
import {useToggleLikeVideoMutation} from '../../../../@queries/useVideoMutation';
import constants from '../../../../constants';
import {DefaultVideoProps} from '../../../partial/DefaultVideo/DefaultVideo';
import FeedVideo from '../../../partial/FeedVideo/FeedVideo';
import Videos from '../../../partial/Videos/Videos';
import WithPrivateValidation from '../../../wrapper/WithAuthValidation/WithPrivateValidation';
import './LikedVideosPage.scss';
import {useLikedVideosPage} from './useLikedVideosPage';

const LikedVideosPage = () => {
  const {videosQuery} = useLikedVideosPage();
  return (
    <main className="liked-videos">
      <LikedVideosPage.Header />
      <Videos
        videosQuery={videosQuery}
        VideoComponent={LikedVideosPage.Video}
      />
    </main>
  );
};

LikedVideosPage.Header = () => (
  <Videos.Header>
    <Videos.Title>좋아요한 영상</Videos.Title>
  </Videos.Header>
);

LikedVideosPage.Video = (props: DefaultVideoProps) => (
  <FeedVideo mutation={useToggleLikeVideoMutation} {...props} />
);

export default WithPrivateValidation(LikedVideosPage);
