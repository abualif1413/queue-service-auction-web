export interface PlaceBidRequest {
  itemId: number;
  price: number;
  bidTime: Date;
}

export interface Bid extends PlaceBidRequest {
  id: number;
}
