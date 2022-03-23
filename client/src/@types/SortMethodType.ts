export const COMMENT_SORT_METHODS = ['Newest', 'Oldest'] as const;

export const VIDEO_SORT_METHODS = [
  ...COMMENT_SORT_METHODS,
  'Most Popular',
] as const;

export type CommentSortMethodType = typeof COMMENT_SORT_METHODS[number];

export type VideoSortMethodType = typeof VIDEO_SORT_METHODS[number];

export type SortOptionType<T> = Partial<{
  [k in keyof T]: number;
}>;
