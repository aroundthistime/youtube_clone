import {UserModel, UserType} from '../../models/User';

declare global {
  namespace Express {
    export interface User extends UserType {}

    export type MulterRequestFile = Express.Multer.File & Express.MulterS3.File;

    export interface Request {
      user?: User;
      file: MulterRequestFile;
    }
  }
}
