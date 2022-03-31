import {UserType} from './UserType';

export interface BriefVideoType {
  _id: string;
  thumbnailUrl: string;
  title: string;
  views: number;
  uploadTime: Date;
  creator: UserType;
  isInWatchLater?: boolean;
}

export interface VideoType extends BriefVideoType {
  fileUrl: string;
  description?: string;
  category?: string;
  isLiked?: boolean;
  commentsCount?: number;
}
