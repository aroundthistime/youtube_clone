import React from 'react';
import {VideosQueryType} from '../../../@queries/useVideosQuery';

const VideosFilterer = React.lazy(
  () => import('../VideosFilterer/VideosFilterer'),
);
const Videos = React.lazy(() => import('../Videos/Videos'));

type Props = {
  videosQuery: VideosQueryType;
};

const VideosWithFilterer = ({videosQuery}: Props) => (
  <>
    <VideosFilterer />
    <Videos videosQuery={videosQuery} />
  </>
);

export default React.memo(VideosWithFilterer);
