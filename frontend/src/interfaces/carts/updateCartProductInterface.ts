export interface UpdateCartProductResponse {
  success: boolean;
  message: string;
  data: {
    _id: string;
    user: string;
    products: CartProduct[];
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface CartProduct {
  product: string;
  size: string;
  quantity: number;
  _id: string;
}
