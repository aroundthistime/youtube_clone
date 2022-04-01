import React from 'react';
import {UseMutationResult} from 'react-query';
import {toast} from 'react-toastify';
import constants from '../../../constants';
import Videos from '../Videos/Videos';

type Props = {
  clearMutation: () => UseMutationResult<any, unknown, void, unknown>;
};

const FeedClearButton = ({clearMutation}: Props) => {
  const {mutateAsync} = clearMutation();
  const onClick = async () => {
    if (!window.confirm(constants.messages.confirmClear)) return;
    try {
      await mutateAsync();
      window.location.reload();
    } catch {
      toast.error(constants.messages.taskFailed);
    }
  };
  return (
    <Videos.HeaderRightButton onClick={onClick}>
      초기화하기
    </Videos.HeaderRightButton>
  );
};

export default React.memo(FeedClearButton);
