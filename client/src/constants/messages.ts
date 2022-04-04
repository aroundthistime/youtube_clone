import {PASSWORD_LEAST_LENGTH, PASSWORD_MAX_LENGTH} from '../utils/formUtils';

const messages = {
  loading: '잠시만 기다려주세요',
  confirmClear: '해당 영상들을 모두 삭제하시겠습니까?',
  confirmRemoveVideoFromList: '해당 영상을 목록에서 제거하시겠습니까?',
  videoRemovedFromList: '영상을 목록에서 제거했습니다.',
  clearedVideoList: '영상들을 모두 제거했습니다.',
  confirmDeleteComment: '해당 댓글을 삭제하시겠습니까?',
  addedComment: '댓글을 등록했습니다.',
  editedComment: '댓글을 수정했습니다.',
  deletedComment: '댓글을 삭제했습니다.',
  blockedComment: '해당 댓글을 차단합니다.',
  cancelTask: ' (클릭해서 취소 가능)',
  taskFailed: '요청하신 작업에 실패했습니다.',
  taskCanceled: '작업이 취소되었습니다',
  formErrorMessages: {
    passwordsNotMatching: '두 비밀번호가 일치하지 않습니다.',
    inappropriateLengthPassword: `비밀번호는 ${PASSWORD_LEAST_LENGTH}자 이상 ${PASSWORD_MAX_LENGTH}자 이하이어야 합니다`,
  },
};

export default messages;
