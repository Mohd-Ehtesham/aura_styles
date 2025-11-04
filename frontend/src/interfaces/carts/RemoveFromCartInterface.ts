export interface RemoveProductFromCart {
  _id: string;
  user: string;
  products: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface RemoveProductFromCartResponse {
  success: boolean;
  message: string;
  data: RemoveProductFromCart;
}
