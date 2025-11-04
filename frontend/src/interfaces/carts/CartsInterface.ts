export interface CartsInterface {
  _id: string;
  user: string;
  products: CartProduct[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CartsInterfaceResponse {
  success: boolean;
  length: number;
  message: string;
  data: CartsInterface[];
}

export interface CartProduct {
  _id: string;
  size: string;
  quantity: number;
  product: {
    _id: string;
    name: string;
    brand: string;
    category: string;
    price: number;
    discountPrice: number;
    rating: number;
    sizes: string[];
    images: {
      url: string;
      fileId: string;
      _id: string;
    }[];
  };
}
