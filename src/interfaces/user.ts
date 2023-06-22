export interface AddNewUserRequest {
  email: string;
  name: string;
  password: string;
}

export interface LoginAtempt {
  email: string;
  password: string;
}

export interface BasicResponse<T> {
  success: boolean;
  message: string;
  metadata: T;
}

export interface UserResponseSuccessMetadata {
  authId: string;
  email: string;
  name: string;
  id: number;
}

export interface UserResponseFailedMetadata {
  email: string;
  password: string;
}
