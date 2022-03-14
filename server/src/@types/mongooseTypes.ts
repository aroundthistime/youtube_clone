import {SortOptionType} from './sortMethod';

export interface PopulateWithPaginationOptions<T> {
  limit: number;
  skip: number;
  sort: SortOptionType<T>;
}
