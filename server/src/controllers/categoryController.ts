import {Request, Response} from 'express';
import {CATEGORIES} from '../@types/categoryType';

export const getCategories = (req: Request, res: Response) => {
  res.json({
    result: true,
    categories: CATEGORIES,
  });
};
