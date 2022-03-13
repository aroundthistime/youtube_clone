import {UserModel, UserType} from '../../models/User';

declare global {
  namespace Express {
    export interface User extends UserType {}

    export interface Request {
      user?: User;
    }
  }
}
