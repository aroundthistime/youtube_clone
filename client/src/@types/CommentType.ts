import {UserType} from './UserType';

export interface CommentType {
  _id: string;
  text: string;
  uploadTime: Date;
  creator: UserType;
  isEdited: boolean;
}
