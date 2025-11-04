export interface WishlistProduct {
  _id: string;
  name: string;
  brand: string;
  price: number;
  discountPrice: number;
  sizes: string[];
  stock: number;
  images: Image[];
}

export interface Wishlist {
  _id: string;
  user: string;
  products: WishlistProduct[];
}

export interface FetchWishlistResponse {
  success: boolean;
  message: string;
  data: Wishlist;
}

export interface Image {
  url: string;
  fileId: string;
}
