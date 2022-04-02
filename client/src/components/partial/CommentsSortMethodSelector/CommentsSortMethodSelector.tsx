import React from 'react';
import {COMMENT_SORT_METHODS} from '../../../@types/SortMethodType';
import {useCommentsSortMethodSelector} from './useCommentsSortMethodSelector';
import './CommentsSortMethodSelector.scss';

const CommentsSortMethodSelector = () => {
  const {onInput} = useCommentsSortMethodSelector();
  return (
    <div className="comments__sort-method-selector">
      <select
        id="comments__sort-method-select"
        className="selector__select"
        onInput={onInput}>
        {COMMENT_SORT_METHODS.map(sortMethod => (
          <option value={sortMethod} key={sortMethod}>
            {sortMethod}
          </option>
        ))}
      </select>
    </div>
  );
};

export default React.memo(CommentsSortMethodSelector);
