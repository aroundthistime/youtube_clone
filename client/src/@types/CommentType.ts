import {UserType} from './UserType';

export interface CommentType {
  id: string;
  text: string;
  uploadTime: Date;
  creator: UserType;
  isEdited: boolean;
}
