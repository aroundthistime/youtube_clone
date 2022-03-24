import React from 'react';
import {VideosQueryParams} from '../../../@queries/useVideosQuery';

const VideosFilterer = React.lazy(
  () => import('../VideosFilterer/VideosFilterer'),
);
const Videos = React.lazy(() => import('../Videos/Videos'));

type Props = {
  queryParams?: VideosQueryParams;
};

const VideosWithFilterer = ({queryParams}: Props) => (
  <>
    <VideosFilterer />
    <Videos queryParams={queryParams} />
  </>
);

export default React.memo(VideosWithFilterer);
