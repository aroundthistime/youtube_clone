import {CommentType} from './CommentType';
import {UserType} from './UserType';

export interface BriefVideoType {
  id: string;
  thumbnailUrl: string;
  title: string;
  views: number;
  uploadTime: Date;
  creator: UserType;
}

export interface VideoType extends BriefVideoType {
  fileUrl: string;
  description?: string;
  category: string;
  isLiked?: boolean;
  commentsCount?: number;
}
