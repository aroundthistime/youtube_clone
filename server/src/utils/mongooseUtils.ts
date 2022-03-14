import mongoose from 'mongoose';

export const getObjectIdFromString = (str: string) => {
  return mongoose.Types.ObjectId(str);
};
