import { Item } from "./items";
import { User } from "./user";

export interface PlaceBidRequest {
  itemId: number;
  price: number;
  bidTime: Date;
}

export interface Bid extends PlaceBidRequest {
  id: number;
}

export interface BidList extends PlaceBidRequest {
  item: Item,
  user: User
}

export interface MyBidsSuccessResponseMetadata {
  user: User,
  bids: BidList[],
}