import { User } from './user';

export interface NewItemRequest {
  name: string;
  price: number;
  timeWindow: Date;
}

export interface Item extends NewItemRequest {
  id: number;
}

export interface NewItemResponseSuccessMetadata {
  user: User;
  newItem: Item;
}

export interface NewItemResponseFailedMetadata {
  userId: number;
  newItem: NewItemRequest;
}

export interface MyItemsResponseSuccessMetadata {
  user: User;
  items: Item[];
}
