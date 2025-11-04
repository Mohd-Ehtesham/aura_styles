export interface RemoveWishlistProductResponse {
  success: boolean;
  message: string;
  data: WishlistProduct;
}

export interface WishlistProduct {
  _id: string;
  user: string;
  products: Product[];
}

export interface Product {
  _id: string;
}
