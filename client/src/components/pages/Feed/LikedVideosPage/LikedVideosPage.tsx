import React from 'react';
import {useToggleLikeVideoMutation} from '../../../../@queries/useVideoMutation';
import constants from '../../../../constants';
import {DefaultVideoProps} from '../../../partial/DefaultVideo/DefaultVideo';
import FeedVideo from '../../../partial/FeedVideo/FeedVideo';
import Videos from '../../../partial/Videos/Videos';
import './LikedVideosPage.scss';
import {useLikedVideosPage} from './useLikedVideosPage';

const LikedVideosPage = () => {
  const {videosQuery} = useLikedVideosPage();
  return (
    <main className="liked-videos">
      <Videos
        videosQuery={videosQuery}
        VideoComponent={LikedVideosPage.Video}
      />
    </main>
  );
};

// LikedVideosPage.Header = () => (
//   <Videos.Header>
//     <Videos.Title>좋아요한 영상</Videos.Title>
//     <Videos.HeaderRight>
//       <Videos.HeaderRightButton>모두 삭제하기</Videos.HeaderRightButton>
//     </Videos.HeaderRight>
//   </Videos.Header>
// );

// LikedVideosPage.ClearButton = () => {
//   const {m}
//   const onClick = () => {
//     if (!window.confirm(constants.messages.confirmClear)) return;

//   };
//   return <Videos.HeaderRightButton>모두 삭제하기</Videos.HeaderRightButton>;
// };

LikedVideosPage.Video = (props: DefaultVideoProps) => (
  <FeedVideo mutation={useToggleLikeVideoMutation} {...props} />
);

export default LikedVideosPage;
