export interface MyWishlistPage {
  _id: string;
  user: string;
  products: string[];
}

export interface MyWishlistPageResponse {
  success: boolean;
  message: string;
  data: MyWishlistPage;
}
