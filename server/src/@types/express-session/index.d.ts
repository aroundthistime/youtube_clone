import {Express} from 'express';
import 'express-session';
import {Session, SessionData} from 'express-session';
import {UserType} from '../../models/User';

declare module 'express' {
  export interface Request {
    session: Session &
      Partial<SessionData> & {
        user?: UserType;
      };
  }
}
