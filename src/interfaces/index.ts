export * from './component-props';
export * from './items';
export * from './user';

export interface BasicResponse<T> {
  success: boolean;
  message: string;
  metadata: T;
}
