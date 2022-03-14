import {Response} from 'express';

export const returnSuccessResponse = (res: Response) => {
  res.status(200).json({
    result: true,
  });
};

export const returnErrorResponse = (res: Response) => {
  res.status(400).json({
    result: false,
  });
};
