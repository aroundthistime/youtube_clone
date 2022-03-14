type SortMethodType = 'Newest' | 'Oldest';

export type CommentSortMethodType = SortMethodType;

export type VideoSortMethodType = SortMethodType | 'Most popular';

export type SortOptionType<T> = Partial<{
  [k in keyof T]: number;
}>;
