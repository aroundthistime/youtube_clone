import {FailedResponseData, SuccessResponseData} from './ResponseData';
import {UserType} from './UserType';

export interface LoginRequirementsType {
  email: string;
  password: string;
}

export interface JoinRequirementsType extends LoginRequirementsType {
  name: string;
}

interface AuthMutationSuccessResponseType extends SuccessResponseData {
  user: UserType;
}

export type AuthMutationResponseType =
  | AuthMutationSuccessResponseType
  | FailedResponseData;
