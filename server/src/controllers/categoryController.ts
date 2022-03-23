import {Request, Response} from 'express';
import {CATEGORY_TABS} from '../@types/categoryType';

export const getCategories = (req: Request, res: Response) => {
  res.json({
    result: true,
    categories: CATEGORY_TABS,
  });
};
