export interface LoginRequirementsType {
  email: string;
  password: string;
}

export interface JoinRequirementsType extends LoginRequirementsType {
  name: string;
}
