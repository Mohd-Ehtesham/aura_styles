export interface AddToCart {
  _id?: string | undefined;
  user: string;
  products: string[];
}

export interface AddToCartResponse {
  success: boolean;
  message: string;
  data: AddToCart;
}
