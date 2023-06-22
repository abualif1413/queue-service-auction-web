export interface AddNewUserRequest {
  email: string;
  name: string;
  password: string;
}

export interface LoginAtempt {
  email: string;
  password: string;
}

export interface BasicResponse {
  success: boolean;
  message: string;
  metadata: any;
}
