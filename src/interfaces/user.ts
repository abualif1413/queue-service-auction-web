export interface AddNewUserRequest {
  email: string;
  name: string;
  password: string;
}

export interface LoginAtempt extends Omit<AddNewUserRequest, 'name'> {}

export interface User extends AddNewUserRequest {
  id: number;
}
export interface UserResponseSuccessMetadata extends Omit<AddNewUserRequest, 'password'> {
  authId: string;
  id: number;
}

export interface UserResponseFailedMetadata {
  email: string;
  password: string;
}
