import {type} from 'os';
import {SortOptionType} from './sortMethod';

export interface PopulateWithPaginationOptions<T> {
  limit: number;
  skip: number;
  sort: SortOptionType<T>;
}

export type MongooseFindQuery<T> = Partial<{
  [k in keyof T]: any;
}>;
